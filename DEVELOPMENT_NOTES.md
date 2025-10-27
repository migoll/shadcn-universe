# Development Notes - shadcn-universe

## 🎯 Current Status

The application is **fully functional** with core features complete:
- ✅ Infinite canvas with 42 components
- ✅ Property editing with live updates
- ✅ Code export (React, Vue, Tailwind, CSS)
- ✅ Search and command palette
- ✅ Keyboard shortcuts

**Version**: 0.1.0 (MVP Complete)

## 🔮 Future Development Roadmap

### Phase 4: Authentication & Database (Priority: High)

**Blocked by**: NextAuth.js doesn't yet support Next.js 16

**When unblocked**:
1. Install NextAuth.js or alternative (Clerk, Auth0)
2. Set up authentication providers:
   - Google OAuth
   - GitHub OAuth
   - Email/Password
3. Create protected routes
4. Set up database (PostgreSQL with Prisma or Supabase)

**Database Schema**:
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  customVariants CustomVariant[]
  canvasStates  CanvasState[]
}

model CustomVariant {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  componentId   String
  variantName   String
  props         Json
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model CanvasState {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  name          String
  canvasData    Json
  lastModified  DateTime @updatedAt
}
```

### Phase 5: Custom Variants System

**Implementation Steps**:

1. **Add Variant Selector to Property Panel**
```typescript
// In PropertyPanel.tsx
<Select value={currentVariant} onValueChange={setCurrentVariant}>
  <SelectItem value="default">Default</SelectItem>
  {customVariants.map(v => (
    <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
  ))}
</Select>
```

2. **Add Save Variant Button**
```typescript
const saveVariant = async () => {
  const variantName = prompt('Enter variant name:') || `Custom #${count}`;
  await fetch('/api/variants', {
    method: 'POST',
    body: JSON.stringify({
      componentId: component.id,
      variantName,
      props: currentProps
    })
  });
};
```

3. **Create API Routes**
- `app/api/variants/route.ts` - GET, POST variants
- `app/api/variants/[id]/route.ts` - GET, PUT, DELETE variant

4. **Add Variant Store**
```typescript
// store/variant-store.ts
interface VariantState {
  variants: Record<string, CustomVariant[]>;
  currentVariant: string | null;
  loadVariants: (componentId: string) => Promise<void>;
  saveVariant: (variant: CustomVariant) => Promise<void>;
  deleteVariant: (id: string) => Promise<void>;
}
```

### Phase 6: Enhanced Export Features

**Ideas**:

1. **Export to CodeSandbox**
```typescript
const exportToCodeSandbox = () => {
  const files = {
    'package.json': generatePackageJson(),
    'App.tsx': generateCode(),
    'index.html': generateHTML()
  };
  
  // Use CodeSandbox API
  fetch('https://codesandbox.io/api/v1/sandboxes/define', {
    method: 'POST',
    body: JSON.stringify({ files })
  });
};
```

2. **Bulk Export**
- Export all components at once
- Generate zip file with all components
- Include package.json and README

3. **Export Templates**
- Page layouts with multiple components
- Common patterns (form, dashboard, etc.)
- Customizable templates

### Phase 7: Collaboration Features

1. **Share Canvas**
- Generate shareable URL
- Public/private canvas
- View-only or edit mode

2. **Team Workspaces**
- Shared component variants
- Team-wide custom components
- Role-based permissions

3. **Comments & Annotations**
- Add notes to components
- Discuss component choices
- Version history

## 🔧 Technical Improvements

### Performance Optimizations

1. **Virtual Scrolling for Sidebar**
```typescript
import { FixedSizeList } from 'react-window';
// Render only visible components
```

2. **Lazy Load Component Previews**
```typescript
const ComponentRenderer = lazy(() => import('./ComponentRenderer'));
<Suspense fallback={<Skeleton />}>
  <ComponentRenderer />
</Suspense>
```

3. **Debounce Prop Updates**
```typescript
const debouncedUpdate = useMemo(
  () => debounce((props) => updateComponent(props), 300),
  []
);
```

### Code Quality

1. **Add Unit Tests**
```bash
npm install --save-dev @testing-library/react vitest
```

Test coverage targets:
- Component registry: 100%
- Exporters: 90%
- Stores: 80%
- Components: 70%

2. **Add E2E Tests**
```bash
npm install --save-dev playwright
```

Test scenarios:
- Add component to canvas
- Edit props and verify updates
- Export code and verify format
- Use keyboard shortcuts

3. **Add Storybook**
```bash
npx storybook@latest init
```

Document all custom components.

### Developer Experience

1. **Hot Reload for Component Registry**
- Watch `component-registry.ts`
- Auto-update canvas on changes

2. **Component Playground**
- Dedicated route `/playground`
- Test individual components
- Debug renderer issues

3. **Dev Tools**
- Redux DevTools for Zustand
- React Query DevTools (if added)
- Performance monitoring

## 🐛 Known Issues & Fixes

### Issue 1: NextAuth Compatibility
**Problem**: NextAuth doesn't support Next.js 16
**Workaround**: Wait for update or use alternative (Clerk, Auth0)
**Status**: Monitoring NextAuth repository

### Issue 2: Some Components Need Scroll
**Problem**: Large components (Table, Calendar) overflow nodes
**Fix**: Add max-height and scroll to ComponentNode
```typescript
<div className="max-h-[500px] overflow-auto">
  <ComponentRenderer />
</div>
```

### Issue 3: CSS Converter Limited
**Problem**: Only ~50 Tailwind classes covered
**Fix**: Expand `CSSConverter.ts` with more mappings
**Priority**: Medium

## 📝 Code Conventions

### File Naming
- Components: PascalCase (`ComponentRenderer.tsx`)
- Utilities: camelCase (`component-registry.ts`)
- Stores: kebab-case with suffix (`canvas-store.ts`)

### Component Structure
```typescript
'use client'; // If uses hooks/client features

import { ... } from '...';

interface Props {
  // Props interface
}

export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks first
  const state = useState();
  
  // Functions
  const handleClick = () => {};
  
  // Render
  return <div>...</div>;
};
```

### Store Structure
```typescript
import { create } from 'zustand';

interface State {
  // State properties
  data: any;
  
  // Actions
  setData: (data: any) => void;
}

export const useStore = create<State>((set, get) => ({
  // Initial state
  data: null,
  
  // Actions
  setData: (data) => set({ data }),
}));
```

## 🎨 Design System

### Colors
- Primary: Blue (canvas selection)
- Secondary: Gray (borders, text)
- Success: Green (copy confirmation)
- Danger: Red (delete, errors)
- Muted: Light gray (disabled states)

### Spacing
- Base unit: 4px (0.25rem)
- Common: 2, 4, 8, 12, 16, 24, 32px

### Typography
- Headings: font-semibold
- Body: font-normal
- Labels: font-medium, text-sm
- Code: font-mono

## 🔐 Security Considerations

### Future Implementation
1. **Input Sanitization**: Sanitize all user inputs
2. **XSS Prevention**: Escape code in exports
3. **CSRF Protection**: Add tokens to forms
4. **Rate Limiting**: Limit API requests
5. **Authentication**: Secure routes and API

## 📊 Analytics Ideas

### Track User Behavior
- Most used components
- Most exported components
- Average props modified per component
- Popular variant combinations
- Export format preferences

### Component Usage
```typescript
// In ComponentRenderer
useEffect(() => {
  analytics.track('component_rendered', {
    componentId,
    props
  });
}, [componentId]);
```

## 🌍 Internationalization

### Future i18n Support
```typescript
// Install next-intl
npm install next-intl

// Add translations
{
  "en": {
    "components.button": "Button",
    "export.copy": "Copy to clipboard"
  },
  "da": {
    "components.button": "Knap",
    "export.copy": "Kopiér til udklipsholder"
  }
}
```

## 🎓 Learning Resources

### For Contributors
- [React Flow Docs](https://reactflow.dev/)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [shadcn-ui Docs](https://ui.shadcn.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Useful Patterns
- Compound Components (Card, Dialog, etc.)
- Render Props (Tooltip, Popover)
- Custom Hooks (usePropEditor, useExport)
- State Management (Zustand selectors)

## 🚀 Deployment Checklist

### Pre-Deploy
- [ ] Run `npm run build` successfully
- [ ] Fix all TypeScript errors
- [ ] Fix all ESLint warnings
- [ ] Test all major features
- [ ] Check responsive design
- [ ] Optimize images and assets
- [ ] Add environment variables
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (Google Analytics, Plausible)

### Deploy Targets
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** (for self-hosting)

### Post-Deploy
- [ ] Verify all routes work
- [ ] Test component rendering
- [ ] Test exports
- [ ] Check performance metrics
- [ ] Monitor error logs
- [ ] Set up uptime monitoring

---

**Last Updated**: October 27, 2025
**Maintainer**: Development Team

