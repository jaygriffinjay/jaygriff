---json
{
  "title": "How I Learned to Code",
  "slug": "how-i-learned-to-code",
  "date": "2026-03-01T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.6"],
  "authorshipNote": "Claude Sonnet 4.6 via GitHub Copilot",
  "type": "post",
  "description": "I'm self-taught, and the path was anything but straight.",
  "tags": ["career", "self-taught", "learning", "journey", "beginner"]
}
---

## The computer was my toy growing up

I was five or six when I first sat in front of a Windows PC, and I was enamored by it. Microsoft Paint, Pinball, card games, educational games, the Start Menu.

That never really stopped. By the time I was a teenager I was a PC gamer and deep into the surrounding culture — modding games, running game servers, eventually building PCs from parts and getting interested in Linux.

All of this meant that by the time I ever wrote a line of code, I was already extremely comfortable with computers. Filesystems, operating systems, config files, basic commands, BIOSes, flashing firmware, reinstalling OSes — none of that was scary or foreign. I'd been living inside these systems for years.

That's the context that made everything click faster once I started.

---

## It started with a problem I wanted to solve

I became weirdly obsessed with doing things faster. I love hotkeys and searchboxes. I hate hunting around for something. I love to just search and find what I'm looking for instantly.

That interest led me to [AutoHotkey](https://www.autohotkey.com), a tool for automating Windows with hotkeys. My first goal was quite simple: open my most-used websites (pretty boring ones too - my email, calendar, and bank account and credit cards) with a hotkey instead of clicking on my bookmarks every time. Why open the same five bookmarks every day when I can click one button each morning? 

So here is how I implemented this in AutoHotKey 👇

## My First Script Ever

```
; Ctrl + Shift + = (email + calendar)

^+=::

Run, https://mail.google.com
Run, https://calendar.google.com

return

; Ctrl + Shift + - (bank accounts + credit cards)

^+-::

Run, https://www.bankaccount.com
Run, https://www.creditcard1.com
Run, https://www.creditcard2.com

return
```

But then when I finally used AutoHotKey to do this I realized something a little bit deeper.

I realized if I can open one website... I can open five. Or ten. Or a HUNDRED websites with a single hotkey press. I just have to add them to the list of websites in the script I wrote.

That's when it clicked. That's what it means to execute a program. You write instructions once, and the computer does them instantly, at scale, perfectly, every time.

Then I discovered AutoHotkey could create right-click menus. These are kind of like how you might right-click to copy and paste. This made me realize making UI isn't as hard as I thought. You don't need to understand how to render pixels on the screen all the way down to binary instructions. You just... write some code that says "make a right-click menu." That's it. 👇 

```
Menu, MyMenu, Add, Copy, DoCopy
Menu, MyMenu, Add, Paste, DoPaste
Menu, MyMenu, Add, Cut, DoCut
```

First taste of application programming logic. Mind = blown.

---

## Level 2: HTML & CSS

After discovering that little tidbit about how things actually get rendered (not as hard as I thought!), I immediately made the connection to HTML and CSS. HTML is a language where I tell the screen what to do. It's a rendering language. It's just instructions that tell the browser what to put on the screen. CSS just tells it how to make it look prettier.

At first this seems like an inefficient way to make very ugly pages. My first HTML and CSS pages were very bad. But I could see: if you make it pretty, and scale it up and give it lots of instructions, it's more powerful than any Word doc or PDF could ever be. You can build actual pages just like all the other businesses that have fancy websites.

I started playing around with HTML and CSS in earnest, making simple pages and learning how they worked.

---

## Level 3: Python

Once I felt like I truly "got" it, I got very excited. I thought that maybe I really can do this after all. Even though I knew it was a long uphill battle of learning ahead. But I really was loving it so I moved forward. I [completed](https://certificates.cs50.io/36ac7977-4aa6-4dd8-bd5c-54398fa0c952.pdf?size=letter) Harvard's [CS50P](https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python) (Introduction to Programming with Python) and became literate in Python. Finally felt like a "real" programmer.

---

## Level 4: The Python Web Problem

I started working on Harvard's [CS50W](https://www.edx.org/learn/web-development/harvard-university-cs50-s-web-programming-with-python-and-javascript) (Web Programming with Python and JavaScript). Didn't finish it, but I did make some functional sites. I learned Django properly, picked up some JavaScript fundamentals, and started to understand how some programming on the web actually worked.

Here's where things got frustrating. I knew Python. I could build web backends with Flask or Django. But for any interactivity on the frontend, I needed JavaScript.

But it was not working that well. Two completely different languages. Two different ecosystems. Every feature meant fighting to connect Python backend logic to JavaScript frontend behavior. It felt like I was constantly translating between two languages that didn't want to talk to each other.

That's when I started looking at Node.js. I played around with it and realized: okay, Node actually works pretty similar to Python, I would just need to learn more JavaScript. This could work. But then Express came into the picture and Express was hard. So I hardly touched it.

Back to Flask and Django for a while. At least I knew Python.

---

## Level 5: React + Vite (The Breakthrough)

By this point, I was tired of hearing about React everywhere. "React gets you jobs." "Everyone's using React." "You need to learn React." Fine. I'll learn React.

I started a Scrimba course on React. Did not finish it. But I did learn the fundamentals and was kinda liking it.

Then I didn't code for several months. Not sure why. Life happened.

When I came back to it, React clicked even more. And then I fell in love with it. The component model finally made JavaScript make sense to me: build small pieces, compose them together. Super easy to do after a while, and super powerful!

Since then? I've written as much React as possible.

And Vite made the development experience actually pleasant. Fast refresh, just write code and see it work.

This was it. I could finally do full JavaScript without fighting Express. Just build powerful frontends and worry about backends later when I really needed them.

---

## The SSG Detour: Hugo, Jekyll, Eleventy

I also tried the static site generator route: Hugo, Jekyll, Eleventy. Hugo especially. I actually put it through its paces, used the conventions, and understood the structure.

But then I hit Hugo's templating language. And I realized: I don't want to code anything real in such a brittle and stunted language. The skeleton and conventions were great. The actual programming experience? Terrible.

So I took the good parts - the project structure from Hugo, the patterns I learned from Django - and brought them into Vite and Next.js. Real programming, real components, same clean conventions.

---

## Level 6: Next.js (Full Stack Realized)

Next.js was the final piece. Server-side rendering, API routes, file-based routing, React Server Components. Now I could be a full-stack developer entirely in JavaScript (well, TypeScript).

No more Python backend + JavaScript frontend split. No more fighting Express. Just Next.js handling everything: server logic, client interactivity, routing, rendering.

Now I'm building full-stack applications. The Excel wizard became a software developer.

And I feel genuinely productive. Not fighting tools, not context-switching languages. Just building.

---

## Five Years Later

It's been under 5 years since I wrote my first line of code. I'm self-taught. I have no CS degree. But I have a master's degree in accounting and a healthy dose of computer nerdiness.

And honestly? Software development feels like the highest use of my skills. I'm building systems, solving problems, and creating tools that actually matter, all while enjoying the process. This is what I was meant to do.
