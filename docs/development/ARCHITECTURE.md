# Markdown Slides - Component Architecture

## Component Hierarchy

```
App.tsx (Root)
└── SlidePresentation (Main Container)
    ├── SlideContainer (Individual Slide Display)
    │   └── MarkdownRenderer (Content Renderer)
    ├── NavigationControls (Arrow Buttons)
    └── ProgressIndicator (Slide Counter)
```

## Core Components

### 1. SlidePresentation (`/components/slides/SlidePresentation.tsx`)
**Purpose**: Main presentation controller and orchestrator

**Responsibilities**:
- Parse markdown into slides array
- Manage current slide index state
- Handle keyboard navigation (Arrow keys, Space)
- Handle touch/swipe gestures
- Coordinate child components

**State**:
- `slides`: Array of parsed slide objects
- `currentIndex`: Currently displayed slide
- `direction`: Animation direction (1 for forward, -1 for backward)

### 2. SlideContainer (`/components/slides/SlideContainer.tsx`)
**Purpose**: Wrapper for individual slide with animations

**Responsibilities**:
- Animate slide transitions using Framer Motion
- Provide slide layout and spacing
- Handle overflow for long content

**Props**:
- `slide`: Slide object with content
- `direction`: Animation direction

### 3. MarkdownRenderer (`/components/slides/MarkdownRenderer.tsx`)
**Purpose**: Parse and render markdown content

**Responsibilities**:
- Convert markdown string to HTML using `marked` library
- Apply custom styling classes
- Handle dynamic content updates

**Props**:
- `content`: Raw markdown string

### 4. NavigationControls (`/components/slides/NavigationControls.tsx`)
**Purpose**: Visual navigation interface

**Responsibilities**:
- Display previous/next buttons
- Show/hide based on boundary conditions
- Provide visual feedback on hover/click

**Props**:
- `onPrevious`: Previous slide handler
- `onNext`: Next slide handler
- `canGoPrevious`: Boolean for first slide
- `canGoNext`: Boolean for last slide

### 5. ProgressIndicator (`/components/slides/ProgressIndicator.tsx`)
**Purpose**: Display current position in deck

**Responsibilities**:
- Show "X / Y" format
- Styled as badge with accent colors

**Props**:
- `current`: Current slide number (1-indexed)
- `total`: Total slide count

## Utilities

### Markdown Parser (`/lib/markdown-parser.ts`)
**Function**: `parseMarkdownToSlides(markdown: string): Slide[]`

**Logic**:
1. Split markdown by `---` delimiter (slide separator)
2. Trim and filter empty sections
3. Create slide objects with unique IDs
4. Return array of slides

**Type**: 
```typescript
interface Slide {
  id: string
  content: string
  rawContent: string
}
```

## Styling Approach

### Theme (index.css)
- Deep indigo background (`oklch(0.25 0.08 265)`)
- Electric cyan accents (`oklch(0.75 0.15 195)`)
- Custom markdown content styles with responsive typography
- Typography scale: H1 (56px) → H2 (42px) → H3 (32px) → Body (24px)

### Fonts
- **Headings**: Space Grotesk (Bold, SemiBold, Medium)
- **Body**: Inter (Regular, Medium)
- **Code**: JetBrains Mono (Regular)

### Animations
- Slide transitions: 300ms ease-out with slide + fade
- Button hover: Scale to 110% in 150ms
- Progress badge: Subtle transitions on update

## Navigation Methods

### Keyboard Controls
- `Arrow Right` / `Arrow Down` / `Space`: Next slide
- `Arrow Left` / `Arrow Up`: Previous slide

### Touch Controls
- Swipe right: Previous slide
- Swipe left: Next slide
- Threshold: 50px minimum swipe distance

### Mouse Controls
- Click left arrow button: Previous slide
- Click right arrow button: Next slide

## Best Practices Implemented

1. **Separation of Concerns**: Each component has a single, clear responsibility
2. **Prop Drilling Prevention**: Minimal prop passing, localized state
3. **Accessibility**: ARIA labels on navigation buttons, keyboard support
4. **Performance**: Memoized callbacks with useCallback, minimal re-renders
5. **Responsive Design**: Mobile-first with breakpoint adjustments
6. **Error Handling**: Empty state when no slides present
7. **Type Safety**: Full TypeScript coverage with interfaces
8. **Animation Polish**: Framer Motion for smooth, purposeful transitions
9. **Event Cleanup**: Proper removal of event listeners on unmount
10. **Touch Support**: Native touch events for mobile gesture support

## Usage Example

```tsx
import { SlidePresentation } from '@/components/slides/SlidePresentation'

const markdown = `
# First Slide
Content here

---

# Second Slide
More content

---

# Third Slide
Final slide
`

function App() {
  return <SlidePresentation markdown={markdown} />
}
```

## Customization Points

### Adding New Features
1. **Slide Notes**: Add speaker notes to Slide interface
2. **Timers**: Add presentation timer to ProgressIndicator
3. **Thumbnails**: Create slide overview component
4. **Themes**: Add theme prop to customize colors
5. **Export**: Add PDF/HTML export functionality

### Extending Markdown Support
- Custom syntax for slide backgrounds
- Image slide templates
- Two-column layouts
- Video embeds

### Animation Variants
- Fade only (no slide)
- Zoom in/out
- Rotate transitions
- 3D flip effects
