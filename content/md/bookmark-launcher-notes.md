---json
{
  "title": "Bookmark Launcher: Multi-Tab & Local File Support",
  "slug": "bookmark-launcher-notes",
  "date": "2026-03-02T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.6"],
  "authorshipNote": "Claude Sonnet 4.6 via Claude.ai — summarized from conversation and work done on bookmark launcher",
  "type": "doc",
  "description": "Debugging notes on building a bookmark that opens two URLs simultaneously in separate tabs — what Chrome blocks, what works, and why.",
  "tags": ["browser", "bookmarks", "chrome", "debugging", "tools"],
  "relatedPosts": ["epic-dev-routes"]
}
---

# Bookmark Launcher: Multi-Tab & Local File Support

## The Goal
Open two URLs simultaneously in two tabs with one click, land on tab 1, and have it be searchable like a normal bookmark.

---

## What Was Tried (and Why It Failed)

### `javascript:` bookmark
Pasting `javascript:window.open(...)` as a bookmark URL — Chrome treated it as a search query and sent it to Google. Couldn't get it to save properly via the bookmarks bar dialog.

### Local HTML file with `window.open()`
Created an HTML file that opens both URLs via script, bookmarked the `file:///` path. It worked! But left an unwanted 3rd tab open — the HTML file itself.

### `window.close()`
Added to the HTML file to close the launcher tab after opening the others. Chrome won't let a tab close itself if the user navigated to it directly (only works if the tab was opened by a script).

### `window.focus()`
Tried to pull focus back to the current tab after `window.open()`. Chrome blocks this entirely for security reasons.

### Various `window.open` + `location.href` orderings
Using `location.href` to navigate the current tab (so it becomes one of the two destinations) and `window.open` for the other. This avoids the extra tab problem, but Chrome always focuses the newly opened tab — no way to override this from a webpage context. Ended up on the wrong tab every time.

---

## Why It Has to Be an Extension

A regular webpage (including a local HTML file) runs in a sandboxed context. Chrome deliberately blocks:
- `window.focus()` — can't steal focus
- Controlling which tab is active after `window.open()`
- Opening `file:///` URLs from web context (cross-origin blocked)

A Chrome extension runs in a **privileged context** and has access to the `chrome.tabs` API, which allows:

```js
chrome.tabs.create({ url: 'https://site1.com', active: true });
chrome.tabs.create({ url: 'https://site2.com', active: false });
```

The `active: false` flag is the key — this is simply not possible from a webpage. Only extensions can do this.

---

## Fixing the Extension

### Problem 1: `file:///` URLs not launching
Even with "Allow access to file URLs" toggled on in `chrome://extensions`, the extension may not be launching local file URLs. Likely a bug in how the extension calls `chrome.tabs.create()` with `file:///` paths. Need to inspect the relevant code and verify the URL is being passed correctly.

### Problem 2: Multi-tab bookmarks
Add support for a bookmark entry that contains multiple URLs. When launched, the extension:
1. Opens the first URL in a tab with `active: true`
2. Opens remaining URLs with `active: false`

This gives clean focus behavior that's impossible any other way.

---

## Why This Will Be Cool

### Multi-tab launching
Save a group of URLs as a single named bookmark. Search for it by name, click it, and all tabs open instantly — with focus on the right one. Way better than Chrome's Tab Groups (not searchable) or any HTML file hack.

### Local file launching
Launch files on your computer directly from the bookmark launcher — open a local project, a reference doc, a design file. Anything with a `file:///` path becomes a first-class bookmark.

### Combined
A bookmark entry could open a local file *and* a web URL together — e.g. open your notes file alongside a reference site. Genuinely powerful for dev workflows.

---

## Next Step
Share the extension code (specifically the URL-launching logic) to debug the `file:///` issue and add multi-URL support.
