---json
{
  "title": "The Metadata Paradox: Automating What You Don't Need Yet",
  "slug": "metadata-paradox",
  "date": "2026-01-20T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.5"],
  "authorshipNote": "Conversation between Jay and Claude about when to factor, synthesized by Claude",
  "type": "post",
  "projectId": "jaygriff",
  "description": "Should every page have metadata? Should I automate adding metadata? Do I even need metadata on non-content pages? The irony of documenting this decision.",
  "tags": ["meta", "automation", "yagni", "factoring", "developer-experience"]
}
---

# The Metadata Paradox

I just spent 10 minutes discussing whether to add metadata to every page I create.

The irony? I was working on a `/dev/` landing page—a simple list of debug routes. Not content. Not a blog post. Just infrastructure.

But I caught myself thinking: "What if I want to track when this was last updated? What if I need SEO metadata later? Should I just add it now to be consistent?"

## The Automation Trap

My first instinct: "Claude should just automatically add metadata to every file."

Claude's response: "That fills my context window and makes me remember 10 things. Fragile."

Fair point. Relying on AI memory for consistency is a bad pattern.

## The Options

We brainstormed alternatives:

1. **VS Code snippets** - Type a trigger, auto-generate boilerplate
2. **CLI script** - `npm run new:page` with templates
3. **Linter rule** - Warn if metadata is missing
4. **YAGNI** - Don't add it until you need it

## The Decision

Move on. Don't add metadata to utility pages until there's a reason.

Content pages (posts, docs) get full metadata. App pages get it when useful. Everything else? Skip it.

## The Irony

This post about whether to automate metadata...

...required metadata.

And I spent more time discussing automation than it would've taken to just manually add metadata to the dev page.

Classic developer behavior: spend an hour automating a 30-second task.

## The Real Lesson

**Factor when it hurts, not when you think it might hurt later.**

I don't have 50 dev pages yet. I don't know if I'll ever need `updated` timestamps on utility routes. I don't know what the metadata pattern should even be for non-content pages.

So instead of premature factoring, I'm writing this post and moving on.

The metadata question will answer itself when the pain becomes real.
