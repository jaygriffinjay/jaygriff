---json
{
  "title": "Epic Dev Routes - Your App as Your Tooling Layer",
  "slug": "epic-dev-routes",
  "date": "2026-02-08T00:00:00Z",
  "author": ["Jay Griffin"],
  "type": "doc",
  "description": "Stop building separate tools - use Next.js /dev/* routes to turn your entire app into a personal productivity layer with hot reload, TypeScript safety, and zero deployment overhead",
  "tags": ["next.js", "dev-tools", "workflows", "architecture", "productivity", "dx", "web-dev"]
}
---

# Epic Dev Routes - Your App as Your Tooling Layer

## The Core Idea
Stop building separate tools. Your Next.js app IS the tool. Add `/dev/*` routes for every internal workflow and unlock your entire app as your personal productivity layer.

## Why This Is Genius
- ✅ Use your existing design system
- ✅ Hot reload during development
- ✅ Full TypeScript safety
- ✅ Same component library
- ✅ Access to your real data
- ✅ Works on any device with a browser
- ✅ Zero deployment/maintenance of separate tools

---

## The First Dev Route: Metadata Approval Panel

### `/dev/approve-metadata`

**The Problem:** You download MD artifacts from AI chats to `content/md/`. They need frontmatter with proper metadata.

**The Flow:**
1. New file appears in `content/md/`
2. Claude Code skill detects it
3. AI extracts metadata from content
4. Skill opens: `http://localhost:3000/dev/approve-metadata?file=content-creator-plan.md`
5. Approval UI shows up in your browser
6. You iterate/approve
7. Frontmatter gets written to file

### Implementation

**Page Component (`app/dev/approve-metadata/page.tsx`):**
```typescript
'use client'

import { useState, useEffect } from 'react'

export default function ApproveMetadata({ searchParams }) {
  const [metadata, setMetadata] = useState(null)
  const [content, setContent] = useState('')
  const [editing, setEditing] = useState(false)
  
  useEffect(() => {
    // Load file content and AI-extracted metadata
    fetch(`/api/dev/get-metadata?file=${searchParams.file}`)
      .then(r => r.json())
      .then(data => {
        setMetadata(data.metadata)
        setContent(data.content)
      })
  }, [])
  
  const regenerate = async (prompt) => {
    const res = await fetch('/api/dev/regenerate-metadata', {
      method: 'POST',
      body: JSON.stringify({ file: searchParams.file, prompt, content })
    })
    const data = await res.json()
    setMetadata(data.metadata)
  }
  
  const approve = async () => {
    await fetch('/api/dev/approve-metadata', {
      method: 'POST',
      body: JSON.stringify({ 
        file: searchParams.file, 
        metadata 
      })
    })
    alert('✓ Frontmatter added!')
  }
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Approve Metadata</h1>
      
      {/* Preview Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Content Preview</h2>
        <div className="bg-gray-50 p-4 rounded border">
          {content.slice(0, 500)}...
        </div>
      </div>
      
      {/* Metadata Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Extracted Metadata</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Title</label>
            <input 
              value={metadata?.title || ''} 
              onChange={(e) => setMetadata({...metadata, title: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea 
              value={metadata?.description || ''} 
              onChange={(e) => setMetadata({...metadata, description: e.target.value})}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Tags</label>
            <input 
              value={metadata?.tags?.join(', ') || ''} 
              onChange={(e) => setMetadata({...metadata, tags: e.target.value.split(',').map(t => t.trim())})}
              className="w-full border rounded px-3 py-2"
              placeholder="ai, workflows, automation"
            />
          </div>
        </div>
      </div>
      
      {/* AI Iteration Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Refine with AI</h2>
        <input 
          placeholder="e.g., 'Make tags more specific' or 'Add a focus on meta-realizations'"
          className="w-full border rounded px-3 py-2 mb-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              regenerate(e.target.value)
              e.target.value = ''
            }
          }}
        />
        <p className="text-sm text-gray-500">Press Enter to regenerate metadata</p>
      </div>
      
      {/* Actions */}
      <div className="flex gap-4">
        <button 
          onClick={approve}
          className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700"
        >
          ✓ Approve & Add Frontmatter
        </button>
        <button 
          onClick={() => regenerate('Make it better')}
          className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700"
        >
          ↻ Regenerate
        </button>
      </div>
    </div>
  )
}
```

**API Routes:**

```typescript
// app/api/dev/get-metadata/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filepath = searchParams.get('file')
  
  const content = fs.readFileSync(`content/md/${filepath}`, 'utf-8')
  
  // Call AI to extract metadata
  const metadata = await extractMetadataWithAI(content)
  
  return Response.json({ content, metadata })
}

// app/api/dev/regenerate-metadata/route.ts
export async function POST(request: Request) {
  const { content, prompt } = await request.json()
  
  // Call AI with refinement prompt
  const metadata = await extractMetadataWithAI(content, prompt)
  
  return Response.json({ metadata })
}

// app/api/dev/approve-metadata/route.ts
export async function POST(request: Request) {
  const { file, metadata } = await request.json()
  
  const content = fs.readFileSync(`content/md/${file}`, 'utf-8')
  
  const frontmatter = `---
title: "${metadata.title}"
date: "${new Date().toISOString()}"
description: "${metadata.description}"
tags: ${JSON.stringify(metadata.tags)}
---

${content}`
  
  fs.writeFileSync(`content/md/${file}`, frontmatter)
  
  return Response.json({ success: true })
}
```

---

## More Epic Dev Route Ideas

### `/dev/content-studio`
Full CMS for your content
- Browse all posts/projects/notes
- Edit frontmatter inline
- Preview rendered markdown
- Bulk tag editor
- Search and filter
- Publish/unpublish toggle

### `/dev/ai-playground`
Test AI prompts and tools
- Try different models
- Compare outputs
- Save successful prompts as templates
- See token usage
- Test tool calling
- Experiment with temperature/top_p

### `/dev/logs`
Beautiful log viewer
- Real-time log streaming
- Filter by level/source
- Search logs
- Pretty print JSON
- Request/response viewer
- Error tracking

### `/dev/db-browser`
Visual database explorer
- Browse tables
- Run queries with SQL editor
- Edit records inline
- See relationships
- Export data
- Migration runner

### `/dev/emails`
Email development studio
- Preview email templates
- Test with different data
- Send test emails
- See responsive preview
- Check spam score
- Template editor

### `/dev/api-playground`
Internal API testing
- All endpoints listed
- Auto-generated forms from types
- Save request collections
- See response times
- Mock different states
- Auth token management

### `/dev/feature-flags`
Feature toggle dashboard
- Toggle features on/off
- Per-user overrides
- Rollout percentages
- A/B test configs
- See which features are active

### `/dev/analytics`
Local analytics dashboard
- No external services
- Real-time metrics
- Custom events
- User flows
- Performance monitoring
- Error tracking

### `/dev/design-system`
Component library browser
- All components showcased
- Props documentation
- Interactive examples
- Copy component code
- Color palette
- Typography scale

### `/dev/translations`
i18n management
- See all translation keys
- Find missing translations
- Edit inline
- Auto-translate with AI
- Export/import
- Usage tracking

### `/dev/cron-jobs`
Background task manager
- See scheduled jobs
- Trigger manually
- View execution history
- See failures
- Edit schedules
- Add new jobs

### `/dev/webhooks`
Webhook testing
- Receive webhooks locally
- Inspect payloads
- Replay webhooks
- Mock webhook sources
- Test error handling

---

## The Pattern

Every dev route follows the same structure:

1. **Display** - Show the current state (files, data, logs, etc)
2. **Interact** - Forms, buttons, inline editing
3. **AI-Assist** - Let AI help with tedious parts
4. **Approve** - Human verification before changes
5. **Execute** - Write to files, DB, trigger actions

It's the approve/regenerate/edit loop applied to every internal workflow.

---

## Why This Beats Separate Tools

**Separate Admin Panel:**
- Different codebase
- Different styling
- Deploy separately
- Maintain separately
- Context switching

**Dev Routes:**
- Same codebase
- Same components
- Zero deployment
- Auto-maintained
- Stays in flow

---

## Getting Started

1. Create `app/dev/layout.tsx` with dev-only auth/styling
2. Add your first route (`/dev/approve-metadata`)
3. Build the approval UI
4. Add more routes as you find workflows to optimize
5. Your app becomes your entire tooling layer

---

**The web is the greatest general-purpose UI creation device in the universe. Use it for everything.**
