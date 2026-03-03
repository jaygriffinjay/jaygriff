---json
{
  "title": "MDX Does Not Win On This Day",
  "slug": "mdx-does-not-win",
  "date": "2026-03-02T12:00:00Z",
  "description": "I almost talked myself into MDX as the missing middle layer between markdown and TSX — then talked myself back out of it.",
  "type": "post",
  "tags": ["dev", "content", "architecture", "tsx", "markdown"],
  "author": ["Jay Griffin", "Claude Sonnet 4.6"],
  "authorshipNote": "Claude Sonnet 4.6 via GitHub Copilot"
}
---

## The Problem

Pure markdown is clean, portable, and comes from everywhere — AI tools, Notion exports, notes apps, CMSes, writers who don't code. TSX is powerful but lives entirely in dev territory. For a while, that division feels fine.

Then I wanted to drop a masonry gallery wall right in the middle of a markdown doc, and suddenly I was fighting my own content format.

The tempting hack: invent a secret convention. Something like `![gallery::img1,img2,img3](ignored)` — intercept it in the renderer, swap in the real component. It works. But the moment I do this, I've invented my own worse version of MDX: no tooling support, no spec, unreadable to anyone who doesn't know my magic codes, and a maintenance burden that grows with every new component I want to embed.

## The Real Options

**Stay pure markdown** — limited. I keep hitting the wall.

**Go full TSX** — max power, but now only a dev can author or edit the file. Content is no longer portable.

**MDX** — markdown that lets me drop in a component exactly when markdown isn't enough. Files stay in the markdown ecosystem where any tool can generate or edit 95% of the content. The JSX is the exception, not the rule.

The "bastardization" feeling fades fast. In practice it's just markdown with an escape hatch.

## The Architecture

Rather than mixing everything together, I'd use a three-directory content structure:

```
/content/md    — pure markdown, fully portable, any tool can touch it
/content/tsx   — full dev pages, maximum power
/content/mdx   — enhanced pages with embedded components
```

This makes provenance explicit. Anyone — including future me — knows immediately what they're dealing with based on which folder a file lives in. When I want to port, migrate, or audit for deprecated components, I know exactly which files need attention and which are clean.

The renderer and router need to handle three content types, but that's trivial overhead for the clarity it buys.

## Why MDX Over a Custom Convention

- It's an actual spec with real tooling
- Syntax highlighting and editor support work out of the box
- Other people (and AI tools) can read and generate it without knowing my magic codes
- I write `<MasonryGallery images={[...]} />` directly instead of `![gallery::img1,img2,img3](ignored)`
- The dependency is light if I'm already on a modern stack

## The Bigger Point

Markdown comes from everywhere. TSX only comes from a dev context. MDX sits at the boundary — content that's mostly in the markdown world, with the option to reach into the component world exactly where needed. That's a genuinely useful boundary, not a compromise.

The three-directory split just makes that boundary visible in the file system.

---

## Wait, Actually: TSX Wins

After thinking through the architecture more, the MDX argument falls apart entirely. Here's why.

### The Converter Pipeline

If md is already easy to parse and auto-convert to TSX, then md is just an *input* to the pipeline — not a living content format to maintain. The flow becomes:

- **Inbound:** md → tsx (auto-convert)
- **Outbound:** tsx → md (strip custom components, export clean markdown when needed)

TSX is the single source of truth. Markdown is just an interchange format in both directions. Three content formats collapses back down to one.

### The AI Authoring Argument

The main friction MDX was solving — "I don't want to write JSX by hand in my content files" — disappears completely when an AI is generating the content anyway. I'm not hand-typing `<MasonryGallery>`. I'm prompting, and the AI produces valid TSX with my exact component library used correctly. No conversion step, no format ambiguity, just clean TSX straight to source of truth.

MDX was a human-authoring friction problem. That problem has been routed around.

### Markdown's Dirty Secret

Markdown relies on whitespace and indentation for some of its syntax. Get it slightly wrong and the list is broken, the code block didn't open, and there's no idea why — no compiler error, just silent weirdness. TSX is explicit. The compiler yells immediately if something's wrong. There's no "did I use 2 spaces or 4" ambiguity, no load-bearing invisible characters.

This is the same reason Python indentation feels unhinged once you've lived in JS/TS long enough. We decided the *invisible characters* are the syntax. Truly a choice.

### Verdict

- One source of truth: TSX
- Markdown as input/output interchange only
- Full component power always available
- Compiler catches errors immediately
- AI generates it anyway so authoring friction is a non-issue

MDX does not win on this day.

