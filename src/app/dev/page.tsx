import Link from 'next/link';
import { Container, Heading, List, ListItem } from '@/components/Primitives';

export default function DevPage() {
  return (
    <Container size="sm">
      <Heading level={1}>Dev Tools</Heading>
      <p style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Internal dev routes, test utilities, and behind-the-scenes infrastructure.
      </p>
      
      <List css={{ marginTop: '2rem' }}>
        <ListItem>
          <Link 
            href="/dev/test-parser"
            style={{ 
              color: '#60a5fa',
              textDecoration: 'none',
              fontSize: '1.125rem',
            }}
          >
            Markdown Parser Test
          </Link>
          <div style={{ 
            color: 'rgba(255, 255, 255, 0.6)', 
            fontSize: '0.95rem',
            marginTop: '0.25rem',
          }}>
            Test the JSON frontmatter parser on markdown files
          </div>
        </ListItem>
      </List>
    </Container>
  );
}
