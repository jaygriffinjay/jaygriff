---json
{
  "title": "Content Creation GitHub Copilot Skill",
  "slug": "content-creator-skill-plan",
  "date": "2026-02-08T00:00:00Z",
  "updated": "2026-02-09T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.5"],
  "authorshipNote": "Created collaboratively with GitHub Copilot while working on implementing the content creation system described in this document",
  "type": "doc",
  "description": "Implementation plan for building a GitHub Copilot skill that enables natural language content creation",
  "tags": ["ai", "workflows", "github-copilot", "automation", "skills", "semantic-deterministic", "content-creation"]
}
---

## The Vision
Build a skill for GitHub Copilot that enables natural language content creation for my Next.js blog. Instead of manually filling templates or typing commands, just tell Copilot "make a blog post about X" and it handles everything.

## What We're Building: Skills vs Extensions vs MCP

**GitHub Copilot Skills** (what this doc describes):
- Custom capabilities you build for YOUR workflow
- Private to your codebase
- Run locally in VS Code
- Fast, no infrastructure needed
- Examples: `validate_post_metadata`, `scaffold_content_file`

**GitHub Copilot Extensions** (ignore these):
- Marketplace integrations for vendors (Docker, Stripe, etc.)
- Hosted services, require publishing/approval
- Sparse documentation, feels abandoned
- Not relevant for personal workflow automation

**MCP Servers** (alternative to consider later):
- Open protocol by Anthropic
- Works across multiple AI clients (Claude Desktop, Cline, etc.)
- Can run locally or remotely
- Better for portability, but more overhead

**Our choice:** Skills. Local, fast, in-codebase, zero infrastructure. If we need cross-client portability later, we can factor out to MCP servers. Extensions are a dead end.

## Why This Matters
This applies the **determinism vs semantics** paradigm I've been thinking about:
- **Semantic layer:** Claude understands intent ("blog post about archetypes")
- **Deterministic layer:** npm script extracts metadata via AI API, fills template perfectly, creates file
- **Approval loop:** Review, regenerate, or edit before finalizing

Hugo has archetypes (static templates + CLI commands). This is archetypes on steroids - intelligent, context-aware, conversational.

## MVP Scope

### What Gets Built
1. **SKILL.md** - Teaches Claude when and how to create content
2. **npm script** (`npm run new`) - Handles the actual generation
3. **One template** - Blog post frontmatter structure

### The Flow
```
User: "create a blog post about archetypes"
  ↓
Copilot (reads skill): "User wants blog content, use npm run new"
  ↓
npm script: Calls Anthropic API with tool use for structured output
  ↓
AI returns: { title, description, tags }
  ↓
Script: Fills template, creates content/posts/slug.md
  ↓
Copilot: "Created content/posts/understanding-archetypes.md" (shows for approval)
```

## Technical Details

### Skill Structure
```markdown
# Content Creator

When to use: User asks to create blog posts
Command: npm run new "<user-input>"
Process: Command handles AI extraction → template fill → file creation
```

### npm Script (`scripts/new-content.ts`)

The script will:
- Take user input as argument
- Call Anthropic API with tool use
- Use tool schema to define structured output: { title, description, tags }
- Fill template with the extracted data
- Write to appropriate content directory
- Return file path

### Why Tool Use Instead of "JSON Mode"
I was surprised to learn OpenAI markets "Structured Outputs" as revolutionary, but Claude's tool use does the same thing - define a schema, get guaranteed valid JSON. Building our own "structured outputs"!

## Future Expansion
- Multiple content types (projects, notes, docs)
- Multiple templates
- Image generation integration
- Life logging (the bigger vision)

## What Makes This Different
**Hugo archetypes:** Static template + manual command

**This:** Natural language → intelligent extraction → perfect template → approval loop

It's the "AI as action engine" paradigm - highly reasoned data that can be acted upon in the real world.

## The Meta-Realization

**GitHub Copilot is built on this exact paradigm.**

When I use different tools vs. just text responses in chat, I'm doing the same thing:
- **Semantic layer:** Interpreting intent from context clues ("create a file" vs "explain this")
- **Deterministic layer:** Calling different tools (`create_file`, `read_file`, `replace_string_in_file` vs just text response)
- **Approval loop:** Waiting for user to approve, regenerate, or edit

Copilot is a reasoning layer that routes to deterministic tools based on semantic understanding. Skills teach when to use certain tools.

**GitHub Copilot is literally the product version of this.**

Content creator skill = teaching Copilot a new tool to use  
Npm script = the deterministic backend Copilot calls  

This isn't just "a cool trick" - it's the fundamental pattern for AI-native software. AI as action engine with a reasoning layer between human intent and deterministic systems.

## Next Steps
1. Write the SKILL.md file
2. Build the npm script with tool use
3. Test with real content creation
4. Iterate on prompt and schema
5. Add more content types once MVP works

---

## Update: Refined Implementation Architecture

**2026-02-09**

### Final Directory Structure

```
content-creation/               # The whole system in one place
  ├── new-content.ts           # Main script (generic, handles all types)
  ├── content-types.ts         # Config & schemas for each content type
  ├── templates/               # All templates together
  │   ├── blog-post.md
  │   ├── note.md
  │   ├── project.md
  │   └── doc.md
  └── README.md                # How this system works

.github/skills/                # GitHub Copilot skills directory
  └── new-content/             # Generic skill name
      └── SKILL.md             # References ../../../content-creation/
```

### Command & Naming

- **Command:** `npm run content` (clear and concise)
- **Usage:** `npm run content "blog post about archetypes"`
- **Script:** `content-creation/new-content.ts`

### Extensible Design: Multiple Content Types

The system supports multiple content types from day one using the "multiple tools" approach:

**How it works:**
1. Script defines a tool for each content type
2. Single API call with all tools available
3. AI picks the right tool based on user input
4. Returns type-specific structured metadata
5. Script fills appropriate template

**Example tools:**
```typescript
tools: [
  {
    name: "create_blog_post",
    schema: { title, slug, description, tags }
  },
  {
    name: "create_note",
    schema: { title, topic, tags }
  },
  {
    name: "create_project",
    schema: { title, description, tech, status }
  }
]
```

### Config File Structure (`content-types.ts`)

```typescript
export const contentTypes = {
  'blog-post': {
    template: 'templates/blog-post.md',
    outputDir: 'content/posts',
    schema: { title, slug, description, tags }
  },
  'note': {
    template: 'templates/note.md',
    outputDir: 'content/notes',
    schema: { title, topic, tags }
  },
  'project': {
    template: 'templates/project.md',
    outputDir: 'content/projects',
    schema: { title, description, tech, status }
  }
}
```

### Template Format

Using `.md` files to match the existing content structure:

```markdown
---json
{
  "title": "{{title}}",
  "slug": "{{slug}}",
  "date": "{{date}}",
  "author": ["Jay Griffin"],
  "type": "post",
  "description": "{{description}}",
  "tags": {{tags}}
}
---

# {{title}}

[Content starts here]
```

### Why This Architecture

**Modular & Self-Contained:**
- Everything content-related lives in one place
- Easy to understand as a cohesive system
- Could move this whole folder to another project
- Self-documenting logical unit

**Extensible:**
- Add new content type = add template + schema definition
- No code changes needed for new types
- Config-driven approach

**Clean Tool Use Pattern:**
- One API call handles type detection + metadata extraction
- AI naturally picks the right tool
- Follows "tool use = structured outputs" paradigm

**Future-Proof:**
- Built for expansion from day one
- Multiple content types supported
- Easy to add image generation, life logging, etc.

### Files to Create

1. `.github/skills/new-content/SKILL.md` - Generic skill for all content types
2. `content-creation/new-content.ts` - Smart router script
3. `content-creation/content-types.ts` - Extensible config
4. `content-creation/templates/blog-post.md` - Blog post template
5. `content-creation/templates/note.md` - Note template
6. `content-creation/README.md` - System documentation
7. Update `package.json` - Add `"content": "tsx content-creation/new-content.ts"`

### The Meta Moment

While planning this implementation, GitHub Copilot read this very document and used it to design the system described in it. The human asked: "do you want to see how meta you can be by reading a post about your new skill and then giving yourself that skill?"

---

## Final Architecture: Separate Files + Manifest System

**2026-02-09 - Refined after deep discussion**

After working through implementation details, we arrived at a cleaner, more database-ready architecture that avoids string manipulation entirely.

### Core Principles

1. **No String Manipulation** - Work with pure data structures
2. **Metadata Separate from Content** - JSON files, not frontmatter
3. **UUID-Based Linking** - Filenames can change, IDs don't
4. **Manifest as Cache** - Regeneratable index, not source of truth
5. **Database-Ready** - Designed for easy migration to Postgres later

### File Structure

```
content/posts/
  ├── index.json                     ← Manifest (generated, can be rebuilt)
  ├── understanding-archetypes.md    ← Pure markdown, no frontmatter
  ├── understanding-archetypes.json  ← Metadata with UUID
  ├── semantic-vs-deterministic.md
  └── semantic-vs-deterministic.json

content-creation/
  ├── new-content.ts           ← Main script
  ├── rebuild-manifest.ts      ← Manifest regeneration utility
  ├── templates/
  │   ├── blog-post.md
  │   └── note.md
  └── README.md
```

### Metadata File Format

Each post has a JSON file with UUID and metadata:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "slug": "understanding-archetypes",
  "title": "Understanding Archetypes",
  "description": "Deep dive into archetypal patterns",
  "tags": ["psychology", "patterns"],
  "author": ["Jay Griffin"],
  "type": "post",
  "date": "2026-02-09T00:00:00Z"
}
```

**Key points:**
- UUID is the permanent identifier
- Slug is for URLs/filenames (can change)
- All metadata in one structured file
- No parsing needed - direct JSON.parse()

### Manifest System

The manifest is an **index** that maps UUIDs to file paths:

```json
{
  "posts": {
    "550e8400-e29b-41d4-a716-446655440000": {
      "contentFile": "understanding-archetypes.md",
      "metadataFile": "understanding-archetypes.json"
    }
  }
}
```

**Critical insight: Manifest is regeneratable**

```typescript
// npm run rebuild-manifest
function rebuildManifest() {
  const manifest = { posts: {} }

  // Scan all metadata files (they have the UUID)
  const metaFiles = fs.readdirSync('content/posts')
    .filter(f => f.endsWith('.json') && f !== 'index.json')

  for (const file of metaFiles) {
    const meta = JSON.parse(fs.readFileSync(file))
    const slug = meta.slug

    manifest.posts[meta.id] = {
      contentFile: `${slug}.md`,
      metadataFile: file
    }
  }

  fs.writeFileSync('index.json', JSON.stringify(manifest, null, 2))
}
```

**Benefits:**
- Git conflict in manifest? Just regenerate it
- Manifest corrupted? Rebuild from files
- Can even `.gitignore` manifest and generate on build
- Source of truth is in the files themselves

### The Script: Zero String Manipulation

```typescript
// Get AI metadata
const metadata = {
  id: crypto.randomUUID(),
  slug: aiResponse.slug,
  title: aiResponse.title,
  description: aiResponse.description,
  tags: aiResponse.tags,
  date: new Date().toISOString(),
  author: ["Jay Griffin"],
  type: "post"
}

// Write metadata - pure JSON
fs.writeFileSync(
  `content/posts/${metadata.slug}.json`,
  JSON.stringify(metadata, null, 2)
)

// Write content - clean markdown
const content = `# ${metadata.title}\n\n[Your content here]`
fs.writeFileSync(
  `content/posts/${metadata.slug}.md`,
  content
)

// Update manifest
updateManifest(metadata.id, {
  contentFile: `${metadata.slug}.md`,
  metadataFile: `${metadata.slug}.json`
})
```

**No parsing, no regex, no string replacement. Just data.**

### Database Migration Path

When ready to move to Postgres:

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY,              -- Use existing UUID
  slug TEXT UNIQUE,                 -- Use existing slug
  title TEXT,
  description TEXT,
  tags TEXT[],
  content TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Migration is just reading JSON files
INSERT INTO posts (id, slug, title, ...)
SELECT
  metadata.id,
  metadata.slug,
  metadata.title,
  ...
FROM json_files;
```

**No data transformation needed - UUIDs are already there.**

### Performance: Why JSON Files Win (For Now)

For a static Next.js blog:

**JSON Files + Static Generation:**
- Build time: Read all files once (~1-5ms per file)
- Runtime: Serve pre-generated HTML (~10-50ms)
- Zero database queries
- CDN-friendly, infinitely cacheable

**vs. Postgres:**
- Runtime: DB query (~50-200ms) per request
- Connection overhead
- Requires infrastructure

**When you'd switch to Postgres:**
- User-generated content (comments, likes)
- Real-time updates
- Complex relational queries
- Collaborative features

For content YOU create, JSON files are actually faster. The manifest system makes it database-ready when you need it.

### The Database Question: When Should We Actually Migrate?

**The key insight:** We've already structured data like a database (UUIDs, normalized fields, indexes). We've paid the conceptual complexity cost. So what are files actually giving us?

**What Files Provide (vs Database):**
1. **Git-based workflow** - version control, diffs, commit history for content
2. **Zero infrastructure** - no connection strings, no migrations, no ops overhead
3. **Portability** - content is just files, trivial to backup/move
4. **Simplicity** - no server to manage, no authentication to configure

That's it. If these four things aren't valuable, there's no reason to maintain the file-based system.

**Migrate to Database When:**
- ❌ Git workflow for content isn't valuable to you
- ❌ You need complex queries (filtering, sorting across multiple fields)
- ❌ Manifest management feels like busywork
- ❌ Multiple people need to edit content concurrently
- ❌ You want dynamic features files can't support

**Stay with Files When:**
- ✅ Git diffs for content changes are useful
- ✅ You value committing content alongside code
- ✅ Static generation performance matters
- ✅ Zero infrastructure is a feature, not a limitation
- ✅ You're the primary/only content creator

**The Decision Framework:**

Ask yourself: "What does git-based content management give me that's worth maintaining the file system complexity?"

If the answer is "not much," migrate to a database. If version control and simplicity are still valuable, keep files. The architecture ensures migration is straightforward whenever you're ready - UUIDs and JSON structure work with any database.

**Hybrid Option:**
- Content → Database (Postgres, MongoDB, or headless CMS)
- Code/templates → Git
- Best of both worlds, but loses content-in-git benefits

**Bottom line:** You've designed for easy migration. The file system isn't a trap. Use it while it's useful, migrate when it's not.

### Updated Tool Flow

```
User: "create a blog post about archetypes"
  ↓
GitHub Copilot (via skill): npm run content "blog post about archetypes"
  ↓
Script:
  1. Generate UUID
  2. Call Anthropic API with tool use (structured output)
  3. Write metadata JSON (no parsing needed)
  4. Write content MD (pure markdown)
  5. Update manifest index
  ↓
Output:
  - content/posts/understanding-archetypes.md
  - content/posts/understanding-archetypes.json
  - content/posts/index.json (updated)
  ↓
GitHub Copilot: Shows files for approval
```

**Pure data operations. No string manipulation. Database-ready.**

---

## Meta: Automating This Very Workflow

**Current workflow:**
1. Chat with AI throughout the day
2. End session by requesting an md file summarizing thoughts
3. Download to `content/md/` in repo
4. Manually add frontmatter with metadata
5. Commit

**This could be automated too:**

File watcher on `content/md/` that triggers when new file is added:
```typescript
// watches content/md/
// on new file: calls AI API
// extracts: title, description, tags, date from file content
// adds frontmatter to top of file
// done
```

**Even better - make it a skill:**
"Copilot, I just downloaded this artifact to content/md/, add the frontmatter"

Or just have the file watcher auto-trigger so you never think about it.
