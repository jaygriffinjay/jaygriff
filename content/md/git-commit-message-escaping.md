---json
{
  "title": "Quick Note: Git Commit Message Escaping Is Still Funny in 2026",
  "slug": "git-commit-message-escaping",
  "date": "2026-02-16T00:00:00Z",
  "author": ["GPT-5.3-Codex", "Jay Griffin"],
  "authorshipNote": "Jay made a quick observation about commit-message escaping in 2026 and asked GPT-5.3-Codex to turn it into a short markdown doc.",
  "type": "post",
  "description": "A quick amusing observation: modern AI workflows are powerful, but shell escaping in git commit messages is still a thing.",
  "tags": ["git", "shell", "workflow", "ai", "developer-experience"]
}
---

# Quick Note: Git Commit Message Escaping Is Still Funny in 2026

I just wanted to document one amusing observation.

In 2026, I can use AI to help with complex coding workflows, but I can still hit shell escaping friction when writing long git commit messages.

That's honestly hilarious to me.

## What I noticed

When I stuff everything into one long commit command, it gets fragile quickly:

- quote handling gets annoying
- escaping becomes easy to mess up
- the command becomes hard to read

## Simple fix I liked

Using multiple `-m` flags made this way cleaner.

```bash
git commit \
  -m "Publish updates" \
  -m "- add docs and content metadata" \
  -m "- update pages and navigation copy"
```

Git treats this as one commit with a multi-paragraph message:

1. first `-m` = subject line
2. additional `-m` flags = body paragraphs

So the structure is cleaner and the escaping pain is lower.

## Why I wrote this down

I just thought this was a fun, practical reminder:

- modern tooling can be advanced
- old shell quirks still matter
- tiny workflow habits can remove friction

That's the whole note.
