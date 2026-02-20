---json
{
  "title": "Building My Resume with React and CSS",
  "slug": "building-resume-with-react",
  "date": "2026-02-13T10:00:00Z",
  "updated": "2026-02-16T20:00:00Z",
  "author": ["Jay Griffin", "GPT-5.3-Codex", "Claude Sonnet 4.5"],
  "description": "How I ditched traditional design tools and built a print-perfect resume using React, Emotion, and CSS print media queries.",
  "tags": ["dev", "react", "css", "workflow"],
  "type": "post"
}
---

I needed a resume. My plan was to fire up Affinity Publisher, spend a few hours wrestling with text boxes and alignment, export a PDF, and call it done.

Then I had a thought: *wait, can I build this in React*?

And so I did. You can [view the live resume here](/resume).

## Why This Actually Makes Sense

Web technology is criminally underrated for document creation. Here's what I got by building my resume as a React component instead of using traditional design tools:

- **Version control**: Every change is tracked in git
- **Programmatic generation**: I can swap content, iterate on layout, or generate variations instantly
- **High-control print output**: CSS `@media print` gives me strong control over how it prints
- **AI-assisted editing**: Working in code means I can collaborate with AI to refine wording and layout in real-time
- **Semantic HTML**: The structure is clean and accessible, not locked in a proprietary format

## The Technical Approach

I built the resume in Next.js with Emotion for styling. The entire page is one React component (`/src/app/resume/page.tsx`) with styled components for each section.

### Key Learnings: Print CSS

The most valuable thing I learned was **print media queries**. I'd never seriously used them before, and they're incredibly powerful:

```css
@media print {
  @page {
    margin: 0.7in;
    size: letter;
  }
  
  nav, header, footer {
    display: none !important;
  }
  
  .resume-section {
    page-break-inside: avoid;
  }
}
```

The `@page` rule controls physical page margins. `page-break-inside: avoid` prevents sections from splitting across pages. These are the primitives you need to make print-perfect documents.

### Matching Screen and Print

The trick was making the screen view match the print output exactly. I set the container to `8.5in` max-width with `0.7in` padding (simulating print margins), then stripped that padding in print mode:

```css
max-width: 8.5in;
padding: 0.7in;

@media print {
  padding: 0;
}
```

This got screen and print much closer, but it wasn't a perfect one-to-one match in every browser or preview path.

### Fitting to One Page

Getting everything to fit on one page required aggressive spacing optimization. I tightened:
- Section margins: 0.45rem
- Line heights: 1.25
- Font size: 10.5pt body, 13pt headers
- Bullet spacing: 0.02rem

Every line matters when you're targeting single-page print.

## The Workflow Shift

After the CSS mechanics were in place, the real question became workflow speed versus formatting reliability.

The biggest revelation was speed. With AI assistance, I could:
- Rapidly iterate on bullet point wording
- Adjust spacing and see results instantly
- Experiment with layout changes in seconds
- Generate and test print output without leaving the browser

It still felt faster than my old InDesign/Affinity loop, but it definitely wasn't frictionless. I still had plenty of export-preview-adjust cycles while dialing in print behavior.

## Reality Check (Important Disclaimer)

I want to be explicit about this: this was **not** a one-shot, perfectly polished result from a short prompting session.

I ran into major formatting issues trying to align browser rendering with print preview and final PDF output. That turned into a bigger debugging effort and a reminder that browser print previews are useful, but not perfect.

At the time of writing, I am **still** debugging details of my one-page resume PDF.

I still believe in this approach, though. Even with rough edges today, HTML/CSS/React is a strong source format for publishing if I keep improving the workflow and tooling around print consistency.

## Validating the Approach

After building my resume, I wanted to test if this workflow was actually reproducible or just a lucky accident. So I ran an experiment with Claude.

I asked it to help me write a prompt that would generate a complete resume in React from scratch. Claude gave me this:

> **Create a professional resume as a single-page React component (.tsx) with the following requirements:**
>
> **Layout & Dimensions:**
> - Letter size (8.5" x 11") with standard printable margins (0.5-0.75" on all sides)
> - Design should render identically on screen and in print
> - Use CSS to set explicit page dimensions and ensure content fits within one page
>
> **Structure & Sections:**
> - Clean, ATS-friendly layout with clear visual hierarchy
> - Standard resume sections: contact info, summary/objective, experience, education, skills
> - Consistent spacing and alignment throughout
> - Professional typography with appropriate font sizes (10-12pt body, 14-18pt headers)
>
> **Styling:**
> - Modern but conservative design suitable for any industry
> - Subtle use of color (1-2 accent colors max)
> - Clear section dividers without being heavy-handed
> - Balance whitespace with information density
>
> **Technical:**
> - Single .tsx file with inline CSS or styled-components
> - No external dependencies beyond React
> - Responsive font sizing using rem/em units
>
> **Content:**
> - Include placeholder content that demonstrates proper formatting
> - Show 2-3 job entries with bullet points
> - Display skills in a clean, scannable format
>
> **The goal is a production-ready resume template that looks polished on screen and prints perfectly without adjustment.**

I took that prompt to a fresh Claude chat. The result? [A mostly complete resume](https://claude.ai/public/artifacts/1f9aef7c-6489-401d-8f36-cd071e9b6eaa) in one shot.

Not perfect, but good enough to prove the point: **AI can compose print-ready documents in React/CSS with minimal friction.** The semantic structure of HTML/CSS makes it natural for AI to work with, unlike the opaque positional model of PDF.

## Takeaways

The experience was mixed but convincing. HTML and CSS are still more powerful than PDF for documents I need to iterate on:
- Version-controllable (Git works perfectly)
- Programmatically manipulable (it's just code)
- Semantic and accessible (screen readers, search engines)
- Print-capable with `@media print` (with real-world tradeoffs and debugging)

So my conclusion is not “this is effortless.” My conclusion is “this is worth investing in.”

I'm not going back to traditional design tools for this kind of document work. React + CSS + print media queries is still my stack, and the print tooling just needs to keep maturing.

To go deeper on why structured formats like HTML fundamentally beat binary formats like PDF—especially in the age of AI—I already wrote that argument here: [PDF the Frankenformat](/posts/pdf-the-frankenformat).
