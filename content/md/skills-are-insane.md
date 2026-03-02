---json
{
  "title": "Agent Skills Are Insane",
  "slug": "agent-skills-are-insane",
  "date": "2026-03-02T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.6"],
  "authorshipNote": "Claude Sonnet 4.6 via GitHub Copilot",
  "type": "post",
  "description": "When you write a function you get one function. When you write a skill you get a new intern who works for you.",
  "tags": ["ai", "skills", "agents", "workflow", "automation", "tools"]
}
---

When you write a function, you get one function.

When you write a skill, you get a new intern who has to remember to do all kinds of things for you when you say so, and they mostly gets it right a lot of the time. And they can already make use of tons of other tools and functions in order to accomplish this new task.

That's the whole thing. That's why skills are insane.

A skill isn't code. It's plain English instructions that tell a mostly smart and capable agent: run these functions at these times, do this before and after, make sure not to forget this and that, and give me the output. One set of instructions produces way more than one function — it produces a capable agent that can adapt, handle edge cases, and figure out the messy middle without you having to enumerate every possible scenario.

## The Brittleness Problem Is So Much Better Now

Where we used to rely on regex, manual edge case handling, and fragile ETL pipelines, AI just handles the messy middle. It's an incredible translator that deals with arbitrary requirements without needing every case accounted for in advance.

Skills apply this same logic to automation. Instead of building and maintaining a whole script or system for every need, you describe the intent in plain English and get 90%+ of the value immediately.

And then there's the best-of-both-worlds scenario: build a real system where precision matters, and hook AI up to it as the interface layer. Deterministic reliability underneath. Natural language flexibility on top. The threshold for what's worth automating just dropped by an order of magnitude.

## Skills for Your Specific Work

The most exciting version of this is encoding your own expertise as skills. Not generic commands — a named, reusable capability that combines tools, instructions, conventions, and data into something you can just invoke.

The difference between a skill and a prompt can be huge. A prompt is a one-off — you explain context, give instructions, get output. A skill is trained once. It already knows your project structure, your conventions, what tools to reach for, what to check before and after. You say "new post about X" and it executes a whole workflow: reads relevant files for context, creates the content, applies your metadata format, cross-links related pages, opens the right files. Not because you told it to this time — because that's what the skill does.

That's the intern analogy maturing. First week you explain everything every time. After they know the job, you just tell them what you need done. A skill is an intern who already knows the job on day one.

Every skill you write is reusable expertise that compounds.

## Scope and Specificity Matter

Skills perform best when they're narrow and specific. The more open-ended the task, the more the intern analogy holds in the bad way — give someone a vague instruction to "handle everything about onboarding new clients" and you're going to get wildly inconsistent results depending on the day.

A skill that says "scaffold a new Next.js project every time I have a new idea" is asking for trouble. That involves shell commands, directory creation, package installs, config files, conditional decisions — a wide blast radius where any one step going sideways breaks the whole thing. You'll spend more time babysitting it than just doing it yourself.

But a skill that says "when I describe a new post idea, create the markdown file with complete frontmatter, the correct slug format, today's date, and tag suggestions based on the content" — that's reliable. Narrow scope, clear inputs, predictable outputs, easy to verify.

The sweet spot is: well-defined trigger, constrained task, output you can immediately sanity check. The more of those boxes a skill checks, the more you can trust it to just run. Maximum specificity in the instructions isn't just good practice — it's what separates a useful skill from a coin flip.