import { Heading, Paragraph, List, ListItem, Divider, Link } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: "Accounting → Software Development?",
  slug: 'accounting-to-dev',
  date: '2026-01-20T00:00:00Z',
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  authorshipNote: 'Jay provided the story and context, Claude structured and wrote the post, Jay edited and refined',
  type: 'post',
  description: 'From Debits and Credits to TypeScript: My Journey from Accounting to Software Development',
  tags: ['career', 'accounting', 'self-taught', 'journey', 'excel'],
};

export default function AccountingToDevPost() {
  return (
    <>
      <Paragraph>
        "So you quit accounting to do programming?"
      </Paragraph>
      
      <Paragraph>
        Kind of? The stuff I learned in accounting is what made me a tech nerd in the first place! 
      </Paragraph>

      <Heading level={2}>The Real Origin Story: I Refused to Use WordPress</Heading>

      <Paragraph>
        Here's what really started all of this: I was reading personal finance and tax blogs obsessively since I was a teenager. This made me want my own blog since I was 15. You may be able to see why I chose accounting - I enjoyed business, finance, and taxes since I was young. 
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
        blog" article that basically said: get WordPress from these providers 
        for $10-15/month. And I definitely wasn't considering Shopify at $25/month.
      </Paragraph>

      <Paragraph>
        (And those were the <em>introductory</em> rates. WordPress hosting costs have a 
        magical tendency to balloon over time.)
      </Paragraph>

      <Paragraph>
        I'm cheap. I wanted to do it for free. So instead of paying for WordPress, 
        I decided to learn to make a blog myself. Which somehow made sense at the time.
      </Paragraph>

      <Paragraph>
        The math? Spend thousands of hours learning to make a blog myself to avoid $15/month. This felt 
        entirely justified, even when it was definitely difficult in those early days. The 
        return on investment makes no sense, but here we are.
      </Paragraph>

      <Heading level={3}>I Actually Tried WordPress (And Hated It)</Heading>

      <Paragraph>
        I bought WordPress hosting for a year or two. Gave it a real shot. 
        Tried to make a blog the "normal" way.
      </Paragraph>

      <Paragraph>
        Mostly hated it.
      </Paragraph>

      <Paragraph>
        Here's what I realized: I didn't enjoy "posting content." What I actually wanted 
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
        That's not accounting. That's backend development with a CPA license. And I was enjoying all of this stuff a bit more than actual financial statements and tax returns.
      </Paragraph>

      <Heading level={2}>The Awakening: Excel is a Terrible Database</Heading>

      <Paragraph>
        By the time I graduated in accounting I was an Excel Grand Wizard with years of advanced Excel experience. Pivot tables, XLOOKUP, array formulas, Power Query, Macros? I was learning features 
        that would make senior accountants weep. I could make Excel do things it was never meant to do.
      </Paragraph>

      <Paragraph>
        One thing I will always remember is this absolutely awesome assignment we did in Excel. We were doing proto-programming without calling it that: using CONCAT 
        for string manipulation (the first thing you learn in actual programming!), data validation 
        for dropdown menus, navigation elements across sheets. We were building programs in Excel.
      </Paragraph>

      <Paragraph>
        I'd seen VBA too - recorded macros, read the generated code, even loaded someone else's macros at work to create templates. I understood VBA could do things, but never 
        actually wrote it myself.
      </Paragraph>

      <Paragraph>
        But eventually I hit a wall where I was building complex systems in a tool designed for simple calculations. I used one too many utility cells or helper columns
        before realizing maybe Excel isn't actually good at everything. Combining functions and utility cells into God's unholiest formulae broke the camel's back. There had to be 
        a better way.
      </Paragraph>

      <Heading level={2}>How I Learned to Code? Tool Upgrades</Heading>

      <Paragraph>
        Once you realize you're fighting your tools, the path forward is obvious: get better tools. I wrote a separate post about the actual learning journey — AutoHotkey to HTML to Python to React to Next.js: <Link href="/posts/how-i-learned-to-code">How I Learned to Code</Link>
      </Paragraph>

      <Divider />

      <Heading level={2}>The Truth: I Never Left Accounting</Heading>

      <Paragraph>
        Here's what people miss: I didn't abandon accounting. I integrated it.
      </Paragraph>

      <Paragraph>
        Some developers can't:
      </Paragraph>

      <List>
        <ListItem>Take a creation and turn it into a real business</ListItem>
        <ListItem>Read financial statements or understand business performance metrics</ListItem>
        <ListItem>Navigate taxes, audits, bookkeeping, incorporation, compliance</ListItem>
        <ListItem>Design organizational controls, data controls, access controls</ListItem>
      </List>

      <Paragraph>
        That accounting degree? It's my differentiator. I can build the product  <strong>and</strong> the business model. I know how to validate whether something is worth building. I'm not just a dev who can ship features; I'm someone who can turn code into a business and ship products that make financial sense.
      </Paragraph>
    </>
  );
}