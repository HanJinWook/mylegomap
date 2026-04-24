<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Behavior Rules

- **@local Mention**: When a request starts with `@local`, ensure the development process aligns with the local model settings configured at `http://localhost:11434/v1` (qwen3.6:27b). Use this local environment for prompt processing and development as requested by the user.
