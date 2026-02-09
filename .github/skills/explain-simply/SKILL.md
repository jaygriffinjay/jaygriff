---
name: explain-simply
description: Explain code in simple terms with analogies and clear structure
argument-hint: [file-path or topic]
disable-model-invocation: true
allowed-tools: Read, Grep, Glob
---

When explaining code, follow this structure to make it accessible and clear:

## 1. High-Level Overview
Start with a one-sentence summary: What does this code do?

## 2. Real-World Analogy
Compare the code to something from everyday life that captures its essence. Make it relatable and memorable.

## 3. Step-by-Step Walkthrough
Break down the code into logical chunks and explain each part:
- Use simple language
- Avoid jargon unless necessary (and define it when you use it)
- Highlight the most important parts
- Show the flow of data or control

## 4. Visual Representation (when helpful)
If it helps understanding, create a simple ASCII diagram showing:
- Data flow
- Component relationships
- Process steps
- State changes

## 5. Key Concepts
Explain any important patterns, principles, or techniques used:
- Why was it done this way?
- What problem does it solve?
- What are the benefits of this approach?

## 6. Common Gotchas
Point out things that might surprise or confuse people:
- Edge cases
- Common misconceptions
- Things that look like they do X but actually do Y
- Potential pitfalls

## Guidelines
- **Be conversational**: Write like you're explaining to a friend
- **Use examples**: Concrete examples beat abstract descriptions
- **Build understanding gradually**: Start simple, add complexity
- **Focus on "why"**: Don't just say what the code does, explain why it matters
- **Be encouraging**: Make the reader feel like they can understand this

## If a file path is provided
1. Read the file first
2. Understand its context in the codebase
3. Explain not just what it does, but how it fits into the bigger picture