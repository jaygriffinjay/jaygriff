'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../theme/theme';
import {
  Container,
  Title,
  Card,
  Button,
  ControlGroup,
  Label,
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from './components';
import {
  Heading,
  Paragraph,
  Text,
  List,
  ListItem,
  Link,
  Code,
  Blockquote,
  Callout,
  Divider,
  Stack,
} from '../../components/Primitives';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';

export function ThemeEditorPage() {
  const { config, theme, updateConfig } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Container>
      <Title>🎨 Theme Playground</Title>
      
      <Card>
        <h2>Theme Controls</h2>
        <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
          Move the sliders to see the theme update in real-time!
        </p>
        
        {/* Border Radius Control */}
        <ControlGroup>
          <Label>Border Radius: {config.radiusScale}px</Label>
          <SliderRoot
            value={[Math.min(config.radiusScale, 100)]}
            onValueChange={([v]) => updateConfig({ radiusScale: v })}
            min={0}
            max={100}
            step={1}
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </SliderRoot>
          <div style={{ marginTop: '8px' }}>
            <Button onClick={() => updateConfig({ radiusScale: 0 })}>
              Square (0)
            </Button>
            <Button onClick={() => updateConfig({ radiusScale: 8 })}>
              Rounded (8)
            </Button>
            <Button onClick={() => updateConfig({ radiusScale: 9999 })}>
              Full Pill (9999)
            </Button>
          </div>
        </ControlGroup>
        
        {/* Primary Hue Control */}
        <ControlGroup>
          <Label>Primary Color Hue: {config.primaryHue}°</Label>
          <SliderRoot
            value={[config.primaryHue]}
            onValueChange={([v]) => updateConfig({ primaryHue: v })}
            min={0}
            max={360}
            step={1}
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </SliderRoot>
        </ControlGroup>
        
        {/* Spacing Control */}
        <ControlGroup>
          <Label>Spacing Unit: {config.spacingUnit}px</Label>
          <SliderRoot
            value={[config.spacingUnit]}
            onValueChange={([v]) => updateConfig({ spacingUnit: v })}
            min={2}
            max={12}
            step={1}
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </SliderRoot>
        </ControlGroup>
        
        {/* Font Size Control */}
        <ControlGroup>
          <Label>Base Font Size: {config.baseFontSize}px</Label>
          <SliderRoot
            value={[config.baseFontSize]}
            onValueChange={([v]) => updateConfig({ baseFontSize: v })}
            min={12}
            max={20}
            step={1}
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </SliderRoot>
        </ControlGroup>
        
        {/* Shadow Intensity Control */}
        <ControlGroup>
          <Label>Shadow Intensity: {(config.shadowIntensity * 100).toFixed(0)}%</Label>
          <SliderRoot
            value={[config.shadowIntensity * 100]}
            onValueChange={([v]) => updateConfig({ shadowIntensity: v / 100 })}
            min={0}
            max={100}
            step={5}
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </SliderRoot>
        </ControlGroup>
        
        {/* Color Pickers */}
        <ControlGroup>
          <Label>Background Color</Label>
          <input 
            type="color" 
            value={config.backgroundColor}
            onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
            style={{ 
              width: '100%', 
              height: '40px', 
              cursor: 'pointer',
              border: '1px solid ' + theme.colors.border,
              borderRadius: theme.radii.small,
            }}
          />
        </ControlGroup>
        
        <ControlGroup>
          <Label>Text Color</Label>
          <input 
            type="color" 
            value={config.textColor}
            onChange={(e) => updateConfig({ textColor: e.target.value })}
            style={{ 
              width: '100%', 
              height: '40px', 
              cursor: 'pointer',
              border: '1px solid ' + theme.colors.border,
              borderRadius: theme.radii.small,
            }}
          />
        </ControlGroup>
        
        <ControlGroup>
          <Label>Shadow Color</Label>
          <input 
            type="color" 
            value={config.shadowColor}
            onChange={(e) => updateConfig({ shadowColor: e.target.value })}
            style={{ 
              width: '100%', 
              height: '40px', 
              cursor: 'pointer',
              border: '1px solid ' + theme.colors.border,
              borderRadius: theme.radii.small,
            }}
          />
        </ControlGroup>
      </Card>
      
      <Card>
        <h2>Component Examples</h2>
        <p style={{ marginBottom: '1rem' }}>
          These components automatically use theme values (with shadows!):
        </p>
        <Button onClick={() => alert('Button clicked!')}>Primary Button</Button>
        <Button onClick={() => alert('Another button!')}>Another Button</Button>
        
        <div style={{ marginTop: theme.spacing.lg }}>
          <h3 style={{ marginBottom: theme.spacing.sm }}>Shadow Examples:</h3>
          <div style={{ 
            padding: theme.spacing.md, 
            background: theme.colors.hover,
            borderRadius: theme.radii.medium,
            boxShadow: theme.shadows.sm,
            marginBottom: theme.spacing.sm,
          }}>
            Small Shadow (sm)
          </div>
          <div style={{ 
            padding: theme.spacing.md, 
            background: theme.colors.hover,
            borderRadius: theme.radii.medium,
            boxShadow: theme.shadows.md,
            marginBottom: theme.spacing.sm,
          }}>
            Medium Shadow (md)
          </div>
          <div style={{ 
            padding: theme.spacing.md, 
            background: theme.colors.hover,
            borderRadius: theme.radii.medium,
            boxShadow: theme.shadows.lg,
          }}>
            Large Shadow (lg)
          </div>
        </div>
      </Card>
      
      <Card>
        <h2>Content Primitives</h2>
        <p style={{ marginBottom: '1rem' }}>
          All primitives automatically use theme values:
        </p>
        
        <Stack spacing="lg">
          {/* Headings */}
          <div>
            <Heading level={1}>Heading Level 1</Heading>
            <Heading level={2}>Heading Level 2</Heading>
            <Heading level={3}>Heading Level 3</Heading>
            <Heading level={4}>Heading Level 4</Heading>
            <Heading level={5}>Heading Level 5</Heading>
            <Heading level={6}>Heading Level 6</Heading>
          </div>
          
          <Divider />
          
          {/* Text variants */}
          <div>
            <Paragraph>
              This is a paragraph with regular body text. It uses the theme's font family, 
              size, and color automatically.
            </Paragraph>
            <Text variant="caption">This is caption text (smaller and muted)</Text>
            <br />
            <Text variant="small">This is small text</Text>
          </div>
          
          <Divider />
          
          {/* Lists */}
          <div>
            <Heading level={4}>Unordered List</Heading>
            <List>
              <ListItem>First item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </List>
            
            <Heading level={4}>Ordered List</Heading>
            <List ordered>
              <ListItem>Step one</ListItem>
              <ListItem>Step two</ListItem>
              <ListItem>Step three</ListItem>
            </List>
          </div>
          
          <Divider />
          
          {/* Code */}
          <div>
            <Paragraph>
              Inline code example: <Code>const theme = useTheme()</Code>
            </Paragraph>
            <CodeBlock language="typescript" showLineNumbers>
{`function example() {
  const theme = useTheme();
  return <div style={{ color: theme.colors.primary }} />;
}`}
            </CodeBlock>
          </div>
          
          <Divider />
          
          {/* Blockquote */}
          <Blockquote>
            "This is a blockquote. It's great for highlighting important quotes or 
            callouts in your documentation."
          </Blockquote>
          
          <Divider />
          
          {/* Callouts */}
          <Stack spacing="sm">
            <Callout type="info">
              This is an info callout with useful information.
            </Callout>
            <Callout type="success">
              This is a success callout for positive messages.
            </Callout>
            <Callout type="warning">
              This is a warning callout for things to be careful about.
            </Callout>
            <Callout type="error">
              This is an error callout for critical information.
            </Callout>
          </Stack>
          
          <Divider />
          
          {/* Links */}
          <Paragraph>
            Here's a <Link href="https://github.com">link example</Link> within text.
          </Paragraph>
        </Stack>
      </Card>
      
      <Card>
        <h2>Current Theme Values</h2>
        <CodeBlock>{JSON.stringify(theme, null, 2)}</CodeBlock>
      </Card>
    </Container>
  );
}
