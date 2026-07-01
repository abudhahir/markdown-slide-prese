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
- **Functionality**: Arrow keys (left/right or up/down), spacebar, and escape key support
- **Purpose**: Standard presentation navigation without mouse
- **Trigger**: Keyboard event while presentation is focused
- **Progression**: Key press → Map to navigation action → Execute slide change or exit
- **Success criteria**: All standard presentation shortcuts work reliably

### Full-Screen Mode
- **Functionality**: Display slides in full viewport with no surrounding UI chrome
- **Purpose**: Maximize content visibility and minimize distractions
- **Trigger**: Component renders in full-screen container
- **Progression**: Component mount → Apply full-screen styles → Center slide content
- **Success criteria**: Slides fill viewport on all screen sizes, content properly centered and scaled

## Edge Case Handling

- **Empty Slides**: Display placeholder message if markdown produces no slides
- **Malformed Markdown**: Gracefully handle and display markdown that doesn't parse cleanly
- **Single Slide**: Hide navigation arrows but maintain progress indicator
- **Long Content**: Apply scroll within slide if content exceeds viewport height
- **Rapid Navigation**: Debounce or queue rapid key presses to prevent broken animations
- **Image Handling**: Support markdown images with proper sizing and loading states

## Design Direction

The design should evoke confidence, clarity, and professionalism—like standing in front of a well-prepared presentation. Each slide should feel like a carefully crafted canvas with generous breathing room and impactful typography that commands attention without overwhelming.

## Color Selection

A bold, high-contrast presentation theme with a sophisticated dark base and vibrant accent colors.

- **Primary Color**: Deep Indigo `oklch(0.25 0.08 265)` - Communicates authority and professionalism, used for slide backgrounds
- **Secondary Colors**: Slate Gray `oklch(0.35 0.02 265)` for subtle UI elements like navigation controls; Rich Purple `oklch(0.45 0.12 285)` for code blocks and emphasis
- **Accent Color**: Electric Cyan `oklch(0.75 0.15 195)` - High-energy highlight for interactive elements, CTAs, and progress indicators
- **Foreground/Background Pairings**: 
  - Primary Background (Deep Indigo #2A2852): White text (#FFFFFF) - Ratio 9.8:1 ✓
  - Secondary Background (Slate Gray #4A4A5E): White text (#FFFFFF) - Ratio 7.2:1 ✓
  - Accent (Electric Cyan #5DD9E8): Deep Indigo (#2A2852) - Ratio 6.1:1 ✓
  - Code blocks (Rich Purple #654FA3): White text (#FFFFFF) - Ratio 5.8:1 ✓

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
- **Customizations**: 
  - Custom `SlideContainer` component wrapping Card for full-screen behavior
  - Custom `MarkdownRenderer` component to parse and style markdown content
  - Custom `NavigationControls` component for arrow buttons positioned at screen edges
  - Custom `ProgressIndicator` component for slide counter badge
- **States**: 
  - Navigation buttons: Semi-transparent default, full opacity on hover, slight scale on active, hidden on first/last slides
  - Slide transitions: Fade + slide animation between slides, loading skeleton for markdown parsing
  - Progress indicator: Subtle pulse on change, persistent visibility
- **Icon Selection**: 
  - CaretLeft/CaretRight from Phosphor for navigation arrows
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
