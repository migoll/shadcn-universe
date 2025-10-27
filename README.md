# shadcn-universe 🌌

An interactive, infinite canvas explorer for all shadcn-ui components. Visualize, customize, and export components in multiple frameworks with live preview.

![shadcn-universe](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)

## ✨ Features

### 🎨 Interactive Canvas
- **Infinite pan/zoom canvas** powered by React Flow
- **42+ shadcn-ui components** pre-loaded and organized by category
- **Visual component grid** with categories: Form, Data Display, Navigation, Overlays, Feedback, Layout, and Advanced
- **Real-time rendering** of all components with live props

### 🔧 Property Editor
- **Slide-out panel** with comprehensive property controls
- **Live editing** of variants, sizes, colors, text, and more
- **Type-aware inputs**: strings, numbers, booleans, enums, colors
- **Instant preview** updates as you modify properties

### 📤 Code Export System
- **Multiple frameworks**: React/Next.js and Vue
- **Multiple styling options**: Tailwind CSS or vanilla CSS
- **Syntax-highlighted** code preview
- **One-click copy** to clipboard
- **Production-ready** code generation

### ⌨️ Keyboard Shortcuts
- `Cmd/Ctrl + K` - Open command palette
- `Delete/Backspace` - Delete selected component
- `Cmd/Ctrl + D` - Duplicate selected component

### 🔍 Search & Discovery
- **Component library sidebar** with category filtering
- **Command palette** for quick component access
- **Real-time search** across all components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ OR Bun 1.0+ (recommended)
- npm, yarn, or bun

### Installation

**Option 1: Using Bun (Recommended - Faster)**
```bash
# Install Bun if you haven't
curl -fsSL https://bun.sh/install | bash

# Clone the repository
git clone https://github.com/yourusername/shadcn-universe.git

# Navigate to project
cd shadcn-universe

# Install dependencies
bun install

# Run development server
bun run dev
```

**Option 2: Using npm**
```bash
# Clone the repository
git clone https://github.com/yourusername/shadcn-universe.git

# Navigate to project
cd shadcn-universe

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the canvas.

## 📁 Project Structure

```
shadcn-universe/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main canvas page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn-ui components (42 components)
│   ├── canvas/
│   │   ├── InfiniteCanvas.tsx      # React Flow canvas
│   │   ├── ComponentNode.tsx       # Custom node component
│   │   └── ComponentRenderer.tsx   # Dynamic component renderer
│   ├── editor/
│   │   ├── PropertyPanel.tsx       # Property editor panel
│   │   ├── PropEditor.tsx          # Individual prop editors
│   │   └── CodePreview.tsx         # Code preview & export
│   ├── sidebar/
│   │   ├── ComponentLibrary.tsx    # Component browser
│   │   └── CommandPalette.tsx      # Cmd+K palette
│   └── exporters/
│       ├── ReactExporter.ts        # React code generation
│       ├── VueExporter.ts          # Vue code generation
│       └── CSSConverter.ts         # Tailwind to CSS converter
├── lib/
│   ├── component-registry.ts   # Component metadata registry
│   ├── prop-definitions.ts     # Prop type definitions
│   └── utils.ts               # Utility functions
└── store/
    ├── canvas-store.ts         # Canvas state (Zustand)
    ├── component-store.ts      # Component instances
    └── editor-store.ts         # Editor panel state
```

## 🎯 Component Categories

### Form Components (10)
Button, Input, Textarea, Checkbox, Radio Group, Switch, Select, Slider, Label, Form

### Data Display (8)
Card, Table, Badge, Avatar, Separator, Skeleton, Progress, Tooltip

### Navigation (6)
Tabs, Navigation Menu, Menubar, Breadcrumb, Pagination, Command

### Overlays (8)
Dialog, Alert Dialog, Sheet, Drawer, Popover, Dropdown Menu, Context Menu, Hover Card

### Feedback (3)
Alert, Toast (Sonner), Aspect Ratio

### Layout (4)
Accordion, Collapsible, Scroll Area, Resizable

### Advanced (3)
Calendar, Carousel, Chart

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Components**: shadcn-ui (42 components)
- **Canvas**: React Flow
- **State Management**: Zustand
- **Icons**: Lucide React
- **UI Primitives**: Radix UI

## 📋 Roadmap

### Phase 1: Foundation ✅
- [x] Project setup with Next.js, React, TypeScript
- [x] Install all 42 shadcn-ui components
- [x] Component registry system
- [x] Infinite canvas with React Flow
- [x] Dynamic component renderer

### Phase 2: Editing & Export ✅
- [x] Property editor panel
- [x] Live prop updates
- [x] React code exporter
- [x] Vue code exporter
- [x] CSS converter
- [x] Code preview & copy

### Phase 3: UX Enhancements ✅
- [x] Component library sidebar
- [x] Command palette (Cmd+K)
- [x] Keyboard shortcuts
- [x] Delete/duplicate functionality

### Phase 4: Authentication & Persistence (Coming Soon)
- [ ] NextAuth.js integration
- [ ] User authentication (Google, GitHub, Email)
- [ ] Custom variant system
- [ ] Save/load canvas states
- [ ] Database integration (PostgreSQL/Supabase)

### Phase 5: Custom Variants (Coming Soon)
- [ ] Save custom component variants
- [ ] Variant dropdown selector
- [ ] "Custom #1, #2, etc." naming
- [ ] Update/delete variants
- [ ] Per-user variant storage

### Phase 6: Polish (Coming Soon)
- [ ] Dark mode toggle
- [ ] Component search improvements
- [ ] Export to CodeSandbox/StackBlitz
- [ ] Component usage analytics
- [ ] Performance optimizations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🙏 Acknowledgments

- [shadcn-ui](https://ui.shadcn.com/) for the amazing component library
- [React Flow](https://reactflow.dev/) for the canvas functionality
- [Radix UI](https://www.radix-ui.com/) for the primitive components
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Built with ❤️ using Next.js and shadcn-ui**
