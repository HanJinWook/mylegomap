import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { layerInfo } = await req.json();

    if (!layerInfo) {
      return NextResponse.json(
        { error: 'layerInfo is required' },
        { status: 400 }
      );
    }

    const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    const model = process.env.OLLAMA_MODEL || 'qwen3.5:35b';

    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        prompt: `You are a LEGO master builder. Explain what is being built in this assembly step based on the provided info. Be concise and encouraging. Context: ${layerInfo}`,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ response: data.response });
  } catch (error: any) {
    console.error('AI Proxy Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
