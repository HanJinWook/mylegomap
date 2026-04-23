import requests
import json
import sys

def query_ollama(prompt, model="qwen3.5:35b"):
    url = "http://localhost:11434/v1/chat/completions"
    headers = {"Content-Type": "application/json"}
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a professional Next.js and Three.js developer helper. Provide clean, efficient code and technical advice."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.1
    }
    
    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content']
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 query_local.py 'your prompt'")
        sys.exit(1)
    
    user_prompt = sys.argv[1]
    result = query_ollama(user_prompt)
    print(result)
