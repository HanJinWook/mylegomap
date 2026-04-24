import requests
import json

url = "http://localhost:11434/v1/chat/completions"
headers = {"Content-Type": "application/json"}

files_context = """
--- src/components/DashboardLayout.tsx ---
{dashboard_layout}

--- src/app/page.tsx ---
{page_tsx}

--- src/app/globals.css ---
{globals_css}
"""

prompt = f"""You are an expert web developer. The user reports that on mobile, the right side of the layout is cut off.
The project uses Next.js 16.2.4 (React 19) and Tailwind CSS 4.

Context:
{files_context}

User Request: "모바일 환경에서 봤을때 저렇게 우측 부분이 잘려서 보이는데 수정해줘." (On mobile, the right part is cut off. Fix it.)

Analyze the layout and provide the fix. Focus on DashboardLayout.tsx and page.tsx.
Provide the response in JSON format with 'analysis' and 'files' (array of objects with 'path' and 'content').
"""

# Replace placeholders with actual content (escaping for JSON)
# For simplicity in this script, I'll just hardcode them or use a safer way.
# I will use a more robust way by reading from files in the next step.
