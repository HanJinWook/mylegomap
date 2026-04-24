<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Behavior Rules

- **@local Mention**: When a request starts with `@local`, use the local model environment at `baseUrl: "http://localhost:11434/v1"`for prompt processing and development. This preference is persistent across sessions and must be strictly followed.
