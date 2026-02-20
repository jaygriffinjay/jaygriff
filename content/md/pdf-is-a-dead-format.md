---json
{
  "title": "I Like Publishing",
  "slug": "pdf-the-frankenformat",
  "date": "2026-02-13T00:00:00Z",
  "updated": ["2026-02-18T00:00:00Z", "2026-02-17T00:00:00Z", "2026-02-16T00:00:00Z"],
  "author": ["Jay Griffin", "GPT-5.3-Codex", "Claude Sonnet 4.5"],
  "authorshipNote": "This document was developed through iterative discussion, with AI-assisted drafting and revision.",
  "description": "My working log for trying to publish all kinds of things (not just websites) in HTML/CSS/React",
  "tags": ["dev", "ai", "web", "formats", "publishing", "workflow"],
  "type": "post"
}
---

## What this is

This is my web-first publishing log.

I'm trying to become excellent at authoring serious documents with the tools I already use daily: HTML, CSS, and React. That includes books/ebooks, print-ready docs, professional HTML email, business documents, and automated transactional messages.

Also, I’m not anti-PDF because I’ve never used it. I’m kind of obsessed with PDF. I’ve worked with advanced PDF tools, used PDF scripting, used Python libraries for PDF manipulation, and seen firsthand in office environments how valuable highly specific PDF tooling can be. I would absolutely pay for better PDF tooling if it existed in the way I want.

Part of this whole project came from that fascination. I tried to solve problems by manipulating PDFs programmatically. But now, with AI in the loop, I’m revisiting the architecture: instead of pushing deeper into PDF manipulation libraries as the source layer, I want to build my own publishing workflows in HTML/CSS/React and export to PDF at the end.

This is not a universal declaration. It's my working model, tested in public.

## My current thesis (in one paragraph)

I think React/HTML/CSS should be the source-of-truth authoring format, and PDF should usually be the delivery format. I want to build high-quality layout in web tech first, then export at the edge (PDF when needed) instead of treating PDF as the authoring surface.

## The workflow I'm actually building

1. Author in semantic, composable source (React/HTML/CSS)
2. Tune layout quality (print CSS, spacing, hierarchy, pagination behavior)
3. Use AI to speed up iterative refinement
4. Export final artifacts per channel (PDF, web, images, etc.)

This keeps one source model while still supporting multiple outputs.

## Why I still prefer this over PDF-first authoring

PDF is great at preserving final layout. I still use it for that.

But as source, PDF is mostly a snapshot. I want document systems that are easy to refactor, test, version, and automate. Web-native source gives me that.

In short: PDF is often an excellent endpoint, but a poor starting point for iterative authoring.

## Reality check: where I'm still hitting walls

I keep running into real problems:

- cross-device print inconsistency (especially iOS)
- browser-specific print quirks
- one-breakpoint fixes that regress another breakpoint
- output quality differences between print preview pipelines

So yes, this is still messy. I'm not pretending it's solved.

Another subtle-but-big one I keep hitting: web view and print view can drift apart even when they come from the same source document. I ran into this directly on my resume workflow: somehow a single line spilled over in print view while looking completely fine in web view. Tiny responsive/layout decisions that look fine on-screen can produce weird print behavior, and print-specific fixes can then make web behavior feel off.

That experience reinforced the same point again: one source model is still the right move, but it needs deliberate print architecture and iterative QA to keep web and print in sync.

## Update: PDF wins again in some delivery contexts

iOS print behavior is inconsistent enough that PDF download is often the better UX in practice.

That doesn't invalidate the thesis. It reinforces it:

- source in web tech
- export PDF for stable delivery where needed

I still want to spend effort improving source-quality authoring and print primitives rather than endlessly manipulating PDFs upstream.

## Where PDF still clearly wins

PDF still dominates in some lanes, and I accept that:

- prepress and print-vendor handoff
- compliance/archival/signature workflows
- regulated institutional submissions
- routine transactional exchange where format stability matters more than authoring flexibility

## Who this work is for

This approach matters most when documents are part of a programmable system:

- long-form publishing pipelines
- high-volume content operations
- reusable templates across many outputs
- professional HTML email programs
- business docs + automated transactional communication

## What I’m doing next

- Keep refining `@media print` and `@page` output quality
- Keep React/HTML/CSS as source for paper-oriented docs
- Export PDF at the end when distribution requires it
- Build reusable layout primitives for repeatability
- Use AI iteration loops for spacing, line breaks, and typography consistency

## Bottom line

This is not "PDF is dead" absolutism.

This is me building a practical web-first authoring system where PDF remains a strong delivery format, but not the core authoring substrate.

