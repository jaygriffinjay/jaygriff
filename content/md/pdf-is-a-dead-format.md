---json
{
  "title": "PDF The Frankenformat",
  "slug": "pdf-the-frankenformat",
  "date": "2026-02-13T00:00:00Z",
  "updated": "2026-02-16T00:00:00Z",
  "author": ["Jay Griffin", "GPT-5.3-Codex", "Claude Sonnet 4.5"],
  "authorshipNote": "This document was developed through iterative discussion, with AI-assisted drafting and revision.",
  "description": "My thesis: semantic + programmable documents (React/HTML/CSS) with AI optimization loops can match or exceed traditional LaTeX/Adobe precision while staying far more adaptable.",
  "tags": ["dev", "ai", "web", "formats", "philosophy"],
  "type": "post"
}
---

I think **HTML/CSS/React will become the premier way to author books, papers, and ebooks, and any kind of traditional publishing.**

I think PDFs are weird and bad.

I know LaTeX is deeply entrenched in academia, and I respect what it did for high-quality typesetting. But I think semantically structured, programmable, AI-assisted web workflows will eventually outperform LaTeX/PDF source pipelines for most large-scale publishing work.

## Body

### 1) Source vs output: where PDF fits

PDF still does what it was built to do: distribute and preserve final layout.

But as an authoring layer, it's weak. It's a snapshot, not a living system.

I want source-of-truth documents to be editable, composable, and programmable—then exported to PDF at the end.

### 2) Paint instructions vs document programs

Traditional page formats are mostly paint instructions:

```
put glyph here
draw line there
move to coordinate x,y
```

Modern web documents are document programs:

```tsx
<Section title="Experience">
  <Role company="..." dates="..." />
</Section>
```

That distinction is everything.

Document programs can be transformed, tested, constrained, regenerated, and versioned. Paint instructions can be precise, but they're harder to evolve and automate.

### 3) Semantics are necessary, but not paramount

This is the central clarification:

- Semantics are **necessary input**.
- Pixel-perfect typesetting is the **actual target**.

If a system understands headings and sections but cannot consistently produce publication-grade layout, it only solves half the problem.

### 4) Why AI + React/Web is a larger lever

When documents are composable React/HTML/CSS systems, AI can operate across the entire pipeline:

1. Generate and refactor structured components
2. Preserve constraints while rewriting content
3. Tune spacing, typography, and hierarchy systematically
4. Explore many variants quickly
5. Converge toward visual quality targets

This isn't just convenience. It's leverage.

Legacy tools are often precise but manual. AI-native document systems make precision iterative: generate, evaluate, refine, repeat.

### 5) Can this match or beat LaTeX/Adobe?

I think yes—at least in many real workflows, and increasingly over time.

LaTeX is still dominant in a lot of science and academia for a reason: it's stable, precise, and trusted in institutional pipelines.

My argument is that dominance doesn't imply long-term superiority. For high-volume, iterative, multi-format publishing, LaTeX/PDF-first workflows are increasingly less adaptable than AI-composable React/HTML/CSS systems.

Why:

- **Programmable constraints**: encode layout and typographic rules directly
- **Automated sweeps**: test broad variant spaces quickly
- **Unified source model**: drive web + print from one structure
- **Refactorability**: structural edits without hand-repositioning everything
- **Agentic iteration**: AI can execute large numbers of micro-adjustments fast

This is not "old tools bad, new tools good."

It's a ceiling argument: once precision and automation are combined in one workflow, the long-term upside is higher.

### 6) Practical architecture

The model I care about:

1. **Semantic source** (React/MD/HTML data model)
2. **Renderer** (browser + print pipeline)
3. **AI optimization loop** (fit, rhythm, consistency)
4. **Export artifacts** (PDF, PNG, web)

In this architecture, PDF is step 4—not step 1.

That one inversion changes everything.

### 7) Where PDF still wins (for now)

I also want to be precise about the exceptions.

PDF is still the strongest format for a narrow set of entrenched workflows:

- compliance-heavy archival and signing pipelines
- prepress and print-vendor handoff standards
- highly regulated institutional submission flows
- everyday transactional document exchange (accounting, invoice back-and-forth, approvals)

So I don't think PDF is universally useless. I think it's overused as a source format outside the places where those constraints actually matter.

### 8) Who actually cares?

For many people, this debate doesn't matter day to day.

If I'm passing routine business docs around, PDF is fine. If a company needs an invoice, I can output PDF and move on.

The argument matters when documents are part of a **programmable publishing workflow**:

- long-form books and papers
- high-volume content generation
- iterative editorial pipelines
- multi-format publishing from one source

That is the context where source format becomes a strategic decision.

### 9) What about publishing books?

For books, the answer depends on which publishing lane I'm in:

- **Print production lane**: PDF remains important for final handoff, especially where print shops require strict prepress conventions.
- **Digital/reflow lane**: semantic source formats are better, because content needs to adapt across devices and form factors.

My view is that modern publishing should still be source-first and semantic:

1. Author in React/HTML/CSS (or another semantic model)
2. Run layout and quality checks
3. Export final print artifacts (including PDF) at the edge

So even in books, PDF is best treated as the delivery container, not the authoring foundation.

## Conclusion

I don't want documents that are merely machine-readable.

I want documents that are machine-composable, machine-optimizable, and still human-beautiful in final form.

So my conclusion is:

- Keep PDF as a delivery format.
- Move source-of-truth authoring to programmable semantic systems.
- Use AI not only to parse meaning, but to drive publication-quality typesetting loops.

And to be explicit: I'm not saying "PDF is bad for everyone."

I'm saying that for large, programmatic, iterative document systems, PDF/paint-first workflows will eventually lose to semantic + programmable + AI-optimized workflows.

That's why I think HTML/CSS/React will ultimately stomp PDF-as-source and even challenge LaTeX in many publishing pipelines.

## What do I plan to actually do about this?

- Continue refining `@media print` and `@page` CSS rules for predictable, high-quality output.
- Keep React/HTML/CSS as the source document format for paper-oriented docs.
- Treat PDF as export-only: generate it from the web source after layout is dialed in.
- Build reusable layout primitives so each new document starts from a strong baseline.
- Use AI to iterate faster on spacing, line breaks, and typographic consistency.

