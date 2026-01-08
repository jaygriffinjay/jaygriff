# Full Stack Next.js Webapp Starter

My personal starter pack for building full-stack web applications with Next.js.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Emotion (CSS-in-JS)
- **UI Components**: Radix UI primitives
- **Code Highlighting**: Prism.js
- **Theme System**: Custom theming with live editor

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

- 🎨 **Theme Editor** - Live theme customization at `/theme-editor` (dev only)
- 🎭 **Emotion Styling** - Both `styled` components and `css` prop support
- 🧩 **Component Library** - Pre-built primitives (headings, paragraphs, code blocks, etc.)
- 🌙 **Theme System** - Customizable design tokens with localStorage persistence
- ⚡ **Server Components** - Optimized rendering with Next.js App Router

## Structure

```
src/
├── app/              # Next.js routes
├── components/       # Reusable components
├── theme/           # Theme system & configuration
└── styles/          # Global styles
```

## Dev Tools

- `/theme-editor` - Interactive theme playground (dev mode only)
