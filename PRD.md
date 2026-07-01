# Planning Guide

A full-screen markdown-based slide presentation system that transforms markdown content into beautiful, navigable slide decks with keyboard and touch controls.

**Experience Qualities**: 
1. **Effortless** - Slides flow smoothly with intuitive navigation that feels natural and responsive
2. **Focused** - Full-screen presentation mode eliminates distractions and keeps attention on content
3. **Polished** - Professional slide transitions and typography create a refined presentation experience

**Complexity Level**: Light Application (multiple features with basic state)
This is a presentation viewer with navigation controls, markdown parsing, and state management for current slide tracking, but doesn't require complex data persistence or multiple views beyond the slide deck itself.

## Essential Features

### Markdown Slide Parsing
- **Functionality**: Parse markdown content and split into individual slides based on horizontal rules (---) or heading delimiters
- **Purpose**: Allows users to write presentations in familiar markdown syntax
- **Trigger**: On component mount or when markdown content changes
- **Progression**: Load markdown → Parse into slide array → Extract slide metadata → Render first slide
- **Success criteria**: Each slide correctly isolated with its content, headings, lists, and formatting preserved

### Slide Navigation
- **Functionality**: Navigate between slides using keyboard arrows, on-screen buttons, or swipe gestures
- **Purpose**: Essential for moving through the presentation
- **Trigger**: Arrow key press, navigation button click, or swipe gesture
- **Progression**: User action → Validate navigation bounds → Update current slide index → Animate transition → Update progress indicator
- **Success criteria**: Smooth transitions between slides with no content flash, navigation wraps or stops at boundaries

### Progress Indication
- **Functionality**: Display current slide number and total slide count
- **Purpose**: Helps presenters and viewers understand position in deck
- **Trigger**: Automatically updates when slide changes
- **Progression**: Slide change → Calculate position → Update indicator display
- **Success criteria**: Always shows accurate "X / Y" format in unobtrusive location

### Keyboard Controls
- **Functionality**: Arrow keys (left/right or up/down), spacebar, and keyboard shortcuts (T, O, D)
- **Purpose**: Standard presentation navigation without mouse and quick access to features
- **Trigger**: Keyboard event while presentation is focused
- **Progression**: Key press → Map to navigation action or feature toggle → Execute slide change, theme selector, file selector, or file name display
- **Success criteria**: All standard presentation shortcuts work reliably, keyboard shortcuts feel intuitive and respond instantly

### Full-Screen Mode
- **Functionality**: Display slides in full viewport with no surrounding UI chrome
- **Purpose**: Maximize content visibility and minimize distractions
- **Trigger**: Component renders in full-screen container
- **Progression**: Component mount → Apply full-screen styles → Center slide content
- **Success criteria**: Slides fill viewport on all screen sizes, content properly centered and scaled

### Theme Selector
- **Functionality**: Switch between multiple color scheme themes in real-time
- **Purpose**: Allow users to customize the visual appearance of presentations to match preferences or contexts
- **Trigger**: Click theme selector button in top-right corner or press 'T' key
- **Progression**: Click theme button → Open theme dropdown → Select theme → Apply colors instantly → Persist selection
- **Success criteria**: Theme changes apply immediately, selection persists across sessions, all themes maintain readable contrast ratios

### File Loading System
- **Functionality**: Load markdown presentations from local filesystem or remote Git URLs (GitHub/GitLab)
- **Purpose**: Enable users to present from various sources without manually copying content
- **Trigger**: Press 'O' key or click folder icon button in top-right corner
- **Progression**: Open file selector → Choose local files tab or Git URL tab → Browse local folder or paste Git URL → Select/load file → Parse markdown → Display slides
- **Success criteria**: Successfully loads .md/.markdown files from local directories and raw markdown files from GitHub/GitLab URLs, displays errors clearly if URL is invalid or file cannot be fetched

### Presentation Timer
- **Functionality**: Display elapsed time since presentation started with controls to pause/resume and reset
- **Purpose**: Help presenters track time and stay on schedule during timed presentations
- **Trigger**: Starts automatically when presentation loads
- **Progression**: Component mount → Initialize timer → Auto-start counting → User clicks pause/play button → Timer pauses/resumes → User clicks reset → Timer returns to 0:00
- **Success criteria**: Timer accurately displays elapsed time in M:SS or H:MM:SS format, pause/resume works reliably, reset returns to zero and resumes counting, timer persists across slide changes

### Markdown File Name Display
- **Functionality**: Display the name of the currently loaded markdown file in a modal dialog
- **Purpose**: Help presenters identify which presentation file they're currently viewing, especially useful when switching between multiple presentations
- **Trigger**: Press 'D' key to toggle the display
- **Progression**: Key press → Open modal dialog → Display current file name → Press 'D' again or close button to dismiss
- **Success criteria**: Shows correct file name for both default tutorial slides and user-loaded files (local or Git URLs), modal displays clearly with file icon and name, keyboard shortcut works reliably

## Edge Case Handling

- **Empty Slides**: Display placeholder message if markdown produces no slides
- **Malformed Markdown**: Gracefully handle and display markdown that doesn't parse cleanly
- **Single Slide**: Hide navigation arrows but maintain progress indicator
- **Long Content**: Apply scroll within slide if content exceeds viewport height
- **Rapid Navigation**: Debounce or queue rapid key presses to prevent broken animations
- **Image Handling**: Support markdown images with proper sizing and loading states
- **Invalid Git URLs**: Display clear error messages for unsupported or malformed Git URLs
- **Network Failures**: Show appropriate error messages when Git URL fetch fails due to network issues or file not found
- **Private Repositories**: Inform users that private repository files cannot be accessed (only public repos supported)

## Design Direction

The design should evoke confidence, clarity, and professionalism—like standing in front of a well-prepared presentation. Each slide should feel like a carefully crafted canvas with generous breathing room and impactful typography that commands attention without overwhelming.

## Color Selection

A clean, versatile presentation theme system with multiple color schemes inspired by classic presentation tools like easy-slides. Themes range from bright and minimal to dark and sophisticated, offering options for different contexts and preferences. All themes use OKLCH color space for perceptual uniformity.

**Available Themes:**

1. **Light** (Default) - Clean white base with subtle purple accents
   - Background: `oklch(0.98 0 0)` - Bright white
   - Primary: `oklch(0.45 0.15 260)` - Rich purple
   - Accent: `oklch(0.55 0.20 260)` - Deep purple for highlights
   - Foreground/Background: Dark gray on white - Ratio 10.5:1 ✓

2. **Dark** - Classic dark theme with purple highlights
   - Background: `oklch(0.15 0.01 260)` - Deep charcoal
   - Primary: `oklch(0.55 0.20 260)` - Vibrant purple
   - Accent: `oklch(0.65 0.22 260)` - Bright purple accents
   - Foreground/Background: White on charcoal - Ratio 12.3:1 ✓

3. **Beige** - Warm neutral base with earthy orange
   - Background: `oklch(0.95 0.02 80)` - Soft beige
   - Primary: `oklch(0.50 0.12 50)` - Warm brown
   - Accent: `oklch(0.60 0.15 40)` - Rich orange
   - Foreground/Background: Dark brown on beige - Ratio 9.2:1 ✓

4. **Sky** - Cool blue-tinted white with deep blue accents
   - Background: `oklch(0.96 0.02 220)` - Light sky blue
   - Primary: `oklch(0.50 0.18 240)` - Deep blue
   - Accent: `oklch(0.58 0.20 240)` - Vibrant blue
   - Foreground/Background: Navy on sky - Ratio 10.8:1 ✓

5. **Night** - Deep blue-black with cyan highlights
   - Background: `oklch(0.12 0.02 260)` - Midnight blue
   - Primary: `oklch(0.58 0.20 240)` - Bright blue
   - Accent: `oklch(0.68 0.22 200)` - Cyan accent
   - Foreground/Background: White on midnight - Ratio 13.5:1 ✓

6. **Moon** - Soft dark grey with purple tones
   - Background: `oklch(0.18 0.01 260)` - Cool grey
   - Primary: `oklch(0.52 0.10 280)` - Muted purple
   - Accent: `oklch(0.70 0.15 280)` - Soft lavender
   - Foreground/Background: White on grey - Ratio 11.9:1 ✓

7. **Serif** - Warm paper-like background with classic brown
   - Background: `oklch(0.97 0.01 60)` - Warm white
   - Primary: `oklch(0.42 0.08 40)` - Deep brown
   - Accent: `oklch(0.52 0.12 30)` - Rich chocolate
   - Foreground/Background: Dark brown on paper - Ratio 11.2:1 ✓

8. **Solarized** - Inspired by the classic Solarized Light palette
   - Background: `oklch(0.97 0.01 85)` - Warm cream
   - Primary: `oklch(0.52 0.14 220)` - Blue accent
   - Accent: `oklch(0.60 0.16 192)` - Cyan highlight
   - Foreground/Background: Blue-grey on cream - Ratio 9.5:1 ✓

All themes maintain WCAG AA contrast ratios for accessibility and use consistent structure for seamless switching.

## Font Selection

Typography should project confidence and readability at a distance, combining a strong geometric sans-serif for headings with a technical monospace for code.

- **Typographic Hierarchy**: 
  - H1 (Slide Title): Space Grotesk Bold/56px/tight letter-spacing (-0.02em)/line-height 1.1
  - H2 (Section Header): Space Grotesk SemiBold/42px/normal letter-spacing/line-height 1.2
  - H3 (Subsection): Space Grotesk Medium/32px/normal letter-spacing/line-height 1.3
  - Body Text: Inter Regular/24px/normal letter-spacing/line-height 1.6
  - Code: JetBrains Mono Regular/20px/normal letter-spacing/line-height 1.5

## Animations

Animations should enhance the presentation experience with purposeful, confident transitions that don't distract from content. Use sliding transitions (300ms ease-out) when changing slides to create spatial awareness. Apply subtle fade-in effects (200ms) to slide content for polish. Progress indicators should pulse gently (500ms) on slide change to confirm navigation. Navigation buttons show scale transforms (150ms) on hover for tactile feedback.

## Component Selection

- **Components**: 
  - Button (shadcn) for navigation controls with custom styling for minimal, icon-only appearance
  - Card (shadcn) for slide containers with custom full-screen modifications
  - Badge (shadcn) for progress indicator with custom accent styling
  - Separator (shadcn) for dividing content within slides
  - DropdownMenu (shadcn) for theme selector with color preview swatches
  - Dialog (shadcn) for file selector modal
  - Tabs (shadcn) for switching between local files and Git URL input
  - Input (shadcn) for Git URL text input
  - ScrollArea (shadcn) for file tree navigation
- **Customizations**: 
  - Custom `SlideContainer` component wrapping Card for full-screen behavior
  - Custom `MarkdownRenderer` component to parse and style markdown content
  - Custom `NavigationControls` component for arrow buttons positioned at screen edges
  - Custom `ProgressIndicator` component for slide counter badge
  - Custom `ThemeSelector` component with visual theme previews and persistence
  - Custom `FileSelector` component with dual modes (local file browser and Git URL loader)
  - Custom `PresentationTimer` component with elapsed time display and play/pause/reset controls
- **States**: 
  - Navigation buttons: Semi-transparent default, full opacity on hover, slight scale on active, hidden on first/last slides
  - Slide transitions: Fade + slide animation between slides, loading skeleton for markdown parsing
  - Progress indicator: Subtle pulse on change, persistent visibility
  - Theme selector: Glassmorphic button with palette icon, dropdown shows color swatches, selected theme highlighted
  - File selector: Modal dialog with tabs, loading state during file fetch, error state for invalid URLs
- **Icon Selection**: 
  - CaretLeft/CaretRight from Phosphor for navigation arrows
  - Palette from Phosphor for theme selector
  - FolderOpen from Phosphor for file selector button
  - Link from Phosphor for Git URL tab icon
  - Folder from Phosphor for local files tab icon
  - File from Phosphor for markdown file items
  - FileText from Phosphor for markdown name display
  - Play/Pause from Phosphor for timer controls
  - ArrowClockwise from Phosphor for timer reset
  - X or XCircle for potential exit/close functionality
- **Spacing**: 
  - Slide padding: p-16 (64px) on desktop, p-8 (32px) on mobile
  - Content spacing: space-y-6 for stacked elements within slides
  - Navigation button margins: mx-4 from screen edge
  - Progress indicator: mb-8 from bottom edge
- **Mobile**: 
  - Stack navigation controls at bottom on mobile with horizontal layout
  - Reduce font sizes by 30-40% on mobile breakpoint
  - Implement swipe gestures (left/right) for slide navigation
  - Adjust padding to p-6 for more content space
  - Progress indicator scales down and repositions to top-right corner
