---json
{
  "title": "Feature Spec: /live — Personal Microblog Feed",
  "slug": "live-feed-spec",
  "date": "2026-03-02T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.6"],
  "authorshipNote": "Claude Sonnet 4.6 via GitHub Copilot",
  "type": "doc",
  "description": "Spec for a /live route — a personal microblog feed powered by a write API and SQLite, postable from anywhere including a phone.",
  "tags": ["spec", "live", "microblog", "sqlite", "api", "roadmap"],
  "projectId": "jaygriff"
}
---

## The Idea

A `/live` route that works like a CNN live news feed crossed with a personal Twitter wall — except it's on my own site, I own everything, and there's no algorithm or platform risk.

The feed is a reverse-chronological stream of short blurbs. Each entry is timestamped. Low friction to post, permanently mine, searchable once search is built.

The key requirement: I should be able to post from my phone, not just from my IDE. That's what separates this from the file-based content system and makes it actually useful as a microblog.

---

## Why Not Just Use Twitter

- I don't like Twitter
- Platform risk — content can disappear, accounts get banned, APIs get paywalled
- Character limits are arbitrary
- No integration with my own search, metadata, or content system
- The content isn't in git, isn't mine

The cross-posting angle (post here → also post to Bluesky/Twitter) is interesting later. But the source of truth should be my own site.

---

## Why This Needs SQLite (Not Flat Files)

The file-based content system works great for content I write in my IDE. But blurbs need zero friction — I'm on my phone, I have a thought, it should be live in 10 seconds.

Flat files require:
1. Open IDE
2. Create file in right location
3. Write frontmatter
4. Commit
5. Push
6. Wait for deploy

That's 5 steps too many. A writable database enables a proper write API. Post from anywhere.

This feature is a forcing function for the SQLite migration — it's the first thing that genuinely can't be done well with flat files.

---

## Data Model

Simple. No title required — these are blurbs.

```sql
CREATE TABLE live_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  body TEXT NOT NULL,
  tags TEXT, -- JSON array stored as string
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT
);
```

---

## Write API

```ts
// src/app/api/live/route.ts
export async function POST(request: Request) {
  const auth = request.headers.get('Authorization');
  if (auth !== `Bearer ${process.env.LIVE_API_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { body, tags } = await request.json();

  if (!body?.trim()) {
    return Response.json({ error: 'Body required' }, { status: 400 });
  }

  const entry = db.prepare(
    `INSERT INTO live_entries (body, tags) VALUES (?, ?) RETURNING *`
  ).get(body.trim(), tags ? JSON.stringify(tags) : null);

  return Response.json(entry, { status: 201 });
}
```

`LIVE_API_SECRET` is a long random string stored in Vercel environment variables. Never in the repo.

---

## Auth Strategy

Simple bearer token for personal use. No OAuth, no sessions, no complexity.

Generate a secret:
```bash
openssl rand -base64 32
```

Add to Vercel env vars as `LIVE_API_SECRET`. Use in every request:

```
Authorization: Bearer <your-secret>
```

---

## Posting From Anywhere

**Mobile web form at `/admin/live`** (best option for phone):
- Password-gated page, works great in mobile Safari
- Textarea + submit, that's it
- Add it to your home screen as a PWA bookmark for one-tap access
- No app, no Shortcuts, no bugs — just a webpage

**Twilio SMS webhook**:
- Buy a number, point the SMS webhook at `/api/live/sms`
- Any text you send to that number gets posted as a blurb
- More setup but most frictionless once configured

**Admin form at `/admin/live`** (same as above, also accessible from desktop):
- Works from any browser on any device

**Copilot/Cline skill** (for IDE posting):
- Trigger words: `blurb`, `tweet`, `live`
- Skill calls the write API directly
- Good for when you're already in the IDE and want to post something technical

---

## /live Page

```tsx
// src/app/live/page.tsx
export default async function LivePage() {
  const entries = db.prepare(
    `SELECT * FROM live_entries ORDER BY created_at DESC`
  ).all();

  return (
    <Container size="sm">
      <Heading level={1}>Live</Heading>
      {entries.map(entry => (
        <LiveEntry key={entry.id} entry={entry} />
      ))}
    </Container>
  );
}
```

Each entry renders the body (markdown-enabled), timestamp, and optional tags. Simple card or just paragraphs with a timestamp — no need to over-design it.

---

## Agent Skill (Future)

Once the API is live, a Copilot/Cline skill can call it directly.

Trigger words: `blurb`, `tweet`, `live post`

The skill:
1. Captures the message text from the conversation
2. Optionally extracts tags from context
3. POSTs to `/api/live` with auth header
4. Confirms it posted

This way posting a blurb while working is: "blurb: just figured out that SQLite FTS5 snippet() returns highlighted fragments out of the box" → done.

---

## Implementation Order

1. SQLite migration (prerequisite — need a writable DB)
2. `live_entries` table
3. `POST /api/live` route with bearer auth
4. `/live` page rendering entries
5. iOS Shortcut for phone posting
6. Copilot skill for IDE posting
7. (Optional) Twilio SMS webhook
8. (Optional) Cross-post to Bluesky
