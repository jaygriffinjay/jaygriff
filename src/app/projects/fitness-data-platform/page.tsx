import { Container, Heading, Paragraph, Link, List, ListItem, Divider } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Fitness Data Platform',
  description: 'Personal fitness analytics — Strava running data, Garmin sleep tracking, and a local-first dashboard built on SQLite.',
};

export default function FitnessDataPlatformPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>Fitness Data Platform</Heading>

        <Paragraph>
          Fitness apps are built for the average user who wants a score and a trend line. I want to actually dig into my data — fix misclassifications, log naps Garmin doesn't capture, see multiple nights stacked side by side, correlate sleep quality with training load. So I've been building my own tooling on top of my Garmin and Strava data.
        </Paragraph>
        <Paragraph>
          This is an ongoing personal project. Some of it is public — anyone can connect their Strava account to the analyzer. The rest is deliberately local-first: my raw health data does not leave my machine.
        </Paragraph>

        <Divider />

        <Heading level={2}>Strava Analyzer</Heading>
        <Paragraph>
          The public-facing piece. Connect your Strava account and it visualizes your full running history as a weekly mileage chart — every week, all time — with drill-down into individual days and activities. It runs in the browser against the Strava API via OAuth and is deployed on Vercel.
        </Paragraph>
        <Paragraph>
          <Link href="/projects/strava-analyzer">Read more about Strava Analyzer →</Link>
        </Paragraph>

        <Divider />

        <Heading level={2}>Garmin Sleep Dashboard</Heading>
        <Paragraph>
          The local-first piece. I've been wearing a Garmin Forerunner 165 for months — the 10-day battery means I almost never take it off, so sleep data is consistent. The Garmin Connect app is fine for a quick glance but falls apart when you want to edit records, log naps, or compare nights.
        </Paragraph>
        <Paragraph>
          The pipeline:
        </Paragraph>
        <List>
          <ListItem><strong>Python fetch script</strong> — pulls sleep data from the Garmin Connect API using the <code>garminconnect</code> library, saves raw JSON incrementally. Run it daily, it skips dates already fetched.</ListItem>
          <ListItem><strong>SQLite import</strong> — a TypeScript script reads the JSON and loads it into a local <code>garmin.db</code>. Each sleep stage segment gets its own row: date, start/end UTC timestamps, and stage (Deep, Light, REM, Awake, Unmeasurable).</ListItem>
          <ListItem><strong>Next.js dashboard</strong> — server components query SQLite directly with <code>better-sqlite3</code>. No API layer, no ORM, instant reads.</ListItem>
        </List>
        <Paragraph>
          The main visualization is a horizontal bar per night — full width = total sleep duration, each segment colored by stage proportionally. Deep is dark navy, light is sky blue, REM is fuchsia, awake is red. Stack multiple nights and patterns in stage distribution become obvious that you'd never spot in a list of numbers.
        </Paragraph>
        <Paragraph>
          Naps are tracked manually via a form — start/end in local time, stored in a separate <code>naps</code> table, rendered as amber bars alongside the main sleep session.
        </Paragraph>
        <Paragraph>
          <Link href="/posts/garmin-sleep-dashboard">Read the full writeup →</Link>
        </Paragraph>

        <Divider />

        <Heading level={2}>What's Next</Heading>
        <List>
          <ListItem><strong>Edit and delete</strong> individual sleep stage records — for when the watch misclassifies a segment</ListItem>
          <ListItem><strong>Multi-night comparison</strong> — stacked horizontal bars, one per night, scrollable over weeks</ListItem>
          <ListItem><strong>Activity data</strong> — workouts, heart rate trends, HRV from Garmin</ListItem>
          <ListItem><strong>Cross-data correlation</strong> — sleep quality vs. training load, recovery scores</ListItem>
        </List>

        <Divider />

        <Heading level={2}>Stack</Heading>
        <List>
          <ListItem><strong>Python + garminconnect</strong> — data fetch from Garmin Connect API</ListItem>
          <ListItem><strong>SQLite + better-sqlite3</strong> — local data store, synchronous reads from server components</ListItem>
          <ListItem><strong>Next.js App Router + TypeScript</strong> — server components do the queries, client components only where interactivity is needed</ListItem>
          <ListItem><strong>Tailwind CSS</strong> — dark theme throughout</ListItem>
          <ListItem><strong>Recharts</strong> — sleep stage pie chart</ListItem>
          <ListItem><strong>Strava API (OAuth)</strong> — activity data for the public analyzer</ListItem>
        </List>
      </ContentWrapper>
    </Container>
  );
}
