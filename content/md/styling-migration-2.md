---json
{
  "title": "I Made an AI App Builder?",
  "slug": "making-my-own-ai-app-builder",
  "date": "2026-02-26T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.6"],
  "authorshipNote": "Claude Sonnet 4.6 via Cline",
  "type": "post",
  "description": "I studied vibe coding tools, figured out why they produce better AI outputs than my usual prompting, and rebuilt my stack to match. Now I have my own personal AI app builder.",
  "tags": ["ai", "vibe-coding", "stack", "cline", "next.js", "tailwind", "shadcn"]
}
---

# How I Built My Own AI App Builder

I've been building [jaygriff.com](https://jaygriff.com) for years. It's a Next.js app, TypeScript, React — a solid stack that I've iterated on constantly. I know it well. I can build things in it quickly.

So when vibe coding tools started blowing up — Bolt, v0, Lovable — I wasn't that impressed at first. I figured they were just AI with a nice UI wrapper. I could already prompt Copilot or Claude to write components. What was the big deal?

Then I actually looked at the outputs.

## The Outputs Were Better Than Mine

Not marginally better. Noticeably, consistently better. Landing pages that looked polished. Dashboards with real visual hierarchy. Galleries with actual design sensibility. All from a single prompt.

Meanwhile my AI-assisted outputs were... fine. Functional. But they had that "AI wrote this" flatness to them. Generic spacing, inconsistent sizing, no real visual rhythm.

I wanted to understand why. And also, I couldn't afford to keep using them.

## The Cost Reality

Here's the thing the commercial tools don't advertise loudly: I can burn through a $25 "monthly" credit pack in **one hour** of actual building.

These tools gate their AI usage behind credits or tokens, and when you're iterating rapidly — tweaking a component, trying a layout variation, debugging a behavior — you blow through them fast. $25 sounds like a lot. It isn't.

Running Claude Sonnet 4.6 through Cline via OpenRouter costs me a few cents per prompt. An intense hour of building is maybe a couple dollars. Not $25!

The commercial tools are paying for the product wrapper, the hosting, the UI, the brand. I'm just paying for the actual intelligence. And I get my own stack on top of it.

## I Studied Their Stack

Bolt, v0, Lovable — they're all basically the same stack:

- **Next.js** (or Vite + React)
- **Tailwind CSS**
- **shadcn/ui** (Radix-based components)
- TypeScript

That's... my stack. Or close to it. I was using Next.js and TypeScript already. The difference was I was using **Emotion** (CSS-in-JS) instead of Tailwind, and I had my own custom component system instead of shadcn.

So the AI wasn't smarter. The stack was different. That was the insight.

## Why Tailwind + shadcn Makes AI Better

Here's what I figured out: AI models have seen an enormous amount of Tailwind code. The entire open source ecosystem — GitHub, Stack Overflow, blog posts, documentation — is saturated with Tailwind utility classes. When you ask an AI to build a UI with Tailwind, it's drawing on a massive, consistent training corpus.

Emotion? Much smaller corpus. More varied patterns. The AI has to improvise more, and improvisation is where it gets inconsistent.

shadcn/ui compounds this. It's a set of pre-built, accessible, well-designed components that the AI knows intimately. When you tell it to use a `Card` or a `Button` or a `Sheet`, it knows exactly what those look like, how they behave, what props they take. It's not generating from scratch — it's composing from known building blocks.

**Constrained composition beats unconstrained generation.** Every time.

The vibe coding tools aren't magic. They've just built their scaffolding around the components and styling system that AI is best at working with.

## What I Changed

Once I understood this, I rebuilt my template stack:

**Swapped Emotion for Tailwind v4.** This was the biggest change. Emotion is great for dynamic theming and CSS-in-JS patterns, but it's a smaller target for AI. Tailwind's utility classes are everywhere. The AI knows them cold.

**Adopted shadcn/ui.** Instead of my custom Primitives system, I now have shadcn components as the structural layer. Buttons, cards, dialogs, dropdowns — all the interactive pieces. The AI knows exactly how to compose these.

**Built a typography system on top.** This is where I kept my own flavor. I have `H1`–`H6`, `Paragraph`, `Bold`, `Italic`, `Highlight`, `InlineCode`, `Blockquote`, `Link` — all as composable React components that wrap semantic HTML. They accept `className` for Tailwind overrides. They nest freely.

**Created a component registry.** A single `registry.ts` file that documents every available component, its import path, its exports, and when to use it. This is the source of truth for both me and the AI.

**Wrote a Cline agent skill.** This is the piece that ties it all together.

## The Cline Skill

[Cline](https://github.com/cline/cline) is a coding assistant that can run in VS Code. Unlike Github Copilot in VS Code, it has agent skill support right now. You can write a `SKILL.md` file that gives the agent specialized instructions for a specific type of task. I wrote a `build-ui` skill.

The skill tells Cline:

1. **Read the registry first.** Before writing any code, check `registry.ts` to see what components exist.
2. **Never invent — assemble.** Use existing components. Don't generate custom CSS.
3. **Compose from known building blocks.** Typography components nest inside shadcn structure components.
4. **Use `cn()` for all dynamic class logic.** Never concatenate strings.
5. **Server Components by default.** Only add `"use client"` when actually needed.

It also includes composition patterns, page archetypes (content page, landing page, dashboard, form), and font usage guidelines.

The result: when I say "build me a landing page for a SaaS product," Cline activates the skill, reads the registry, and assembles a page from the actual components in my project. Not generic code — code that uses _my_ design system, _my_ typography, _my_ tokens.

## What This Looks Like in Practice

Here's a landing page I got from a single prompt:

![Landing page from a single prompt](/images/projects/bootstrap-fullstack-webapp3.png)

Here's a gallery app:

![Gallery app](/images/projects/bootstrap-fullstack-webapp.png)

![Gallery app](/images/projects/bootstrap-fullstack-webapp2.png)

These aren't cherry-picked. This is the consistent output level now. The skill + the component system + Tailwind + shadcn = AI that produces genuinely good UI on the first try.

The key difference from the commercial vibe coding tools: this is _my_ stack. My typography. My color tokens. My component patterns. When I want to change something, I change it in one place and it propagates everywhere. I'm not locked into Bolt's design decisions or v0's component library.

## The Bigger Picture

What I've built is essentially a personal AI app builder. Not a product — a workflow. A set of building blocks that are well-understood by AI, combined with an agent that knows how to use them.

The commercial tools figured this out first. They built their scaffolding around the components and styling system that AI is best at. I just applied the same insight to my own stack.

The interesting thing is that this approach scales. The better the component system, the better the AI outputs. The more the AI uses the components, the more I learn what's missing or what needs improvement. It's a feedback loop — the tool improves itself by being used.

I'm still early in this. The template is a work in progress. But the outputs are already at a level that would have taken me hours to produce manually, and they're coming out in seconds.

That's the vibe.
