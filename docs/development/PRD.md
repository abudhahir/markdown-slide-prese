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

### PDF Export
- **Functionality**: Export all slides in the presentation to a high-quality PDF document
- **Purpose**: Enable users to share presentations offline, print handouts, or archive slide decks for distribution
- **Trigger**: Press 'P' key or click PDF icon button in top-right corner
- **Progression**: Click export button → Open export dialog → Click "Export PDF" → Generate PDF from each slide (with progress indicator) → Download PDF file → Success confirmation
- **Success criteria**: All slides exported with proper formatting and styling preserved, progress bar shows export status accurately, PDF downloads with correct filename (based on markdown filename), theme colors and fonts maintained in PDF output

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
- **PDF Export Failures**: Handle export errors gracefully with clear error messages if PDF generation fails or takes too long
- **Large Presentations**: Show loading/progress for PDF exports with many slides to prevent user confusion during longer exports

## Design Direction

The design should evoke confidence, clarity, and professionalism—like standing in front of a well-prepared presentation. Each slide should feel like a carefully crafted canvas with generous breathing room and impactful typography that commands attention without overwhelming.

## Color Selection

A refined theme system with three distinct aesthetic approaches (Solarized, Dracula, Code), each available in both light and dark variants. Each theme uses carefully calibrated OKLCH colors for perceptual uniformity and maintains excellent contrast ratios for accessibility.

**Solarized (Light & Dark)**: Classic warm-tinted palette inspired by Ethan Schoonover's timeless design
- **Solarized Light**:
  - Background: `oklch(0.98 0.008 85)` - Warm cream paper
  - Foreground: `oklch(0.35 0.04 192)` - Blue-grey text
  - Primary: `oklch(0.50 0.13 205)` - Deep blue
  - Accent: `oklch(0.58 0.15 175)` - Cyan highlight
  - Character: Scholarly, calm, refined
  - Foreground/Background: Blue-grey on cream - Ratio 9.8:1 ✓

- **Solarized Dark**:
  - Background: `oklch(0.16 0.025 192)` - Deep blue-black
  - Foreground: `oklch(0.86 0.015 85)` - Warm off-white
  - Primary: `oklch(0.60 0.16 205)` - Bright blue
  - Accent: `oklch(0.68 0.17 175)` - Vibrant cyan
  - Character: Sophisticated, low-glare, focused
  - Foreground/Background: Off-white on blue-black - Ratio 11.2:1 ✓

**Dracula (Light & Dark)**: Purple-magenta palette with bold personality and modern energy
- **Dracula Light**:
  - Background: `oklch(0.97 0.008 285)` - Cool white with purple tint
  - Foreground: `oklch(0.28 0.025 285)` - Deep purple-grey
  - Primary: `oklch(0.52 0.16 325)` - Rich magenta
  - Accent: `oklch(0.58 0.19 330)` - Vibrant pink
  - Character: Creative, energetic, contemporary
  - Foreground/Background: Purple-grey on white - Ratio 10.4:1 ✓

- **Dracula Dark**:
  - Background: `oklch(0.19 0.025 285)` - Dark purple-grey
  - Foreground: `oklch(0.90 0.01 285)` - Pure white
  - Primary: `oklch(0.68 0.20 325)` - Electric magenta
  - Accent: `oklch(0.72 0.22 330)` - Bright pink
  - Character: Bold, nocturnal, striking
  - Foreground/Background: White on dark purple - Ratio 11.8:1 ✓

**Code (Light & Dark)**: Technical monochrome palette optimized for developers
- **Code Light**:
  - Background: `oklch(0.98 0.005 240)` - Pure white with blue hint
  - Foreground: `oklch(0.27 0.015 240)` - Dark blue-grey
  - Primary: `oklch(0.46 0.14 260)` - Deep purple-blue
  - Accent: `oklch(0.54 0.18 190)` - Teal-cyan
  - Character: Minimal, technical, precise
  - Foreground/Background: Blue-grey on white - Ratio 11.0:1 ✓

- **Code Dark**:
  - Background: `oklch(0.15 0.012 240)` - Deep blue-black
  - Foreground: `oklch(0.90 0.008 240)` - Cool white
  - Primary: `oklch(0.62 0.17 260)` - Purple-blue
  - Accent: `oklch(0.66 0.19 190)` - Bright cyan
  - Character: Terminal-inspired, developer-focused, no-nonsense
  - Foreground/Background: White on blue-black - Ratio 12.5:1 ✓

## Font Selection

Typography varies per theme to reinforce each theme's distinct character, from classic serif for Solarized to modern sans-serif for Dracula to monospace for Code themes.

**Theme-Specific Font Pairings:**

- **Solarized (Light & Dark)**: 
  - Heading: Merriweather (serif) - Classic, academic feel with strong presence
  - Body: Source Sans 3 (sans-serif) - Clean, highly legible for long-form content
  - Code: Source Code Pro (monospace) - Professional, engineer-focused

- **Dracula (Light & Dark)**:
  - Heading: Poppins (sans-serif) - Modern, geometric with friendly curves
  - Body: Open Sans (sans-serif) - Neutral, optimized for screen reading
  - Code: Roboto Mono (monospace) - Technical with excellent readability

- **Code (Light & Dark)**:
  - Heading: Space Mono (monospace) - Technical, unique character
  - Body: IBM Plex Sans (sans-serif) - Corporate precision with warmth
  - Code: Fira Code (monospace) - Developer favorite with ligature support

- **Typographic Hierarchy** (consistent across themes):
  - H1 (Slide Title): Bold/base:36px→md:48px→lg:60px/tight letter-spacing/line-height 1.15
  - H2 (Section Header): SemiBold/base:30px→md:36px→lg:48px/normal letter-spacing/line-height 1.2
  - H3 (Subsection): Medium/base:24px→md:30px→lg:36px/normal letter-spacing/line-height 1.3
  - Body Text: Regular/base:18px→md:20px→lg:24px/normal letter-spacing/line-height 1.6
  - Code Inline: Regular/base:16px→md:18px→lg:20px/normal letter-spacing/line-height 1.6
  - Code Block: Regular/base:14px→md:16px→lg:18px/normal letter-spacing/line-height 1.5

## Animations

Animations should enhance the presentation experience with purposeful, confident transitions that don't distract from content. Use sliding transitions (300ms ease-out) when changing slides to create spatial awareness. Apply subtle fade-in effects (200ms) to slide content for polish. Progress indicators should pulse gently (500ms) on slide change to confirm navigation. Navigation buttons show scale transforms (150ms) on hover for tactile feedback.

## Component Selection

- **Components**: 
  - Button (shadcn) for navigation controls with custom styling for minimal, icon-only appearance
  - Card (shadcn) for slide containers with custom full-screen modifications
  - Badge (shadcn) for progress indicator with custom accent styling
  - Separator (shadcn) for dividing content within slides
  - DropdownMenu (shadcn) for theme selector with color preview swatches
  - Dialog (shadcn) for file selector modal and PDF export dialog
  - Progress (shadcn) for PDF export progress bar
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
  - Custom `PDFExportDialog` component with progress tracking and status display
- **States**: 
  - Navigation buttons: Semi-transparent default, full opacity on hover, slight scale on active, hidden on first/last slides
  - Slide transitions: Fade + slide animation between slides, loading skeleton for markdown parsing
  - Progress indicator: Subtle pulse on change, persistent visibility
  - Theme selector: Glassmorphic button with palette icon, dropdown shows color swatches, selected theme highlighted
  - File selector: Modal dialog with tabs, loading state during file fetch, error state for invalid URLs
  - PDF export: Modal dialog with export button, progress bar during generation, success/error states with appropriate messaging
- **Icon Selection**: 
  - CaretLeft/CaretRight from Phosphor for navigation arrows
  - Palette from Phosphor for theme selector
  - FolderOpen from Phosphor for file selector button
  - FilePdf from Phosphor for PDF export button
  - Link from Phosphor for Git URL tab icon
  - Folder from Phosphor for local files tab icon
  - File from Phosphor for markdown file items
  - FileText from Phosphor for markdown name display
  - Play/Pause from Phosphor for timer controls
  - ArrowClockwise from Phosphor for timer reset
  - Check from Phosphor for success confirmation
  - X from Phosphor for error states and close functionality
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
