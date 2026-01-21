---json
{
  "title": "Why React Components Rule",
  "slug": "why-react-components-rule",
  "date": "2026-01-20T00:00:00Z",
  "author": ["Jay Griffin"],
  "type": "post",
  "description": "Encapsulation means I can write the most cursed code imaginable and it's totally fine",
  "tags": ["react", "components", "web-dev", "philosophy"]
}
---

# Why React Components Rule

## The Cursed Code Problem

You know what's great about components? I can write the absolute most cursed styling logic imaginable, and it's totally fine.

Need conditional spacing based on whether an asterisk exists? Sure, add some `&nbsp;&nbsp;` nonsense with ternaries. Need to conditionally render markup based on metadata? Throw in some inline logic. Need to mix raw HTML with styled components? Do whatever works.

```tsx
{metadata.authorshipNote ? (
  <span>·&nbsp; {formatPostDate(metadata.date)}</span>
) : (
  <span>&nbsp;&nbsp;·&nbsp; {formatPostDate(metadata.date)}</span>
)}
```

Is this beautiful? No.  
Does it work? Yes.  
Is it contained? **Absolutely.**

## Encapsulation = Freedom to Be Ugly

The whole point of components is encapsulation. That cursed `&nbsp;&nbsp;` spacing logic lives in one place - `ContentHeader.tsx` - and the rest of my app just imports `<ContentHeader />` without knowing or caring about the nightmare inside.

**Contain the chaos.**

The component boundary is a firewall. Inside: whatever it takes. Outside: clean interface.

## Single Source of Truth

Here's the best part: I edit one component, and it's fixed on every single page.

One file. One change. Propagates everywhere. No hunting through templates, no copy-paste, no "did I update all instances?"

**Fix it once, fixed everywhere.**

That's the whole deal.

## Use Everything

I'm not locked into React component abstractions. I can use:

- My Primitive components when they help
- Raw `<span>` and `<div>` when they don't
- Emotion's `css` prop for inline styles
- Conditional rendering with ternaries
- Whatever gets the job done

I'm the HTML and styling avatar. Master of all web elements.

## Presentation Code is Simple Logic

Cursed formatting isn't complex logic. That conditional spacing? It's just:

```tsx
if (hasAsterisk) {
  oneSpace();
} else {
  twoSpaces();
}
```

No nested state. No async. No edge cases. Just "if this, then that."

Being able to reach for any tool means I solve it fast and move on.

**Ugly but encapsulated beats elegant but stuck.**

## The Philosophy

React components let me:

1. **Solve problems fast** - Use whatever works
2. **Contain the mess** - Encapsulation keeps chaos local
3. **Scale effortlessly** - Single source of truth propagates everywhere
4. **Stay flexible** - Not locked into any one pattern

I can do cursed styling without messing anything else up. I can fix a component and see the change everywhere instantly.

That's why components rule.

---

## The Real Point

You know what React actually gave us? Not JSX. Not hooks. Not virtual DOM.

**Permission to write ugly code that works, as long as it's contained.**

And that's beautiful.
