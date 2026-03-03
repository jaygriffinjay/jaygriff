---json
{
  "title": "How I Use AI",
  "slug": "how-i-use-ai",
  "date": "2026-02-28T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.6"],
  "authorshipNote": "Claude Sonnet 4.6 via GitHub Copilot — synthesized from my writing, projects, and ideas across the site into one document",
  "type": "post",
  "description": "Why I'm obssessed with AI and what I do with it",
  "tags": ["ai", "copilot", "cline", "workflow", "vibe-coding", "tools"],
  "relatedPosts": ["ai-calculator-moment", "ai-code-editing", "why-i-write-in-my-ide", "approve-regenerate-edit-loop"]
}
---

I think AI is great. I also think it's a very real and highly useful innovation. Not hype. Not a bubble. Not doom. Just mostly good old-fashioned human ingenuity moving the world forward.

But "AI" is a wildly overloaded term right now, so let me be specific about what I mean. There's the foundational stuff — neural networks, backpropagation, reinforcement learning, embeddings, the machinery that makes all of it go. That's been around for decades and it's what powers data analysis, classification, recommendation systems, all of it.

Then there's a newer layer that applied all that analysis capability into something new: synthesis and generation. With LLMs being perhaps the most transformative.

- **Image analysis** → image generation (Midjourney, DALL·E, Stable Diffusion)
- **Music analysis** → music generation (Suno, Udio)
- **Video analysis** → video generation (Sora, Runway)

And then embeddings and attention — key ingredients in the very powerful ability of AI to approximately understand *meaning and intent*. That's what makes semantic search, RAG, and context-aware tools actually work. It's also how content and recommendation algorithms work now — TikTok's feed, Spotify's Discover Weekly, YouTube's autoplay. And Google has been using AI in search for years (RankBrain since 2015, then BERT, then MUM). The "AI is new" narrative is a little funny when you realize it's been surfacing your search results for a decade.

When you combine all of this and point it at software development specifically, something unusual happens. The ability of models to reason about code is now good enough that it.. reasons reliably not just about what code does, what code means, but when to execute code too. 

And it turns out.. a lot of things can be controlled by code. A lot. 

That's the AI I'm talking about. And this stuff really works. And it's awesome.

## When I Realized AI Is Gamechanging

There are a few specific moments where I went from "this is interesting" to "this actually changes everything."

**The first time I used ChatGPT.** I was having fun within the first hour. Not impressed-by-a-demo fun — actually productive fun. I was learning things, building things, using it as a tool. I knew that day it wasn't hype.

**The first time I used Cursor.** This was the moment I realized AI agents weren't a joke. Not a chatbot answering questions — AI applying actual understanding to actual actions in the world, reading my code, editing files, running commands. It was doing real work. That distinction matters: going from AI that advises to AI that acts is a bigger jump than it sounds.

**The first time I used bolt.new.** I typed a prompt and got a working app. Not a component, not a snippet — an entire app. In the browser. No setup. That's a different category of thing. Creating software used to require knowing how to create software. That constraint just quietly disappeared.

## It Started with ChatGPT

What made AI click for me as a real innovation was learning with ChatGPT. I could ask it a question, get an answer, and then go deeper. And deeper. Branch into a related concept. Come back. Ask it to explain something more and more simply until it clicked. Most of my programming education (and education in general!) has happened in conversations with AI since then.

I still use it this way constantly. Just today before writing this I had a legitimate learning breakthrough about Zod and tRPC - two important TypeScript tools that are genuinely complex at first glance -  I kept seeing those terms float around and never had a clear mental model of why they mattered. One fishing session with Claude later and it actually clicked. Not because it dumped documentation on me, but because it found the right angle, the right analogy, and I could keep pulling on the thread until I got there.

## Then the Vibe Coding Tools Showed Up

Cursor immediately blew my mind the first time I used it. AI can do WHAT with all my code? ITS STILL GOING? MEIN GOTT!

And then came the AI app builders. The game had changed once again - entire apps, in one prompt, in the browser, no setup.  Development just got weird. Anyone can make an app now. The barrier that used to keep software to software people is basically gone.

And then the thing that made it personally interesting: all these tools run on React and Tailwind. The stack this whole new ecosystem converged on. The stack I'd been working toward for years. So when everyone was discovering vibe coding and marveling at the outputs, I was realizing: wait, AI and all these new AI apps are ridiculously well-versed in the exact tools I already use? Well that's very convenient and also very useful for figuring out how these things actually work.

## AI Is Overpowered at Programming Specifically

There's something I understood pretty early that I think a lot of people may underestimate: AI is unfairly good at programming compared to other knowledge-intensive fields.

The reason is that programming is the one domain where work product, documentation, and culture all live on the internet — the actual code, the reasoning behind it, the decisions that shaped it. All of that got trained into these models. So when you ask an AI about a library, an architecture pattern, a debugging strategy — it's drawing on real-world practice, not just documentation.

Compare that to law or accounting. The rules are codified, sure, and AI has seen those. But the actual work that lawyers and accountants do every day? Strictly proprietary. No open-source tax returns. No public workpapers. AI has to reason from principles without the corpus of practice to back it up.

I was painfully aware of this contrast because I'm a former accountant. In accounting, the only way to learn how things are actually done is to ask someone who's done them. That knowledge doesn't exist on the internet. It lives in firms, behind NDAs, passed quietly from senior to junior. The part I loved most about switching to software was that I could learn as much as I wanted, on my own, for free. You can just go and do professional-level software learning and professional-level software work entirely in the open and literally no one can stop you. It's all there. That was true before AI. AI just made it absurdly more true.

But there's an even more fundamental reason coding models are overpowered: code is inherently testable. When a model generates code, you can run it. It either compiles or it doesn't. The tests pass or they fail. The function returns the right value or the wrong one. That feedback loop is automatic, verifiable, and scales to billions of training examples. No human evaluator needed.

Compare that to generating a legal brief or a medical diagnosis. How do you automatically verify that at scale? You can't. You need expensive human review, and even then experts disagree. Code is one of the only knowledge domains where the output carries its own verification mechanism built in. That's why reinforcement learning works so absurdly well for coding — the reward signal is free and unambiguous. It's like training a model in a domain where every answer comes with an answer key.

## Agents Are Nutty

One of the most underrated things about AI is how it significantly chips away at the brittleness problem in software. Where we used to rely on regex, manual edge case handling, and fragile ETL pipelines, AI just handles the messy middle — it's an incredible translator that deals with arbitrary requirements without needing every case accounted for in advance. 


The same logic applies to agent skills and workflows. Instead of building and maintaining a whole script or system for every automation need, you can describe the intent in plain English and get 90%+ of the value immediately, with none of the debugging overhead. And then there's the best-of-both-worlds scenario: build a real system where precision matters, and hook AI up to it as the interface layer. You get deterministic reliability underneath and natural language flexibility on top. Telling the AI what to do is real — and the threshold for what's worth automating just dropped by an order of magnitude.

## Agents Are Gonna Be Ubiquitous In Office Work

At some point I stopped writing in my notes app almost entirely. 

The reason is context. When I'm writing about a component I built, my coding agent can read the actual component, the related files, the git history. It knows the project. In Notion I'd be manually copying context over, hoping I got the right pieces, switching tabs constantly.

And multi-file operations. I can generate a post, add metadata, update navigation, cross-link related content — all in one conversation. The AI creates the files. I approve them. Done.

When AI handles the synthesis work, you can go from idea to published in minutes. That changes what feels worth doing. Documenting a debugging session, writing up a feature as I build it — stuff that used to feel like overhead now has low enough activation energy that it just happens.

And this functionality is actively being rolled out to all office work, not just for programming.

## Now I Think About AI as a Fundamental Building Block in Software

The more I used AI the more I started caring about *how* you structure the interaction — not just what you prompt. In software you run into many cases in your workflow where you want specific conventions to be followed and so you need AI to know these things at the right time. And then the same is true for when you integrate AI into software - integrating AI into an app is almost like employing it to do a tiny little job with custom prompts, data, and instructions.

I'm also thinking about AI at the workflow level — custom tools and skills for coding assistants that encode my specific codebase patterns. Instead of generic commands, a natural language interface that speaks my project's dialect. "Make sure all my posts have complete metadata" — and it knows exactly what my PostMeta interface requires, checks every file, flags what's missing. Not a linter rule. Encoded expertise.

## Code Is Now Free (but Code Knowledge Isn't)

The clearest thing I've taken from all of this: code is free now. If you can describe what you want with enough precision, the code gets written. The constraint has moved.

What matters now is everything above writing the code. Critical thinking. System design. Architecture. Knowing what to build and why, and having strong enough taste to recognize when the output is wrong. Those skills matter more than ever, not less — because now the bottleneck is you specifying the problem correctly and verifying the solutions, not you typing the solution.

But I want to push back on one thing: code knowledge still matters. Maybe as much as before. The nature of it shifts — when AI writes the code, you stop caring about syntax and start caring about blocks of logic. You're reading at a higher level of abstraction. But reading at that level well, understanding what each chunk actually does, knowing when something is subtly wrong — that requires being genuinely good at your language. Mastery is still highly rewarded, even if the pace of AI development makes it tempting to skip.

What I actually believe: mastery and productivity are both necessary, and you have to balance them deliberately. The good news is that velocity makes mastery easier to build, not harder. When AI accelerates what you can learn, build, debug, and experiment with, you're encountering more code, more edge cases, more patterns. You learn faster because you're moving faster. The ceiling goes up.

The golden rule: [delegate, don't abdicate](https://sive.rs/abdicate).

## Programming Is More Fun Now

One more thing nobody talks about enough: programming is way more fun now. Syntax friction is a joy killer. The gap between having an idea and having a thing that works used to be filled with the tedious parts — boilerplate, looking up the docs, googling 5 terms and reading articles about them, googling syntax. That gap is nearly gone. You type what you want and you get it.

But making what I *really* want — production-grade apps that solve real problems, that scale, that handle edge cases, that are actually good — still quite difficult. The hard parts are still hard. But features? Demos? Prototypes? Those are free now and the fun-to-friction ratio has never been better.

## What I Haven't Figured Out

A lot of it, honestly.

There are developers using AI to do all kinds of crazy things every day. I don't think we are done discovering use cases for AI. I also think there is a massive backlog in software development today where old apps not built with AI in mind are behind on the times. I think there are a lot of opportunities to make genuinely better software than before, but it still takes that same attention to detail and time and effort that old software required.

That's where I am. Check back in six months, it'll probably look different.
