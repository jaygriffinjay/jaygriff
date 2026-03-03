---json
{
  "title": "Debug: All CodeBlock Languages (Markdown)",
  "slug": "debug-codeblocks",
  "date": "2026-03-02T18:00:00Z",
  "type": "doc",
  "description": "Test page for every configured CodeBlock language rendered through the markdown pipeline.",
  "tags": ["debug", "codeblock"],
  "author": ["Jay Griffin", "Claude Opus 4.6"],
  "authorshipNote": "Claude Opus 4.6 via GitHub Copilot",
  "relatedPosts": ["codeblock-showcase", "markdown-renderer-implementation"]
}
---

# Debug: All CodeBlock Languages (Markdown)

Testing every configured Prism language through the MarkdownRenderer pipeline.

## TypeScript

```typescript
const greeting: string = 'Hello, World!';
console.log(greeting);
```

## JavaScript

```javascript
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(date);
}
module.exports = { formatDate };
```

## TSX

```tsx
export function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}
```

## JSX

```jsx
export function Card({ title, content }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
```

## CSS

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.btn {
  background: #007bff;
  color: white;
}
```

## HTML (markup)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

## Bash

```bash
#!/bin/bash
echo "Hello from bash"
for i in {1..5}; do
  echo "Count: $i"
done
```

## Markdown

```markdown
# Heading

A paragraph with **bold** and *italic*.

- Item 1
- Item 2
```

## SQL

```sql
SELECT
  p.slug,
  p.title,
  snippet(search_fts, 1, '<mark>', '</mark>', '...', 20) AS excerpt
FROM search_fts
JOIN posts p ON p.id = search_fts.rowid
WHERE search_fts MATCH ?
ORDER BY rank;
```

## AutoHotkey

```autohotkey
; Remap Caps Lock to Escape
CapsLock::Escape

; Launch Notepad with Win+N
#n::Run "notepad.exe"

; Hotstring
::btw::by the way

Greet(name) {
    return "Hey, " . name . "!"
}
```

## No Language (plain text)

```
Just plain text with no language specified.
Should render as a basic code block.
```

## Inline Code Test

This paragraph has `inline code` in it and should NOT render as a CodeBlock.
