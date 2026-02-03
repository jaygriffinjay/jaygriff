import { Heading, Paragraph } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'CodeBlock Component Showcase',
  slug: 'codeblock-showcase',
  date: '2026-01-21T00:00:00Z',
  description: 'Testing and showcasing all CodeBlock component configurations including bash/shell and markdown support',
  tags: ['dev', 'components', 'testing'],
  type: 'post',
  author: ['Jay Griffin'],
  updated: [
    '2026-02-03T00:00:00Z',
    '2026-02-02T00:00:00Z',
  ],
};

export default function CodeBlockShowcase() {
  return (
    <>
      <Heading level={1}>CodeBlock Component Showcase</Heading>
      <Paragraph>
        Testing all possible CodeBlock configurations with the new filename and icon features.
      </Paragraph>

      <Heading level={2}>Copy Button Hover Behavior</Heading>
      <Paragraph>
        One of the most nuanced interactions I've implemented is the copy button's visibility logic. 
        The goal was to create behavior that feels natural and provides clear feedback without being 
        distracting or confusing.
      </Paragraph>
      
      <Paragraph>
        <strong>The Requirements:</strong>
      </Paragraph>
      <Paragraph>
        1. The copy button should only appear when hovering over a code block (reduces visual clutter)
      </Paragraph>
      <Paragraph>
        2. When clicked, the button transforms into a checkmark to confirm the copy succeeded
      </Paragraph>
      <Paragraph>
        3. The checkmark must remain visible even if you move your cursor away from the code block 
        (otherwise the user never sees the confirmation)
      </Paragraph>
      <Paragraph>
        4. After ~2 seconds, the checkmark transitions back to the copy button icon
      </Paragraph>
      <Paragraph>
        5. Here's the tricky part: if your cursor is still on the code block when it transitions back, 
        the copy button should remain visible. But if your cursor moved away, the copy button should 
        immediately disappear without any flash or brief visibility.
      </Paragraph>
      
      <Paragraph>
        <strong>The Technical Challenge:</strong>
      </Paragraph>
      <Paragraph>
        CSS transitions create a problem here. When the button switches from checkmark back to copy icon, 
        it needs different visibility behavior depending on hover state:
      </Paragraph>
      <Paragraph>
        - If hovering: opacity should be 1 (visible)
      </Paragraph>
      <Paragraph>
        - If not hovering: opacity should instantly snap to 0, with no transition
      </Paragraph>
      <Paragraph>
        The issue is that a transition on opacity means there's a brief moment where the copy button 
        fades out, creating a flash of visibility even when you're not hovering.
      </Paragraph>
      
      <Paragraph>
        <strong>The Solution:</strong>
      </Paragraph>
      <Paragraph>
        I used a combination of data attributes and conditional CSS transitions. The button has a 
        `data-copied` attribute that tracks whether it's showing the checkmark or copy icon. When 
        `data-copied="false"` (transitioning back to copy icon), I apply `transition: none` which 
        makes the opacity change instant rather than animated. This means:
      </Paragraph>
      <Paragraph>
        - Checkmark always fades in/out smoothly (better UX)
      </Paragraph>
      <Paragraph>
        - Copy button appears smoothly when you hover (good)
      </Paragraph>
      <Paragraph>
        - Copy button instantly disappears when switching from checkmark if not hovering (exactly what we want)
      </Paragraph>
      <Paragraph>
        - Copy button stays visible if you're hovering during the transition (also exactly what we want)
      </Paragraph>
      
      <Paragraph>
        Additionally, I render both SVG icons simultaneously with crossfading opacity transitions. 
        This eliminates the jarring flash that happens when you conditionally render one or the other.
      </Paragraph>
      
      <Paragraph>
        The result is an interaction that feels completely natural - the copy button never flashing briefly, and the checkmark confirmation is always visible long enough to 
        register.
      </Paragraph>

      <Heading level={2}>TypeScript Files</Heading>
      <CodeBlock language="ts" filename="example.ts">
        {`interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  return { id, name: 'John', email: 'john@example.com' };
}`}
      </CodeBlock>

      <Heading level={2}>TSX/React Files</Heading>
      <CodeBlock language="tsx" filename="Button.tsx">
        {`export function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}`}
      </CodeBlock>

      <Heading level={2}>JavaScript Files</Heading>
      <CodeBlock language="js" filename="utils.js">
        {`function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(date);
}

module.exports = { formatDate };`}
      </CodeBlock>

      <Heading level={2}>JSX Files</Heading>
      <CodeBlock language="jsx" filename="Card.jsx">
        {`export function Card({ title, content }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}`}
      </CodeBlock>

      <Heading level={2}>CSS Files</Heading>
      <CodeBlock language="css" filename="styles.css">
        {`.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}`}
      </CodeBlock>

      <Heading level={2}>HTML Files</Heading>
      <CodeBlock language="markup" filename="index.html">
        {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Example Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`}
      </CodeBlock>

      <Heading level={2}>Markdown Files</Heading>
      <CodeBlock language="markdown" filename="README.md">
        {`# Project Title

A brief description of the project.

## Features

- **Feature 1**: Does something amazing
- **Feature 2**: Does something else
- Feature 3

## Installation

\`\`\`bash
npm install my-package
\`\`\`

## Usage

Here's how to use it:

\`\`\`typescript
import { MyComponent } from 'my-package';

const app = <MyComponent />;
\`\`\`

## Links

- [Documentation](https://example.com/docs)
- [GitHub](https://github.com/example/repo)

> **Note:** This is an important callout.

---

Made with ❤️ by the team`}
      </CodeBlock>

      <Paragraph>Using language="md":</Paragraph>
      <CodeBlock language="md" filename="CONTRIBUTING.md">
        {`# Contributing Guidelines

Thank you for contributing!

## Pull Request Process

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing\`)
5. Open a Pull Request

### Code Style

- Use TypeScript
- Follow ESLint rules
- Write tests for new features

**Important:** All PRs must pass CI checks.`}
      </CodeBlock>

      <Heading level={2}>Bash/Shell Scripts</Heading>
      <Paragraph>Using language="bash":</Paragraph>
      <CodeBlock language="bash" filename="deploy.sh">
        {`#!/bin/bash

# Deploy script
echo "Starting deployment..."

npm install
npm run build

if [ $? -eq 0 ]; then
  echo "Build successful!"
  npm start
else
  echo "Build failed!"
  exit 1
fi`}
      </CodeBlock>

      <Paragraph>Using language="shell":</Paragraph>
      <CodeBlock language="shell">
        {`# Common shell commands
git add .
git commit -m "feat: add new feature"
git push origin main

# Environment setup
export NODE_ENV=production
export PORT=3000`}
      </CodeBlock>

      <Paragraph>Using language="sh":</Paragraph>
      <CodeBlock language="sh" filename="setup.sh">
        {`#!/bin/sh
# Minimal POSIX shell script
cd /usr/local/bin
ln -s /opt/app/cli ./app
chmod +x ./app`}
      </CodeBlock>

      <Heading level={2}>Without Filename (Language Fallback)</Heading>
      <CodeBlock language="ts">
        {`// No filename prop, should show "typescript"
const greeting: string = 'Hello, World!';
console.log(greeting);`}
      </CodeBlock>

      <Heading level={2}>Without Header</Heading>
      <CodeBlock language="js" showHeader={false}>
        {`// Header hidden completely
const result = 42;`}
      </CodeBlock>

      <Heading level={2}>Edge Cases</Heading>
      <Paragraph>No language specified (plain text):</Paragraph>
      <CodeBlock>
        {`Plain text code block
Should show "text" in header`}
      </CodeBlock>

      <Paragraph>Unknown file extension:</Paragraph>
      <CodeBlock filename="readme.txt">
        {`Text file with no icon
Should show filename without icon`}
      </CodeBlock>

      <Paragraph>Long bash command (word wrapping test):</Paragraph>
      <CodeBlock language="bash">
        {`# Really long commands
docker run -d --name my-container --restart unless-stopped -p 8080:8080 -v /host/path:/container/path -e DATABASE_URL=postgresql://user:password@localhost:5432/dbname my-image:latest

# Piped commands
cat /var/log/syslog | grep -i error | awk '{print $1, $2, $3}' | sort | uniq -c | sort -rn | head -20`}
      </CodeBlock>
    </>
  );
}
