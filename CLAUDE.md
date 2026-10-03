# Tech Stack
- Language: TypeScript
- Runtime: Node.js
- Build tool: Vite
- Frontend: React
- Backend/DB: Supabase
- Styling: Tailwind CSS
- Package manager: npm

# Current Project
Building a personal finance and TCG (Trading Card Game) portfolio tracker — a web app to manage and track the value of a card collection.

# Code review checklist
After writing any function or component, always verify:
- **Pure function check** — it doesn't mutate any external variables or objects, and given the same inputs it always returns the same output. Flag any violations and explain why they break purity.
- **TypeScript convention** — default to `interface` for object shapes, only use `type` when a specific feature requires it (unions, tuples, mapped types, etc.)
