---json
{
  "title": "backlog-this Command",
  "slug": "backlog-this-trigger-word-workflow",
  "date": "2026-02-16T18:00:00Z",
  "author": ["Jay Griffin", "GPT-5.3-Codex"],
  "type": "doc",
  "description": "A focused workflow for capturing ideas into backlog storage when I intentionally want to stop implementing and preserve context for later.",
  "tags": ["workflow", "ai", "backlog", "productivity", "meta", "spec"]
}
---

# Backlog-This Trigger Word Workflow

## Why this exists

I can move fast with AI, but speed can turn into scatterbrain mode if I follow every interesting branch immediately. I want a clean interrupt mechanism that lets me preserve good ideas without derailing what I am actively shipping.

`backlog-this` is that mechanism.

## Core concept

When I say `backlog-this`, I am switching from **build mode** to **capture mode**.

- **Build mode**: implement, edit code, run commands, ship changes
- **Capture mode**: do not implement; only structure and store the idea for later

## Goals

1. Avoid losing promising ideas
2. Reduce context-switch thrash
3. Keep implementation focus on current priority
4. Preserve enough detail to resume quickly later

## Non-goals

1. No immediate feature implementation
2. No architecture rabbit holes during capture
3. No bikeshedding format details before capture exists

## Command

If I say `backlog-this`, the workflow should:

1. Stop proposing implementation steps for the current tangent
2. Summarize the idea and current context
3. Store it as a backlog entry using a consistent template
4. Return to the original active track

## Backlog entry template

Each parked idea should capture:

- **Title**: concise and searchable
- **Problem**: what pain or opportunity I noticed
- **Proposed direction**: rough path, not full solution
- **Why not now**: what current priority this interrupts
- **Next step**: smallest concrete action for future me
- **Context snapshot**: relevant project state, files, links, or assumptions
- **Tags**: classification for later filtering

## Storage options

### Option A: Single running backlog doc

- Fastest to start
- One place to scan
- Can get noisy over time

### Option B: One file per parked idea

- Cleaner long-term organization
- Better linking and metadata
- Slightly more overhead per capture

## Recommended starting point

Start with **Option A** for speed, then migrate to **Option B** if volume grows.

## Success criteria

This workflow is successful if:

1. Capturing an idea takes less than 60 seconds
2. I can reliably find parked ideas later
3. Parked ideas are actionable when reopened
4. I stay focused on the current shipping task

## Next refinement pass

In the next pass, I want to lock:

1. Exact storage shape
2. Exact field schema
3. Retrieval commands (e.g., list open, list recent, reopen by slug)
