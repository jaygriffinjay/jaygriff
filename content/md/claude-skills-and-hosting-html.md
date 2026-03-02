---json
{
  "title": "Claude Skills, Generative Art, and Hosting Raw HTML in Next.js",
  "slug": "claude-skills-and-hosting-html",
  "date": "2026-03-02T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.6"],
  "authorshipNote": "Claude Sonnet 4.6 via GitHub Copilot",
  "type": "post",
  "description": "Claude.ai now has skills and connectors. I used one to build a generative art visualizer in a minute. Then figured out the cleanest way to ship it.",
  "tags": ["ai", "claude", "generative-art", "next.js", "p5js", "tools"]
}
---

## Claude.ai Has Skills Now

Claude.ai is quietly getting much more useful. They've added first-party **skills** — pre-built capabilities that Claude can use inside a conversation. One of them is a generative art skill powered by p5.js.

There's also a growing **connectors** ecosystem (their term for extensions/integrations) — things like GitHub, Google Drive, Notion, and more. The short version: **[Claude.ai](https://claude.ai)** is starting to look a lot less like a chatbox and a lot more like an actual platform.

## What p5.js + Claude Produced in One Prompt

I used the generative art skill and asked for something cool. Within a minute I had **Plasma Cosmos** — thousands of luminous particles flowing through layered noise fields, curling vortex forces, a deep space background, and a full sidebar of tweakable parameters:

- Turbulence, vortex strength, trail fade, speed, field scale, particle count
- Three customizable colors (plasma core, nebula mid, void edge)
- Seed navigation — every seed is a different cosmos, fully reproducible
- Download PNG

The output was real, working, interactive code. Not a starting point — a mostly finished thing. Try it: **[Plasma Cosmos](/plasma-cosmos)**.

## The Integration Question

The file is pure HTML/CSS/JS — a single self-contained document using p5 from a CDN. So the question became: how do I get this on the site?

**Option 1: Convert to React.** It's doable — p5 works well in a `useEffect` with a canvas ref, instance mode is the React-friendly pattern, and Claude already generated the sketch in instance mode. But it means rewriting all the UI, converting styles to Emotion or inline, hooking up state, installing p5 as a dependency. Real work.

**Option 2: Host it as-is.** Drop the HTML file in `public/`, add a rewrite in `next.config.ts`, clean URL with no `.html`. No conversion, zero maintenance. Works forever.

```ts
// next.config.ts
async rewrites() {
  return [
    { source: '/plasma-cosmos', destination: '/plasma-cosmos.html' },
  ];
},
```

That's it. `/plasma-cosmos` serves the full app.

## Why Option 2 Is the Right Call Here

Converting every self-contained HTML experiment to React doesn't make sense. The value of being good at React isn't that everything has to be React — it's knowing when React is actually the right tool. For a generative art piece that's meant to be full-screen, immersive, with its own layout and sidebar? The HTML version is arguably better. No navbar overhead, no theme conflicts, its own contained experience.

I added a `← jaygriff.com` link in the top right so anyone who lands there knows where it came from. That's the only integration it needs.

The actual lesson: `public/` + rewrites is a legitimate deployment pattern. Any self-contained experiment, tool, or demo goes in `public/`, one rewrite entry, clean URL. Done.


