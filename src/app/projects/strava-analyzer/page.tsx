import { Container, Heading, Paragraph, Divider, List, ListItem, Link } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Strava Analyzer',
  description: 'Running analytics with weekly charts and drill-down visualizations',
};

export default function StravaAnalyzerPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>Strava Analyzer</Heading>

        <Paragraph>
          Strava is fine for logging runs, but its default stats don't let you dig into your data the way I want to. I wanted to see my entire running history at a glance — every week, all time — in a single interactive chart. So I built it.
        </Paragraph>

        <a
          href="https://strava-data-analyzer.vercel.app/"
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
            strava-data-analyzer.vercel.app →
          </span>
          <span style={{ display: 'block', fontSize: '0.85rem', color: 'hsl(210, 20%, 60%)', marginTop: '0.35rem' }}>
            Connect your Strava account and try it
          </span>
        </a>

        <img src="/images/projects/strava-analyzer1.png" alt="Strava Analyzer screenshot" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
        <img src="/images/projects/strava-analyzer2.png" alt="Strava Analyzer screenshot 2" style={{ width: '100%', borderRadius: '8px', marginBottom: '1.5rem' }} />

        <Paragraph>
          Connect your Strava account and it pulls your activity data and visualizes your weekly total mileage across your full history. Click into any week and it breaks down the individual days and activities with links back to each activity on Strava. It's fully functional for anyone with Strava activity data.
        </Paragraph>

        <Divider />

        <Heading level={2}>Stack</Heading>
        <List>
          <ListItem><strong>Next.js + TypeScript</strong> — full-stack framework, App Router</ListItem>
          <ListItem><strong>Emotion</strong> — CSS-in-JS styling</ListItem>
          <ListItem><strong>Recharts</strong> — interactive weekly mileage chart</ListItem>
          <ListItem><strong>Strava API</strong> — OAuth connection, activity data fetch</ListItem>
          <ListItem><strong>Radix UI</strong> — accessible UI primitives</ListItem>
        </List>
        <Paragraph>
          The source is on <Link href="https://github.com/jaygriffinjay/strava-analyzer">GitHub</Link>.
        </Paragraph>

        <Divider />

        <Heading level={2}>What's Planned</Heading>
        <Paragraph>
          The weekly mileage chart is the core feature but there's a lot more running stats worth surfacing — pace trends, long run tracking, streak data, year-over-year comparisons. Cycling stats are also on the list since Strava is just as useful for that. The foundation is there, it's just a matter of building out the views.
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
