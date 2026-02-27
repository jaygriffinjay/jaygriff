---json
{
  "title": "Tailwind Wins: Making My Meta Stack Even More Meta",
  "slug": "styling-migration",
  "date": "2026-02-23T00:00:00Z",
  "author": ["Jay Griffin", "GPT-5.3-Codex"],
  "authorshipNote": "GPT-5.3-Codex via GitHub Copilot",
  "description": "My migration plan from Emotion to Tailwind, CSS Modules, Shadcn, and CSS variables so styling stays fast, explicit, and AI-friendly.",
  "tags": ["css", "nextjs", "emotion", "tailwind", "shadcn", "architecture", "ai"],
  "type": "post"
}
---

# Rethinking My Styling System

*Thinking out loud about why I'm switching.*

## How I Got Here

I've been using Emotion for CSS-in-JS across my site for a while. The appeal was real: colocated styles, dynamic values, JS in your CSS. It felt powerful.

But honest self-assessment: 95% of what I actually use Emotion for is stuff that CSS modules handles natively. Scoped styles, colocated with the component, real CSS. The other 5% — dynamic computed values — turns out to be solvable with CSS custom properties passed as inline styles. No runtime library required.

Meanwhile Tailwind and shadcn have eaten the world for a reason. They're fast, AI codes them fluently, and shadcn components live in your codebase as real files you can read and modify. The AI-codability of a stack is now a legitimate architectural consideration.

---

## The Key Realizations

**Tailwind isn't powerful, it's fast.** CSS is more powerful. But fast has real value, especially for iteration. The move is to use both intentionally rather than picking a lane.

**CSS modules is just scoped CSS.** Name your file `.module.css`, import it, use `styles.className`. The build tool handles the scoping. No runtime, no config, works out of the box in Next.js. The cascade was always the problem — CSS modules just fixes it.

**CSS variables are the JS-in-CSS bridge.** You don't need Emotion for dynamic styles. You pass computed values from JS as CSS custom properties via inline style, then consume them in your CSS file. JS owns the logic, CSS owns the appearance. Clean separation.

```tsx
<div
  className={styles.card}
  style={{ '--progress': progress, '--hue': hue } as React.CSSProperties}
>
```
```css
.card {
  width: calc(var(--progress) * 100%);
  background: hsl(var(--hue), 70%, 50%);
}
```

**My theme editor was already broken.** Styles throughout the app weren't using theme values consistently. The theme context was supposed to be the source of truth but got bypassed over time through iteration.

**The primitive system is the real asset, not the styling layer.** The component API I've built is worth preserving. Emotion underneath it is swappable.

## The New Stack

| Purpose | Tool |
|---|---|
| Component system + commodity UI | shadcn + tailwind |
| Custom components | CSS modules |
| Dynamic computed styles | CSS variables via inline style |
| Theming | CSS custom properties on `:root` |
| JS logic | JS. Just JS. |

No Emotion. No runtime styling cost. No theme context. The browser handles theming natively via CSS variables, and anything not using them is visibly, obviously hardcoded — no mystery.

---

## The Plan

### 1. Set up the new foundation
- Init shadcn with a clean theme configured as CSS variables on `:root`
- Establish the core CSS variables: colors, spacing, radius, typography scale
- Add the shadcn components you actually use regularly
- Configure tailwind to consume those same CSS variables so both systems share one source of truth

### 2. Write the context document
A single markdown file that describes the stack for AI sessions:
- Theme variables and what they mean
- Available shadcn/custom components and their props API
- Folder and naming conventions
- How dynamic styles are handled (CSS variable bridge pattern)

This becomes the thing you paste at the top of every vibe session. The AI already knows shadcn cold — the context doc just tells it which components you have and how your specific system is wired.

### 3. Pick one page and do a full once-over
- Restyle it from Emotion → CSS modules + tailwind
- Translate one-off custom components into the new system
- Tighten the content while you're in there
- Note which one-off components could become reusable primitives

This is the proof of concept. If the new system clicks, you'll know immediately.

### 4. Migrate page by page
- Don't do a big bang rewrite
- Each page is a self-contained unit — do it when you're in that part of the codebase anyway
- Old Emotion components stay until you touch them
- The vocabulary of reusable components grows with each page

### 5. Fix the theme system for real
- All theme values live as CSS variables on `:root`
- The theme editor just updates those variables — the browser propagates instantly, no re-render, no context
- Anything not using the variables is obviously hardcoded — visible, not mysterious
- The broken theme editor becomes a working one almost for free

### 6. Build the AI vibecoding workflow
- Clean boilerplate repo you can clone for sandboxing new features
- Context document describing your stack for any AI session
- Vibe features in isolation, port the good parts into the real codebase
- Or: paste your actual components + context doc and have AI build within your system directly

---
## AI as Conductor

The quality of your building blocks determines the quality of AI's output.

Other UI libraries give you a black box npm package — opaque, unreadable, unmodifiable. The AI can't see inside it.

shadcn gives you the source. The component lives in `/components/ui/button.tsx`. The AI can read it, extend it, compose it, understand exactly what variants exist and why. Radix underneath handles all the hard stuff — accessibility, keyboard navigation, focus management, open/close state — invisibly and correctly.

So the AI's entire job becomes: pick the right building blocks, compose them, style them. All the hard problems are already solved. You've removed them from its plate.

Choosing your stack is now also choosing how well AI can help you. That's a new variable in the decision that didn't exist a few years ago.