import { PostMeta } from '@/types/post';
import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';

export const metadata: PostMeta = {
  title: 'Building Custom GitHub Copilot Skills: A Natural Language Command Interface for My Workflow',
  description: 'Why I\'m building domain-specific tools and skills for GitHub Copilot instead of using marketplace solutions—creating an audience-of-one command interface with zero abstraction tax.',
  date: '2026-02-09T21:00:00Z',
  slug: 'building-custom-copilot-skills',
  tags: ['dev', 'ai', 'workflow', 'tools', 'automation'],
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  authorshipNote: 'Written collaboratively after realizing that custom AI skills aren\'t just productivity tools—they\'re a natural language command interface for encoding my entire development workflow. This article documents the vision.',
};

export default function BuildingCustomCopilotSkills() {
  return (
    <>
      <Paragraph>
        After consolidating on GitHub Copilot for my daily coding work, I realized something: the real power isn't in using built-in tools—it's in building my own skills and tools that speak my exact workflow dialect.
      </Paragraph>

      <Heading level={2}>The Natural Language Command Surface</Heading>
      <Paragraph>
        Every time I use Copilot, I see the same pattern: I describe what I want in natural language, it reasons about which tools to use, executes them, and returns results. <Code>get_errors</Code> → <Code>read_file</Code> → <Code>replace_string_in_file</Code>. It's tool orchestration driven by intent.
      </Paragraph>
      <Paragraph>
        But here's what got me excited: I can build custom tools and skills that extend this pattern with my exact codebase knowledge. Instead of generic commands, I get a natural language command interface that speaks my project's dialect.
      </Paragraph>

      <Heading level={2}>Tools vs Skills</Heading>
      <Paragraph>
        The GitHub Copilot SDK lets you build at two levels:
      </Paragraph>
      <List>
        <ListItem>
          <strong>Tools</strong> - Low-level primitives that expose specific capabilities. Like <Code>read_file</Code> or <Code>run_in_terminal</Code>, but for your domain. Examples: <Code>validate_post_metadata</Code>, <Code>check_primitive_usage</Code>, <Code>optimize_images_for_post</Code>.
        </ListItem>
        <ListItem>
          <strong>Skills/Agents</strong> - Higher-level capabilities that orchestrate tools to accomplish goals. They have specialized instructions and know when to use which tools. Examples: a ContentCreator skill that knows how to scaffold new posts with proper metadata and imports.
        </ListItem>
      </List>
      <Paragraph>
        The magic happens when you build both: custom tools that understand your codebase, wrapped in custom skills that know your workflow patterns.
      </Paragraph>

      <Heading level={2}>Why Roll My Own</Heading>
      <Paragraph>
        The ecosystem for Copilot extensions is still early. There are some official extensions and a growing community, but they're all generic.
      </Paragraph>
      <Paragraph>
        My codebase has unique patterns:
      </Paragraph>
      <List>
        <ListItem>Content lives in <Code>content/tsx/</Code> as React components</ListItem>
        <ListItem>Must import from <Code>@/components/Primitives</Code>, never use raw HTML tags</ListItem>
        <ListItem><Code>PostMeta</Code> interface has specific required fields</ListItem>
        <ListItem>First-person voice, not second-person</ListItem>
        <ListItem>Emotion CSS-in-JS with theme variables</ListItem>
        <ListItem>Checkpoint-based solo dev workflow</ListItem>
      </List>
      <Paragraph>
        A marketplace tool can't know this. But a custom skill trained on my copilot-instructions.md and my PostMeta interface? That's power.
      </Paragraph>

      <Heading level={2}>Audience-of-One Tools</Heading>
      <Paragraph>
        This is the same reason my <Code>.zshrc</Code> aliases are useless to anyone else. When I type <Code>shove-to-gh</Code>, I know it means "commit everything and push to GitHub." That compression is power—it's my dialect.
      </Paragraph>
      <Paragraph>
        Custom Copilot skills are that, but with natural language flexibility. When I say "make sure all my posts have complete metadata," my PostValidator skill knows exactly what that means:
      </Paragraph>
      <List>
        <ListItem>Check that <Code>title</Code>, <Code>description</Code>, <Code>date</Code>, <Code>slug</Code> exist</ListItem>
        <ListItem>Verify <Code>date</Code> is ISO 8601 format</ListItem>
        <ListItem>Ensure <Code>author</Code> is array if multiple authors</ListItem>
        <ListItem>Flag missing <Code>authorshipNote</Code> when AI co-authored</ListItem>
        <ListItem>Verify <Code>slug</Code> matches filename</ListItem>
      </List>
      <Paragraph>
        Zero abstraction tax. No configuration UI, no "which fields do you want to validate?" - it just knows my <Code>PostMeta</Code> interface.
      </Paragraph>

      <Heading level={2}>The Command Surface I'm Building</Heading>
      <Paragraph>
        Here's what I want to be able to say:
      </Paragraph>
      <List>
        <ListItem>"Create a new blog post about X" → ContentGenerator scaffolds the file with proper imports and metadata</ListItem>
        <ListItem>"Fix my SEO metadata" → SEOOptimizer validates PostMeta, generates OpenGraph images, checks canonical URLs</ListItem>
        <ListItem>"Make sure I'm using Primitives correctly" → StyleChecker scans for raw HTML tags, verifies Code vs code usage</ListItem>
        <ListItem>"Deploy this" → DeploymentManager builds, runs checks, pushes to Cloudflare</ListItem>
        <ListItem>"What's broken?" → HealthCheck runs linting, type checking, link validation, image optimization checks</ListItem>
      </List>
      <Paragraph>
        Each of these is a skill that knows my workflow and orchestrates the right tools. The model routes my intent to the right skill automatically.
      </Paragraph>

      <Heading level={2}>What's Actually New Here</Heading>
      <Paragraph>
        Using commands to automate tasks isn't new. But what's happening with AI agents is fundamentally different in two ways.
      </Paragraph>
      <Paragraph>
        First, tool use isn't just function calling. When a tool executes, the results get returned to the AI's context, and it reasons about them. A bash script runs <Code>git status</Code> and pipes the output to the next command—blind data flow. But when an AI uses <Code>get_errors</Code>, it reads the results, understands what the errors mean, and decides what to do next. The data doesn't just flow—it's comprehended.
      </Paragraph>
      <Paragraph>
        Second, skills are chained tool use with reasoning between each step. The AI doesn't just run a predefined sequence. It orchestrates tools dynamically based on what it learns. This feedback loop is the critical difference from traditional scripting. A bash script that hits an error either crashes or has pre-programmed error handling. But when <Code>validate_post_metadata</Code> returns "missing authorshipNote," the AI can reason about <em>why</em> that matters—it's about transparency for AI co-authorship—and decide whether to auto-fix, warn, or ask for clarification. That's not scripting—that's adaptive execution.
      </Paragraph>
      <Paragraph>
        And then there's the natural language interface layer. TypeScript is a high-order language that abstracts assembly. But natural language commands that detect intent and route to the right skills? That's a higher-order interface than even TypeScript. I'm not writing function calls or composing pipelines—I'm expressing intent, and the system figures out the implementation.
      </Paragraph>
      <Paragraph>
        That's what makes this groundbreaking. Not that I can automate tasks—I've always been able to do that. But that I can encode my workflow into tools, let an AI reason about when and how to use them, and interact with the whole system in plain English. The abstraction layer is intent itself.
      </Paragraph>

      <Heading level={2}>Starting Simple</Heading>
      <Paragraph>
        I'm not building 20 skills at once. I'm starting with 2-3 high-value tools that solve immediate pain points:
      </Paragraph>
      <List>
        <ListItem>
          <Code>validate_post_metadata</Code> - Checks PostMeta completeness before I publish. Already caught the author vs authors issue today.
        </ListItem>
        <ListItem>
          <Code>scaffold_content_file</Code> - Creates new content/tsx files with proper boilerplate. No more copy-pasting from existing files.
        </ListItem>
        <ListItem>
          <Code>check_component_imports</Code> - Ensures I'm importing from Primitives, flags raw HTML tags like <Code>&lt;code&gt;</Code> instead of <Code>&lt;Code&gt;</Code>.
        </ListItem>
      </List>
      <Paragraph>
        Once those work, I'll wrap them in a ContentCreator skill that knows when to use each tool.
      </Paragraph>

      <Heading level={2}>The Architecture</Heading>
      <Paragraph>
        The GitHub Copilot SDK provides a model-agnostic tool interface. Whether I'm running Claude, GPT-4o, or another model, they all see the same tools with consistent JSON schemas.
      </Paragraph>
      <Paragraph>
        The flow is:
      </Paragraph>
      <List>
        <ListItem>I give a natural language command</ListItem>
        <ListItem>The model reasons about which tools/skills to invoke</ListItem>
        <ListItem>Tools execute in VS Code's environment (file system, terminal, git state)</ListItem>
        <ListItem>Results get fed back to the model</ListItem>
        <ListItem>Model decides next action or returns final result</ListItem>
      </List>
      <Paragraph>
        My custom tools plug into this same flow. They just happen to know my exact codebase patterns.
      </Paragraph>

      <Heading level={2}>Why This Matters</Heading>
      <Paragraph>
        These skills aren't just eliminating cognitive overhead—they're encoding expertise as executable knowledge. When <Code>check_component_imports</Code> flags <Code>&lt;code&gt;</Code> instead of <Code>&lt;Code&gt;</Code>, that's not a linter rule. That's my design system philosophy—constraint-based primitives with theme integration—captured as something that can reason and act.
      </Paragraph>
      <Paragraph>
        Every repetitive task is friction. Every time I have to remember "did I import Code from Primitives?" or "what fields does PostMeta need?"—that's cognitive overhead. But more importantly, it's expertise that could be encoded. Custom skills turn that expertise into a natural language command interface. The IDE becomes voice-controlled, speaking my dialect, understanding not just my codebase but my reasoning about it.
      </Paragraph>

      <Heading level={2}>The Long-Term Vision</Heading>
      <Paragraph>
        As I build more skills, the command surface grows. Eventually, entire workflows compress into single commands:
      </Paragraph>
      <List>
        <ListItem>"Publish this post" → validates metadata, optimizes images, runs type checking, commits, pushes, deploys</ListItem>
        <ListItem>"Refactor this component" → checks usage across codebase, runs tests, updates all references, verifies no breaks</ListItem>
        <ListItem>"Add analytics to all posts" → finds all PostMeta exports, adds tracking field, updates rendering logic</ListItem>
      </List>
      <Paragraph>
        Each skill is small. But when you have 20 skills that understand your workflow, you've built a natural language programming environment that speaks your exact dialect.
      </Paragraph>

      <Heading level={2}>Getting Started</Heading>
      <Paragraph>
        I'm documenting this before I build it because I want to capture the vision clearly. The next steps are:
      </Paragraph>
      <List>
        <ListItem>Read the GitHub Copilot SDK documentation</ListItem>
        <ListItem>Build my first tool: <Code>validate_post_metadata</Code></ListItem>
        <ListItem>Test it with the existing Copilot agent</ListItem>
        <ListItem>Iterate based on what works</ListItem>
        <ListItem>Add more tools as pain points emerge</ListItem>
      </List>
      <Paragraph>
        I'll document the process as I go. The goal isn't to build a perfect system—it's to build something useful that evolves with my workflow.
      </Paragraph>
      <Paragraph>
        This is the power of audience-of-one tools: they don't need to be polished or general-purpose. They just need to work for me, in my voice, for my codebase.
      </Paragraph>
    </>
  );
}
