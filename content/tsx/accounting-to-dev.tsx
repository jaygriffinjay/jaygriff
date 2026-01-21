import { Heading, Paragraph, List, ListItem, Divider } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: "Accounting → Software Development?",
  slug: 'accounting-to-dev',
  date: '2026-01-20T00:00:00Z',
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  authorshipNote: 'Jay provided the story and context, Claude structured and wrote the post, Jay edited and refined',
  type: 'post',
  description: 'From double-entry bookkeeping to TypeScript: how an accounting degree became the foundation for a development career',
  tags: ['career', 'accounting', 'self-taught', 'journey', 'excel'],
};

export default function AccountingToDevPost() {
  return (
    <>
      <Paragraph>
        "So you quit accounting to do programming?"
      </Paragraph>
      
      <Paragraph>
        Nah. I didn't quit. I leveled up.
      </Paragraph>

      <Divider />

      <Heading level={2}>The Real Origin Story: I Refused to Use WordPress</Heading>

      <Paragraph>
        Here's what really started all of this: I've wanted a blog since I was 15. I was 
        reading personal finance and tax blogs obsessively. Loved the format, loved the 
        community, wanted my own space on the internet.
      </Paragraph>

      <Paragraph>
        But I really, <em>really</em> didn't want to use WordPress.
      </Paragraph>

      <Paragraph>
        I can trace so much of my motivation for becoming a web developer to that single 
        fact: I wanted a blog, but WordPress felt wrong. Too bloated, too constrained, too 
        much fighting the admin panel to do what I wanted.
      </Paragraph>

      <Paragraph>
        Plus, WordPress was expensive. Every single blog I followed had a "how to start a 
        blog" article that basically said: buy managed WordPress hosting from these providers 
        for $10-15/month. And I definitely wasn't considering Shopify at $25/month.
      </Paragraph>

      <Paragraph>
        (And those were the <em>introductory</em> rates. WordPress hosting costs have a 
        magical tendency to balloon over time.)
      </Paragraph>

      <Paragraph>
        I'm cheap. I wanted to do it for free. So instead of paying for managed WordPress, 
        I decided to learn to make a blog myself. Which somehow made sense at the time.
      </Paragraph>

      <Paragraph>
        The math? Spend thousands of hours learning to make a blog myself to avoid $15/month. This felt 
        entirely justified, even when it was definitely difficult in those early days. The 
        return on investment makes no sense, but here we are.
      </Paragraph>

      <Heading level={3}>I Actually Tried WordPress (And Hated It)</Heading>

      <Paragraph>
        Full disclosure: I did buy WordPress hosting for a year or two. Gave it a real shot. 
        Tried to make a blog the "normal" way.
      </Paragraph>

      <Paragraph>
        Mostly hated it.
      </Paragraph>

      <Paragraph>
        Here's what I realized: I didn't enjoy "posting just to post." What I actually wanted 
        was the ability to publish random stuff myself out into the world - and own my data 
        and opinions. Not be locked into a platform.
      </Paragraph>

      <Paragraph>
        Paying $15/month to "post content" made no sense when what I really wanted was to 
        just... have things available on the internet. On my terms. In my control.
      </Paragraph>

      <Paragraph>
        I was arriving at the principles of web development without knowing how to code at all. 
        I understood <em>why</em> owning your own platform mattered before I understood <em>how</em> to 
        build one.
      </Paragraph>

      <Paragraph>
        It was only after I actually learned to code that I could realize any of this. And 
        very badly at first.
      </Paragraph>

      <Paragraph>
        So instead of settling for WordPress, I spent years learning to code so I could 
        make my own publishing platform. Which is either admirably stubborn or completely 
        insane. Probably both.
      </Paragraph>

      <Paragraph>
        That stubborn refusal to use inadequate tools? That became my whole programming 
        journey.
      </Paragraph>

      <Divider />

      <Heading level={2}>The Setup: What I Actually Studied</Heading>
      
      <Paragraph>
        My accounting curriculum wasn't just debits and credits. It was:
      </Paragraph>

      <List>
        <ListItem>Data analysis and visualization</ListItem>
        <ListItem>Statistical analysis and auditing techniques on large financial datasets</ListItem>
        <ListItem>Database design and normalization</ListItem>
        <ListItem>ERP systems and data and corporate controls</ListItem>
        <ListItem>Financial data technology and IT </ListItem>

      </List>

      <Paragraph>
        That's not accounting. That's backend development with a CPA license.
      </Paragraph>

      <Heading level={2}>The Awakening: Excel is a Terrible Database</Heading>

      <Paragraph>
        I became an Excel Grand Wizard. Pivot tables, VLOOKUP cascades, array formulas that 
        would make senior accountants weep. I could make Excel do things it was never meant to do.
      </Paragraph>

      <Paragraph>
        We were doing proto-programming in school without calling it that: using CONCATENATE 
        for text manipulation (the first thing you learn in actual programming!), data validation 
        for dropdown menus, navigation elements across sheets. We were building programs in Excel.
      </Paragraph>

      <Paragraph>
        I'd seen VBA too - recorded macros, read the generated code, even used someone else's 
        VBA script at work to create templates. I understood VBA could do things, but never 
        actually wrote it myself.
      </Paragraph>

      <Paragraph>
        And that's when I realized: <strong>Excel is a shitty database and an even worse 
        programming environment.</strong>
      </Paragraph>

      <Paragraph>
        I was building complex systems in a tool designed for simple calculations. Combining 
        functions into God's unholiest formulas just to achieve basic logic. There had to be 
        a better way.
      </Paragraph>

      <Heading level={2}>The Progression: Tool Upgrades</Heading>

      <Paragraph>
        Once you realize you're fighting your tools, the path forward is obvious: get better tools.
      </Paragraph>

      <Heading level={3}>Level 1: AutoHotkey</Heading>
      <Paragraph>
        Started with a simple goal: open frequent websites with a hotkey instead of typing URLs. 
        One hotkey, one website. Easy enough.
      </Paragraph>

      <Paragraph>
        Then I realized: if I can open one website... I can open five. Or ten. Or a HUNDRED 
        websites with a single hotkey press.
      </Paragraph>

      <Paragraph>
        <strong>That's when it clicked.</strong> That's what it means to execute a program. You 
        write instructions once, and the computer does them instantly, at scale, perfectly, 
        every time.
      </Paragraph>

      <Paragraph>
        Then I discovered AutoHotkey could create right-click context menus. Little UI elements 
        that pop up and do things. And I realized: making UI isn't as hard as I thought. You 
        don't need to understand how pixels render all the way down to binary instructions on 
        bare metal. You just... write some code that says "make a right-click menu." That's it.
      </Paragraph>

      <Paragraph>
        First taste of application programming logic. Mind = blown.
      </Paragraph>

      <Heading level={3}>Level 2: Python</Heading>
      <Paragraph>
        Discovered pandas. Realized I could do in 10 lines of Python what took 50 cells 
        of nested Excel formulas. Data analysis without the spreadsheet prison.
      </Paragraph>
      
      <Paragraph>
        I completed Harvard's CS50P (Python course) and became literate in Python. Finally 
        felt like a "real" programmer.
      </Paragraph>

      <Heading level={3}>Level 3: HTML & CSS</Heading>
      <Paragraph>
        Then I had another realization: HTML is a language where I tell the screen what to do. It's a rendering 
        language. It's just instructions that tell the browser what to put on the screen. 
        CSS tells it how to make it look different.
      </Paragraph>

      <Paragraph>
        To a layman, this seems like an inefficient way to make ugly web pages. But I could 
        see: if you make it pretty, and scale it up, it's more powerful than any Word doc 
        or PDF could ever be. You can build actual interfaces.
      </Paragraph>

      <Paragraph>
        Needed to present data analysis results. Excel charts were ugly. HTML let me build 
        custom presentations.
      </Paragraph>

      <Heading level={3}>Level 4: The Python Web Problem</Heading>
      <Paragraph>
        Here's where things got frustrating. I knew Python. I could build web backends with 
        Flask or Django. But for any interactivity on the frontend, I needed JavaScript.
      </Paragraph>

      <Paragraph>
        Two completely different languages. Two different ecosystems. Every feature meant 
        fighting to connect Python backend logic to JavaScript frontend behavior. It felt 
        like I was constantly translating between two languages that didn't want to talk 
        to each other.
      </Paragraph>

      <Paragraph>
        That's when I started looking at Node.js. Played around with it and realized: okay, 
        Node actually works pretty similar to Python. This could work. But then Express came 
        into the picture and Express was hard. So I hardly touched it.
      </Paragraph>

      <Paragraph>
        Back to Flask and Django for a while. At least I knew Python.
      </Paragraph>

      <Heading level={3}>Level 5: React + Vite (The Breakthrough)</Heading>
      <Paragraph>
        By this point, I was tired of hearing about React everywhere. "React gets you jobs." 
        "Everyone's using React." "You need to learn React." Fine. I'll learn React.
      </Paragraph>

      <Paragraph>
        I started a Scrimba course on React. Did not finish it. But I did learn the fundamentals 
        and was kinda liking it.
      </Paragraph>

      <Paragraph>
        Then I didn't code for several months. Not sure why. Life happened.
      </Paragraph>

      <Paragraph>
        When I came back to it, React clicked even more. And then I fell in love with it. 
        The component model finally made JavaScript make sense to me: build small pieces, 
        compose them together, data flows down, events flow up.
      </Paragraph>

      <Paragraph>
        Since then? I've written as much React as possible.
      </Paragraph>

      <Paragraph>
        And Vite made the development experience actually pleasant. Fast refresh, no webpack 
        hell, just write code and see it work.
      </Paragraph>

      <Paragraph>
        This was it. I could finally do full JavaScript without fighting Express. Just build 
        interactive frontends and worry about backends later.
      </Paragraph>

      <Heading level={3}>The SSG Detour: Hugo, Jekyll, Eleventy</Heading>
      <Paragraph>
        I also tried the static site generator route: Hugo, Jekyll, Eleventy. Hugo especially 
        - I actually put it through its paces, used the conventions, understood the structure.
      </Paragraph>

      <Paragraph>
        But then I hit Hugo's templating language. And I realized: I don't want to code 
        anything real in such a brittle language. The skeleton and conventions were great. 
        The actual programming experience? Terrible.
      </Paragraph>

      <Paragraph>
        So I took the good parts - the project structure from Hugo, the patterns from Django - 
        and brought them into Vite and Next.js. Real JavaScript, real components, same clean 
        conventions.
      </Paragraph>

      <Heading level={3}>Level 6: Next.js (Full Stack Realized)</Heading>
      <Paragraph>
        Next.js was the final piece. Server-side rendering, API routes, file-based routing, 
        React Server Components. Now I could be a full-stack developer entirely in JavaScript 
        (well, TypeScript).
      </Paragraph>

      <Paragraph>
        No more Python backend + JavaScript frontend split. No more fighting Express. Just 
        Next.js handling everything: server logic, client interactivity, routing, rendering.
      </Paragraph>

      <Paragraph>
        Now I'm building full-stack applications with type safety, server-side rendering, 
        and proper architecture. The Excel wizard became a software engineer.
      </Paragraph>

      <Paragraph>
        And I feel genuinely productive. Not fighting tools, not context-switching languages. 
        Just building.
      </Paragraph>

      <Divider />

      <Heading level={2}>The Truth: I Never Left Accounting</Heading>

      <Paragraph>
        Here's what people miss: I didn't abandon accounting knowledge. I integrated it.
      </Paragraph>

      <Paragraph>
        Most developers don't understand:
      </Paragraph>

      <List>
        <ListItem>ERP systems and how businesses actually operate</ListItem>
        <ListItem>Financial data workflows and controls</ListItem>
        <ListItem>Audit trails and data integrity requirements</ListItem>
        <ListItem>Database normalization (because I learned it for accounting systems)</ListItem>
        <ListItem>Business logic and unit economics</ListItem>
      </List>

      <Paragraph>
        That accounting degree? It's my differentiator. I can build software that solves 
        real business problems because I understand the business side.
      </Paragraph>

      <Heading level={2}>The Pattern: Solving Tool Limitations</Heading>

      <Paragraph>
        This is the real lesson: I wasn't learning programming for programming's sake. 
        I was solving problems at each level:
      </Paragraph>

      <List>
        <ListItem>Excel was too limited → learned Python</ListItem>
        <ListItem>Python scripts were too isolated → learned web development</ListItem>
        <ListItem>Static pages were too rigid → learned React</ListItem>
        <ListItem>JavaScript was too loose → learned TypeScript</ListItem>
        <ListItem>Client-only apps were too constrained → learned Next.js</ListItem>
      </List>

      <Paragraph>
        Each step was a tool upgrade. Each upgrade unlocked new capabilities. The 
        accounting problems I was trying to solve just kept demanding better solutions.
      </Paragraph>

      <Divider />

      <Heading level={2}>Five Years Later</Heading>

      <Paragraph>
        It's been 5 years since I wrote my first line of code. I'm self-taught. I have 
        no CS degree. Just an accounting degree and an obsessive need to upgrade my tools.
      </Paragraph>

      <Paragraph>
        Now I'm building:
      </Paragraph>

      <List>
        <ListItem>Custom Next.js architectures with TSX-first content systems</ListItem>
        <ListItem>Type-safe component libraries with Emotion</ListItem>
        <ListItem>Server-side rendering with dynamic routing</ListItem>
        <ListItem>Publishing platforms that execute programs, not just display text</ListItem>
      </List>

      <Paragraph>
        I didn't quit accounting. I just refused to be limited by Excel formulas when I 
        could write actual code.
      </Paragraph>

      <Heading level={2}>The Takeaway</Heading>

      <Paragraph>
        If you're an accountant (or any knowledge worker) who keeps hitting Excel's 
        limitations, you're not stuck. You're just using the wrong tool.
      </Paragraph>

      <Paragraph>
        Learn to code. Not because programming is better than accounting, but because 
        code is a better tool than spreadsheets.
      </Paragraph>

      <Paragraph>
        Your domain expertise + programming skills = actual superpowers.
      </Paragraph>

      <Paragraph>
        I didn't quit accounting. I compiled it into a type-safe, server-rendered, 
        production-grade skill stack.
      </Paragraph>

      <Paragraph>
        <strong>That's not quitting. That's leveling up.</strong>
      </Paragraph>
    </>
  );
}
