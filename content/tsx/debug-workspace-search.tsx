import { PostMeta } from '@/types/post';
import { Heading, Paragraph, Code, List, ListItem } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';

export const metadata: PostMeta = {
  title: 'Debug: Hammerspoon Workspace Search',
  slug: 'debug-workspace-search',
  date: '2026-03-04T12:00:00Z',
  description: 'Debugging the Hammerspoon workspace search script — data model, known issues, and console log audit guide.',
  type: 'doc',
  tags: ['debug', 'hammerspoon', 'macos'],
  author: ['Jay Griffin', 'Claude Opus 4.6'],
  authorshipNote: 'Claude Opus 4.6 via GitHub Copilot',
};

export default function DebugWorkspaceSearch() {
  return (
    <>
      <Heading level={2}>How It Works</Heading>
      <Paragraph>
        The workspace search lives in <Code>~/.hammerspoon/init.lua</Code>. Two hotkeys:
      </Paragraph>
      <List>
        <ListItem><Code>CMD+SHIFT+S</Code> — saves the active space on every connected screen under a name</ListItem>
        <ListItem><Code>CMD+SHIFT+SPACE</Code> — search saved workspaces, select one to switch all screens to their saved spaces</ListItem>
      </List>

      <Heading level={2}>Data Model</Heading>
      <Paragraph>
        Workspaces are stored in <Code>hs.settings</Code> under the key <Code>&quot;workspaces&quot;</Code>. Each entry looks like:
      </Paragraph>
      <CodeBlock language="json">{`{
  "name": "reading",
  "spaces": {
    "SCREEN-UUID-1": 42,
    "SCREEN-UUID-2": 57
  }
}`}</CodeBlock>
      <Paragraph>
        The <Code>spaces</Code> table maps each screen&apos;s UUID to the macOS space ID that was active on that screen when saved. On switch, the script calls <Code>hs.spaces.gotoSpace(spaceID)</Code> for each entry.
      </Paragraph>

      <Heading level={2}>Known Failure Modes</Heading>

      <Heading level={3}>1. Space IDs Are Ephemeral</Heading>
      <Paragraph>
        macOS assigns integer space IDs at boot. They change on restart, and can change when spaces are added/removed/reordered. A workspace saved yesterday may have stale IDs today. The script detects this by checking against <Code>hs.spaces.allSpaces()</Code> and marks stale entries in the chooser.
      </Paragraph>

      <Heading level={3}>2. Screen UUIDs Can Change</Heading>
      <Paragraph>
        Screen UUIDs come from <Code>screen:getUUID()</Code>. If a monitor is unplugged and re-plugged, or display arrangement changes, the UUID may differ. The script would still call <Code>gotoSpace</Code> with the right space ID, but the UUID key in the saved data won&apos;t match the current screen UUID — meaning the lookup structure is stale even if the space IDs happen to still be valid.
      </Paragraph>

      <Heading level={3}>3. gotoSpace Only Switches the Screen That Owns the Space</Heading>
      <Paragraph>
        With &quot;Displays have separate Spaces&quot; enabled, each screen has its own set of space IDs. Calling <Code>hs.spaces.gotoSpace(42)</Code> only switches the screen that owns space 42. If both screens need to switch, we need two calls — one per screen&apos;s saved space ID. The original single-spaceID version only saved one screen&apos;s space.
      </Paragraph>

      <Heading level={3}>4. gotoSpace May Silently Fail</Heading>
      <Paragraph>
        <Code>hs.spaces.gotoSpace()</Code> can return success but not actually switch. This happens when: the space exists but macOS is mid-animation, the space belongs to a fullscreen app, or System Integrity Protection blocks the private API. The debug logging prints the pcall result so we can see if the call itself errors.
      </Paragraph>

      <Heading level={2}>Console Log Guide</Heading>
      <Paragraph>
        Open the Hammerspoon console (<Code>CMD+SHIFT+SPACE</Code> on the Hammerspoon menu bar icon, or <Code>hs.openConsole()</Code>). All workspace operations now print <Code>[WS]</Code>-prefixed logs.
      </Paragraph>

      <Heading level={3}>On Save (CMD+SHIFT+S)</Heading>
      <CodeBlock language="text">{`[WS] Screen: LG HDR 4K (UUID=ABC-123) → spaceID=42
[WS] Screen: Built-in Retina (UUID=DEF-456) → spaceID=57
[WS] Loaded 3 workspaces from settings
[WS]   1. jaygriff → ABC-123=38 DEF-456=51
[WS]   2. reading → ABC-123=42 DEF-456=57
[WS]   3. finance → ABC-123=45 DEF-456=60
[WS] Saving 3 workspaces
[WS] Saved workspace 'reading' with spaces:
[WS]   ABC-123 → 42
[WS]   DEF-456 → 57`}</CodeBlock>

      <Heading level={3}>On Switch (CMD+SHIFT+SPACE → select)</Heading>
      <CodeBlock language="text">{`[WS] Loaded 3 workspaces from settings
[WS]   1. jaygriff → ABC-123=38 DEF-456=51
[WS]   2. reading → ABC-123=42 DEF-456=57
[WS]   3. finance → ABC-123=45 DEF-456=60
[WS] Screen: LG HDR 4K (UUID=ABC-123) → spaceID=38
[WS] Screen: Built-in Retina (UUID=DEF-456) → spaceID=51
[WS] Switching to workspace: reading
[WS]   gotoSpace(42) for screen ABC-123
[WS]   result: ok=true err=nil
[WS]   gotoSpace(57) for screen DEF-456
[WS]   result: ok=true err=nil`}</CodeBlock>

      <Heading level={2}>What to Check</Heading>
      <List>
        <ListItem><strong>Are both screens detected?</strong> Look for two <Code>[WS] Screen:</Code> lines on save. If only one, Hammerspoon isn&apos;t seeing the second display.</ListItem>
        <ListItem><strong>Are both space IDs being saved?</strong> The <Code>Saved workspace</Code> log should show two UUID → spaceID entries.</ListItem>
        <ListItem><strong>Are both gotoSpace calls firing?</strong> On switch, there should be two <Code>gotoSpace(...)</Code> lines. If only one, the spaces table is incomplete.</ListItem>
        <ListItem><strong>Do the space IDs match?</strong> Compare the saved IDs (from load log) with current screen IDs (from <Code>[WS] Screen:</Code> lines). If they differ, the spaces changed since save.</ListItem>
        <ListItem><strong>Does gotoSpace return ok=true but nothing happens?</strong> That&apos;s macOS silently ignoring the call — likely an animation conflict or SIP issue.</ListItem>
      </List>

      <Heading level={2}>Quick Hammerspoon Console Commands</Heading>
      <CodeBlock language="lua">{`-- Dump all current space IDs per screen
for uuid, spaces in pairs(hs.spaces.allSpaces()) do print(uuid, hs.inspect(spaces)) end

-- Check what's saved
hs.inspect(hs.settings.get("workspaces"))

-- Nuke all saved workspaces and start fresh
hs.settings.set("workspaces", {})

-- Manually try switching to a specific space ID
hs.spaces.gotoSpace(42)`}</CodeBlock>
    </>
  );
}
