---json
{
  "title": "PDF the Frankenformat",
  "slug": "pdf-the-frankenformat",
  "date": "2026-02-13T00:00:00Z",
  "description": "A critical examination of why PDF's positional layout model is fundamentally incompatible with AI-driven workflows, and why semantic web technologies are the future of document authoring.",
  "tags": ["dev", "ai", "web", "formats", "philosophy"],
  "type": "post"
}
---

# PDF is a Dead Format: Why Structured Data Beats Binary in the Age of AI

PDF has dominated document interchange for decades. But in an era where AI increasingly composes, analyzes, and transforms our documents, its fundamental architecture is showing fatal flaws.

This isn't about aesthetics or preferences. It's about **structural compatibility with machine intelligence**.

## The "Frankenformat" Problem

PDF is what I call a "Frankenformat"—a messy amalgamation of vector paths, pixel blobs, and unmapped text that prioritizes visual placement over semantic meaning. It's a "digital piece of paper" that answers the question "what should this look like?" while completely ignoring "what does this mean?"

The format's core model is positional: "Draw text X at coordinate Y with font Z." There's no inherent structure defining what a heading is, what a list is, or how sections relate to each other. Any semantic structure is either lost during PDF creation or has to be reverse-engineered through heuristics.

This made sense in 1993 when Adobe created it. The goal was faithful reproduction across systems. Mission accomplished.

But that design decision has aged catastrophically.

## Semantic Trees vs Positional Layout

Compare these two ways of representing a resume section:

**PDF's model (simplified):**
```
DrawText(72, 100, "Experience", font=Helvetica-Bold, size=14)
DrawText(72, 120, "Senior Developer", font=Helvetica, size=11)
DrawText(72, 135, "Built features for...", font=Helvetica, size=10)
```

**HTML's model:**
```html
<section class="experience">
  <h2>Experience</h2>
  <article>
    <h3>Senior Developer</h3>
    <p>Built features for...</p>
  </article>
</section>
```

The HTML version is a **semantic tree**. It explicitly declares what each piece of data represents. The PDF version is just drawing instructions. The structure exists only implicitly in the spatial arrangement.

An AI parsing the HTML immediately understands the hierarchy: this is a section, with a heading, containing an article with its own heading and content. The PDF requires complex heuristics: "This text is bold and larger, so it's probably a heading. These items are indented and start with bullets, so they're probably a list."

## What About SVG?

You might point out that AI models are notoriously bad at generating clean SVG, even though it's XML-based and structured. **Both SVG and PDF are fundamentally drawing instructions**—paths, positioning, coordinates. If structure was the magic solution, why does AI struggle with SVG too?

Fair point. The answer reveals something important: **not all structure is created equal.**

SVG has *geometric* structure but no *semantic* structure. Look at this:

```xml
<circle cx="100" cy="50" r="5" />
<text x="120" y="55">Project Lead</text>
```

Is that circle a bullet point? A decorative element? Part of a diagram? The SVG doesn't say. It just says "draw a circle here." The **meaning** is implicit in the spatial arrangement, just like PDF.

Compare to HTML:
```html
<ul>
  <li>Project Lead</li>
</ul>
```

The browser knows this is a list item and renders an appropriate bullet. You don't specify coordinates. The semantic structure maps directly to presentation logic.

**This is why AI struggles with both SVG and PDF for document composition.** Both require you to think spatially and geometrically. You have to figure out where things go, calculate spacing, manage alignment. HTML/CSS lets you think in terms of document concepts—headings, paragraphs, lists—and the layout engine does the geometry.

The real hierarchy isn't "structured vs. binary." It's:

1. **Semantic structure** (HTML): "This is a heading" → browser handles geometry
2. **Geometric structure** (SVG): "Draw this shape here" → you handle semantics
3. **Executed operations** (PDF): "Execute these operations" → structure discarded

SVG and PDF both live in the spatial/geometric realm. HTML lives in the semantic realm. That's why AI can compose HTML documents naturally but struggles with both SVG graphics and PDF layouts.

## Why This Matters Now

We're entering an era where documents aren't just read—they're **composed, analyzed, and transformed by AI**. The difference between semantic and positional formats becomes critical:

### AI Composition

When I asked Claude to generate a resume, it produced clean React/CSS in one shot. The semantic structure made it trivial for the AI to understand requirements like "section heading" or "skill list" and implement them correctly.

Asking an AI to generate a PDF directly would require it to calculate coordinates, manage font metrics, handle line breaking, and deal with page boundaries—all while maintaining visual consistency. That's why PDF generation tools exist as separate complex software, not as natural AI outputs.

### AI Analysis

Modern recruitment increasingly uses AI to parse resumes. A well-structured HTML resume can be parsed with near-perfect accuracy. A PDF resume requires OCR or text extraction heuristics that often fail on multi-column layouts, creative formatting, or non-standard fonts.

The companies building AI recruiting tools are essentially having to reverse-engineer the semantic structure that was thrown away when the document was saved as PDF.

### Dynamic Adaptation

**Responsive vs Fixed**: PDFs are fixed cages. They assume one viewing context: a letter-sized page. CSS allows the same semantic structure to render perfectly on a phone, a desktop, or in print.

**Data-Driven Design**: With structured markup, your resume is data that gets styled, not a drawing you maintain. Want to try a different color scheme? Update three CSS variables. Want to reorder sections? Move some components. In PDF, you're manually repositioning text boxes and praying nothing breaks.

### Version Control & Collaboration

Try diffing two PDF versions. You get binary garbage. Now try diffing two HTML files. You get exactly what changed, line by line, in human-readable format.

Git works with text. AI works with text. Collaboration tools work with text. PDFs are opaque blobs that resist all of these workflows.

## The Future: "Ink" as Export, Not Source

Here's my thesis: **The PDF should be relegated to a temporary snapshot—a "print driver" output, not the environment where documents are authored or stored.**

The source of truth should be **structured, semantic data**.

For resumes, that might be React/CSS. For academic papers, maybe Markdown or LaTeX (which at least has semantic structure). For business reports, maybe MDX or Notion-style block editors. The key is that the format encodes meaning, not just appearance.

The PDF becomes what it was always meant to be: a portable rendering for people who need to view or print the document. Not the master file. Not the working copy. Just the final, frozen output.

## Real-World Implications

This isn't just about resumes. Consider:

**Technical Documentation**: Companies like Stripe, Vercel, and GitHub author docs in Markdown/MDX and render to web. The structured source enables search, linking, versioning, and AI-powered features. PDF docs are increasingly rare because they're dead data.

**Academic Publishing**: LaTeX has always been semantic (it's markup, not WYSIWYG). Journals increasingly accept or prefer structured formats over PDF submissions because they need to extract metadata, citations, and structure.

**Legal Documents**: The legal industry still clings to PDF, but as AI contract analysis tools proliferate, there's growing pressure for structured formats that encode clauses, terms, and relationships explicitly rather than hiding them in positioned text.

**Forms & Applications**: Progressive web apps are replacing PDF forms because they can validate in real-time, adapt to user input, integrate with APIs, and store structured data directly. PDF forms are a nightmare of compatibility and extraction issues.

## This Isn't Idealism—It's Pragmatism

I'm not saying PDF should disappear tomorrow. It serves a purpose as a read-only distribution format. But treating it as the *authoring* format—the source of truth—is increasingly indefensible.

The web won. HTML, CSS, and JavaScript are the most successful cross-platform rendering stack ever created. They're semantic, accessible, programmable, and AI-readable. Print CSS works. Progressive enhancement works.

**The tools are here. The ecosystem is mature. The only barrier is habit.**

I've spent years thinking about typesetting—LaTeX, PDF, SVG, print design. Building my resume in React wasn't an impulsive experiment. It was a deliberate test of a thesis I've held for a while:

**In the age of AI, structured data isn't just better—it's essential.**

The machines that increasingly augment our work need to understand what our documents *mean*, not just what they *look like*. PDF was built for the latter. Web technologies were built for the former.

The future belongs to semantic trees, not Frankenformats.
