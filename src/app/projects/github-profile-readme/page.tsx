import { Container, Heading, Paragraph } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';

export const metadata = {
  title: 'Github Profile README',
  description: 'Gaming the GitHub README format — hand-coded SVG animations to build a visually arresting profile page within GitHub\'s heavily sanitized constraints.',
};

const svgs = [
  { src: '/images/projects/globe.svg', alt: 'Globe' },
  { src: '/images/projects/ellipse-globe.svg', alt: 'Ellipse globe' },
  { src: '/images/projects/hex-glass-tessellation.svg', alt: 'Hex glass tessellation' },
  { src: '/images/projects/carat-tessellation.svg', alt: 'Carat tessellation' },
  { src: '/images/projects/tesselation-test.svg', alt: 'Tessellation test' },
  { src: '/images/projects/triangle-fill.svg', alt: 'Triangle fill' },

  { src: '/images/projects/github-dimension-test.svg', alt: 'Dimension test' },
  { src: '/images/projects/dimension-test-wide.svg', alt: 'Dimension test wide' },
  { src: '/images/projects/css-animation-test.svg', alt: 'CSS animation test' },
    { src: '/images/projects/cube-tessellation.svg', alt: 'Cube tessellation' },
  { src: '/images/projects/wave.svg', alt: 'Wave' },
    { src: '/images/projects/dimension-test-tall.svg', alt: 'Dimension test tall' },

];

export default function GithubProfileReadmePage() {
  return (
    <Container size="xl">
      <ContentWrapper>
        <Heading level={1}>Github Profile README</Heading>
        <Paragraph>
          The goal: a visually arresting GitHub profile README. The constraint: GitHub READMEs are brutally sanitized. No CSS. No HTML. No external scripts. Worse than an HTML email. The only thing that actually works for animation is GIFs — and hand-coded SVG with inline SMIL animations.
        </Paragraph>
        <Paragraph>
          So everything here is pure SVG. No libraries, no tooling, just the math. Globes built from ellipses, tessellations tiled by hand, waves constructed from paths. Every shape is deliberate. I did use AI though. That's the modern reality: I'm still doing a lot of the geometry, I'm just not manually counting coordinate offsets at 1am.
        </Paragraph>
        <Paragraph>
          It reminded me of messing with a graphing calculator in high school except at the time I didn't know how to do the math and I just made parabolas. But now I actually like doing some of the math for fun (and AI helps a lot!), and the output is something I think is cool. 
        </Paragraph>
        <div style={{
          columns: '2 200px',
          columnGap: '1rem',
          marginTop: '2rem',
        }}>
          {svgs.map(({ src, alt }) => (
            <div key={src} style={{
              breakInside: 'avoid',
              marginBottom: '1rem',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '8px',
              padding: '1rem',
            }}>
              <img
                src={src}
                alt={alt}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </ContentWrapper>
    </Container>
  );
}
