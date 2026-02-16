---json
{
  "title": "Building My Resume with React and CSS",
  "slug": "building-resume-with-react",
  "date": "2026-02-13T10:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.5"],
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
- **Perfect print output**: CSS `@media print` gives me pixel-perfect control over how it prints
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

This way, what I see on screen is what prints. No surprises.

### Fitting to One Page

Getting everything to fit on one page required aggressive spacing optimization. I tightened:
- Section margins: 0.45rem
- Line heights: 1.25
- Font size: 10.5pt body, 13pt headers
- Bullet spacing: 0.02rem

Every line matters when you're targeting single-page print.

## The Workflow Shift

The biggest revelation was speed. With AI assistance, I could:
- Rapidly iterate on bullet point wording
- Adjust spacing and see results instantly
- Experiment with layout changes in seconds
- Generate and test print output without leaving the browser

This blew away the InDesign/Affinity workflow. No fumbling with text boxes, no export-preview-adjust cycles. Just code, save, refresh.

## Takeaways

This was a revelation. HTML and CSS are legitimately more powerful than PDF for documents you actually need to work with:
- Version-controllable (Git works perfectly)
- Programmatically manipulable (it's just code)
- Semantic and accessible (screen readers, search engines)
- Print-capable with `@media print` (no compromises)

I'm not going back to traditional design tools for documents. React + CSS + print media queries is my stack now.

If you want to dig deeper into why structured formats like HTML fundamentally beat binary formats like PDF—especially in the age of AI—I wrote a whole piece on it: [PDF is a Dead Format](/posts/pdf-is-a-dead-format).

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

And the best part? You can [view my actual resume](/resume) right here on the site. Same component, same code, same print output.
> - Professional contact information layout
>
> **The goal is a production-ready resume template that looks polished on screen and prints perfectly without adjustment.**

Interestingly, Claude's trace showed it pulled from a "how to do good frontend design skill" knowledge base. The prompt was precise and covered all the constraints that matter for print documents.

I took that refined prompt, opened a fresh chat, and fed it in. The result? A surprisingly solid resume in one shot. Not perfect, but good enough to validate the approach.

And here's the kicker: Claude generates these as artifacts that you can publish and share directly. [Here's that initial resume](https://claude.ai/public/artifacts/1f9aef7c-6489-401d-8f36-cd071e9b6eaa), live and interactive. No build step, no deployment—just instant publishing.

This confirmed what I'd experienced building my own: **AI can compose print-ready documents in React/CSS with minimal friction.** The semantic structure makes it trivial for AI to understand and modify, unlike the opaque format of a PDF.
