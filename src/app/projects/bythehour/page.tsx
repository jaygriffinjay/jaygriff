import { Container, Heading, Paragraph, Divider, List, ListItem } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'ByTheHour',
  description: 'AI-native time blocking app with natural language event scheduling',
};

export default function ByTheHourPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>ByTheHour</Heading>

        <Paragraph>
          ByTheHour is a time blocking app with a natural language interface. Instead of clicking dropdowns and date pickers to schedule events, you just type. "Add a team meeting tomorrow at 2pm for an hour." "Move my 3pm to 4:30." "Clear Thursday afternoon." The app parses the intent and handles the edit.
        </Paragraph>

        <a
          href="https://bythehour.lovable.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            margin: '1.5rem 0',
            padding: '1.25rem 1.5rem',
            border: '1px solid hsl(210, 100%, 40%)',
            borderRadius: '10px',
            background: 'hsla(210, 100%, 50%, 0.08)',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'hsl(210, 100%, 65%)' }}>
            bythehour.lovable.app →
          </span>
          <span style={{ display: 'block', fontSize: '0.85rem', color: 'hsl(210, 20%, 60%)', marginTop: '0.35rem' }}>
            Sign up and try it
          </span>
        </a>

        <img src="/images/projects/bythehour2.png" alt="ByTheHour app screenshot" style={{ width: '100%', borderRadius: '8px', marginBottom: '1.5rem' }} />

        <Paragraph>
          It's live and working — hosted on Lovable, anyone can sign up and use it. I use it myself. But it's also an intentionally experimental project. The primary reason I built it was to get deep reps working with LLMs inside a real product: integrating the API, debugging model outputs, figuring out what features are actually achievable with natural language as the interface.
        </Paragraph>

        <Divider />

        <Heading level={2}>Stack</Heading>
        <List>
          <ListItem><strong>Vite + React + TypeScript</strong> — frontend build and component layer</ListItem>
          <ListItem><strong>Tailwind CSS + shadcn/ui</strong> — styling and UI primitives</ListItem>
          <ListItem><strong>Supabase</strong> — auth and database</ListItem>
          <ListItem><strong>TanStack Query</strong> — server state and data fetching</ListItem>
          <ListItem><strong>Gemini API</strong> — natural language parsing, structured JSON output</ListItem>
          <ListItem><strong>React Router</strong> — client-side routing</ListItem>
          <ListItem><strong>Recharts</strong> — schedule visualizations</ListItem>
        </List>

        <Divider />

        <Heading level={2}>The Interesting Problem: Prompt Injection</Heading>
        <Paragraph>
          The app uses Gemini's API, and I constrained the output to JSON to keep things structured. The model reliably returns valid JSON. But valid JSON doesn't mean safe content — the values inside the JSON can be arbitrary text, and a user can craft a query that gets hostile content into those values. It's a classic prompt injection vector that structured output alone doesn't close.
        </Paragraph>
        <Paragraph>
          The fix I have in mind is using a second LLM as an injection-policing layer that evaluates the query before it ever reaches the scheduling model. For a time blocking app specifically, the inputs are inherently open-ended — you can't just whitelist patterns — so you need something that can reason about whether a query is trying to do something it shouldn't. That's on the roadmap, just not implemented yet.
        </Paragraph>

        <Divider />

        <Heading level={2}>Status</Heading>
        <Paragraph>
          Working demo. Known bugs exist. I haven't migrated it off Lovable to my own hosting yet, and I'm focused on other projects right now. The editing features and natural language interface are solid for personal use. Security hardening and a proper deployment are the next steps when I come back to it.
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
