# Aurion Web

Frontend for the AI chat application. Built with Next.js App Router, TypeScript, Tailwind CSS, and Phosphor Icons.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Project structure

```text
src/
├── app/                    # Next.js routes, layout and global styles
├── components/
│   └── ui/                 # Reusable application primitives
├── config/                 # Product and model configuration
├── features/
│   └── chat/
│       ├── components/     # Chat shell, sidebar, messages and composer
│       ├── data/           # Temporary mock data
│       └── types/          # Chat domain types
└── lib/                    # Framework-independent utilities

public/
└── brand/                  # Brand assets
```

The current chat flow is an interactive frontend prototype. Backend authentication, persistence, streaming, and model APIs will be connected through `NEXT_PUBLIC_API_URL` in a later integration phase.
