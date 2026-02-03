import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'How My Site Accidentally Became a Notion Clone',
  slug: 'accidental-notion-clone',
  date: '2026-01-19T00:00:00Z',
  author: ['Claude Sonnet 4.5', 'Jay Griffin'],
  authorshipNote: 'Jay told Claude to make a post, Claude wrote it, lightly edited by Jay',
  type: 'post',
  projectId: 'jaygriff',
  description:
    'Notion pls no sue',
  tags: ['design', 'notion', 'constraints', 'markdown'],
};

const AccidentalNotionClonePost = () => {
  return (
    <>
      <Heading level={2}>How It Happened</Heading>

      <Paragraph>
        I looked at my site today and realized: this is literally a Notion page. The typography, the layout, 
        the spacing, the metadata header. It's identical.
      </Paragraph>

      <Paragraph>
        Design convergence is real. Build sensible markdown primitives and you end up looking exactly like Notion. No lawsuit intended.
      </Paragraph>

      <Paragraph>
        I asked Claude to build a content header component - something to display post metadata 
        (title, date, author, tags). No reference images. Just "make it look good."
      </Paragraph>

      <Paragraph>
        Claude made this:
      </Paragraph>

      <List>
        <ListItem>Large title at the top</ListItem>
        <ListItem>Subtle date/author below</ListItem>
        <ListItem>Tags as small badges</ListItem>
        <ListItem>Generous spacing</ListItem>
      </List>

      <Paragraph>
        I looked at it and thought: "This looks exactly like a Notion page header."
      </Paragraph>

      <Paragraph>
        Then I realized everything else did too.
      </Paragraph>

      <Heading level={2}>The Three Tweaks</Heading>

      <Paragraph>
        To complete the transformation, I made exactly three changes:
      </Paragraph>

      <List>
        <ListItem>
          <strong>Tightened side margins</strong> - Notion pages have narrow side margins on wide screens. 
          Mine were too generous.
        </ListItem>
        <ListItem>
          <strong>Added top margin</strong> - Content starts further down the page.
        </ListItem>
        <ListItem>
          <strong>Adjusted bottom margin</strong> - More breathing room at the end of posts.
        </ListItem>
      </List>

      <Paragraph>
        That was it. Three margin tweaks and suddenly: Notion clone.
      </Paragraph>

      <Heading level={2}>Why This Happened</Heading>

      <Paragraph>
        Notion isn't magic. It's just a <strong>polished markdown editor</strong>.
      </Paragraph>

      <Paragraph>
        When you build sensible primitives for markdown - headings, paragraphs, lists, inline 
        code, code blocks - you naturally converge on similar design decisions:
      </Paragraph>

      <List>
        <ListItem>Headings need hierarchy (size, weight, spacing)</ListItem>
        <ListItem>Paragraphs need line-height for readability</ListItem>
        <ListItem>Lists need subtle indentation</ListItem>
        <ListItem>Inline code needs background contrast</ListItem>
        <ListItem>Code blocks need syntax highlighting</ListItem>
      </List>

      <Paragraph>
        These aren't Notion-specific decisions. They're just <strong>good typography</strong>.
      </Paragraph>

      <Paragraph>
        Notion executed them well. So when I built primitives with the same constraints 
        ("make markdown readable"), I ended up in the same place.
      </Paragraph>

      <Heading level={2}>The Inline Code Reveal</Heading>

      <Paragraph>
        The final piece was inline code styling. I changed mine to match Notion's:
      </Paragraph>

      <List>
        <ListItem>contrasty color</ListItem>
        <ListItem>Subtle border</ListItem>
        <ListItem>Small padding</ListItem>
        <ListItem>Monospace font</ListItem>
      </List>

      <Paragraph>
        Example: <Code>const notion = true;</Code>
      </Paragraph>

      <Paragraph>
        That pushed it over the edge. Now every <Code>inline code</Code> reference looks exactly 
        like Notion's.
      </Paragraph>

      <Heading level={2}>Design Convergence</Heading>

      <Paragraph>
        This is a case study in <strong>design convergence</strong>: given the same constraints 
        (readable markdown) and goals (clean, minimal interface), different designers arrive at 
        similar solutions.
      </Paragraph>

      <Paragraph>
        It's not copying. It's discovering the same local maximum in design space.
      </Paragraph>

      <Paragraph>
        Notion didn't invent:
      </Paragraph>

      <List>
        <ListItem>Large titles</ListItem>
        <ListItem>Metadata below headings</ListItem>
        <ListItem>Gray inline code backgrounds</ListItem>
        <ListItem>Clean sans-serif typography</ListItem>
      </List>

      <Paragraph>
        They just executed them well together. When you optimize for the same things 
        (readability, minimalism, markdown support), you get similar results.
      </Paragraph>

      <Heading level={2}>Why I'm Not Changing It</Heading>

      <Paragraph>
        Should I deliberately diverge to look "different"? No.
      </Paragraph>

      <Paragraph>
        Because this works. It's readable. It's clean. The primitives are solid.
      </Paragraph>

      <Paragraph>
        Making it look different just to avoid resemblance would be bad design. I'd be optimizing 
        for novelty instead of usability.
      </Paragraph>

      <Paragraph>
        Plus, if my blog looks like Notion, that means it looks <em>polished</em>. Notion spent 
        years refining their content presentation. If I accidentally matched it with primitives 
        and good constraints, that's a win.
      </Paragraph>

      <Heading level={2}>The Lesson</Heading>

      <Paragraph>
        Good design constraints lead to similar outcomes. Build sensible primitives for your 
        domain (markdown content, in my case) and you'll naturally converge on patterns that 
        "just work."
      </Paragraph>

      <Paragraph>
        You don't need to copy competitors. You just need to solve the same problems well.
      </Paragraph>

      <Paragraph>
        So yes, my blog looks like Notion. Not because I copied it, but because we both optimized 
        for readable markdown with clean typography.
      </Paragraph>

      <Paragraph>
        Design convergence is real. And honestly? I'm okay with it.
      </Paragraph>

      <Paragraph>
        (Notion, if you're reading this: love your product!)
      </Paragraph>
    </>
  );
};

export default AccidentalNotionClonePost;
