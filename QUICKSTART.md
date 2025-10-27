# Quick Start Guide - shadcn-universe

## 🚀 Getting Started in 3 Minutes

### 1. Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 2. Navigate the Canvas

- **Pan**: Click and drag on the canvas background
- **Zoom**: Use mouse wheel or trackpad pinch
- **Select Component**: Click on any component node
- **Minimap**: Use the mini-map in the bottom-right for quick navigation

### 3. Edit Components

1. Click on any component to select it
2. Property panel slides in from the right
3. Modify properties:
   - **Variants**: Change button style (default, destructive, outline, etc.)
   - **Sizes**: Adjust component size (sm, default, lg)
   - **Colors**: Pick colors with color picker
   - **Text**: Edit labels and content
   - **Boolean Props**: Toggle switches for disabled, checked, etc.

### 4. Export Code

In the property panel:
1. Choose **Framework**: React or Vue
2. Choose **Styling**: Tailwind CSS or vanilla CSS
3. Click **Copy** button to copy code to clipboard
4. Paste into your project

### 5. Add Components

**Method 1: Sidebar**
- Browse components by category in the left sidebar
- Click any component name to add it to the canvas

**Method 2: Command Palette**
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
- Search for a component
- Press Enter to add it

### 6. Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open command palette |
| `Delete` or `Backspace` | Delete selected component |
| `Cmd/Ctrl + D` | Duplicate selected component |
| `Mouse Wheel` | Zoom in/out |

## 📁 Project Structure

```
shadcn-universe/
├── app/                    # Next.js app directory
├── components/
│   ├── ui/                # shadcn components (42 total)
│   ├── canvas/            # Canvas & rendering logic
│   ├── editor/            # Property editor & code preview
│   ├── sidebar/           # Component library & command palette
│   └── exporters/         # Code generation (React, Vue, CSS)
├── lib/                   # Utilities & component registry
└── store/                 # Zustand state management
```

## 🎯 Available Components (42 Total)

### Form Components
Button, Input, Textarea, Checkbox, Radio Group, Switch, Select, Slider, Label, Form

### Data Display
Card, Table, Badge, Avatar, Separator, Skeleton, Progress, Tooltip

### Navigation
Tabs, Navigation Menu, Menubar, Breadcrumb, Pagination, Command

### Overlays
Dialog, Alert Dialog, Sheet, Drawer, Popover, Dropdown Menu, Context Menu, Hover Card

### Feedback
Alert, Toast (Sonner), Aspect Ratio

### Layout
Accordion, Collapsible, Scroll Area, Resizable

### Advanced
Calendar, Carousel, Chart

## 🔧 Customization

### Add Your Own Component

1. **Add to Registry** (`lib/component-registry.ts`):
```typescript
{
  id: "my-component",
  name: "MyComponent",
  displayName: "My Component",
  category: "form",
  description: "My custom component",
  props: [
    { name: "variant", type: "enum", options: ["default", "custom"], default: "default" }
  ],
  defaultProps: { variant: "default" }
}
```

2. **Add Renderer** (`components/canvas/ComponentRenderer.tsx`):
```typescript
case 'my-component':
  return <MyComponent {...props} />;
```

3. **Add Exporter** (`components/exporters/ReactExporter.ts`):
```typescript
case 'my-component':
  jsx = `<MyComponent${propsString} />`;
  break;
```

## 🐛 Troubleshooting

### Canvas Not Loading
- Check browser console for errors
- Ensure all dependencies installed: `npm install`
- Try clearing `.next` cache: `rm -rf .next`

### Component Not Rendering
- Check if component is in `ComponentRenderer.tsx`
- Verify import statement is correct
- Check component metadata in registry

### Export Not Working
- Check if component has export logic in `ReactExporter.ts` or `VueExporter.ts`
- Verify clipboard permissions in browser

## 📚 Next Steps

- Explore all 42 components on the canvas
- Try different variants and props
- Export code and use in your own project
- Customize the canvas layout
- Add your own components

## 🤝 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Open an issue on GitHub
- Review the component registry for available props

---

Happy exploring! 🌌

