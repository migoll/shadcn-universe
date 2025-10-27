# Troubleshooting Guide - shadcn-universe

## 🐛 Common Issues & Solutions

### Issue: Blank Page on localhost:3000

**Symptoms:**
- Browser shows blank white page
- No errors in browser console
- Terminal may show network interface errors

**Solutions:**

1. **Clear Next.js cache and rebuild:**
```bash
rm -rf .next
bun run dev
```

2. **Check browser console:**
- Open DevTools (F12 or Cmd+Option+I)
- Look for JavaScript errors
- Check Network tab for failed requests

3. **Verify React Flow CSS is loaded:**
- The `app/globals.css` should have: `@import "reactflow/dist/style.css";`
- Check if the import is before other styles

4. **Hard refresh browser:**
- Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)
- Clear browser cache

### Issue: "command not found: bun"

**Symptoms:**
```bash
bun run dev
bash: bun: command not found
```

**Solution: Add Bun to your PATH**

The Bun installer doesn't automatically update your shell config in some cases.

**For zsh (default macOS shell):**
```bash
# Add to ~/.zshrc
echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.zshrc
echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.zshrc

# Reload shell
source ~/.zshrc

# Verify
bun --version
```

**For bash:**
```bash
# Add to ~/.bash_profile
echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bash_profile
echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bash_profile

# Reload shell
source ~/.bash_profile

# Verify
bun --version
```

**Or use the automatic setup script:**
```bash
./setup-bun.sh
source ~/.zshrc  # or source ~/.bash_profile
```

**Quick workaround - Use npm instead:**
```bash
npm run dev
```

### Issue: Network Interface Error (npm)

**Error:**
```
NodeError [SystemError]: A system error occurred: uv_interface_addresses returned Unknown system error 1
```

**Don't worry!** This error is **harmless**. The server still works fine!

**Solution 1: Ignore it**
- The error doesn't break anything
- Just visit http://localhost:3000
- The app will work normally

**Solution 2: Use Bun (no errors)**
```bash
# After setting up Bun PATH (see above)
bun install
bun run dev:bun
```

### Issue: Components Not Rendering

**Symptoms:**
- Components show as placeholder boxes
- "Component preview not yet implemented" message

**Solutions:**

1. **Check ComponentRenderer.tsx:**
- Verify component has a case in the switch statement
- Check import statements at the top

2. **Verify component is installed:**
```bash
ls components/ui/
```

3. **Check component registry:**
- Open `lib/component-registry.ts`
- Verify component metadata exists

### Issue: Property Editor Not Opening

**Symptoms:**
- Clicking components doesn't open side panel
- No selection feedback

**Solutions:**

1. **Check Zustand stores:**
- Open browser DevTools
- Look for React/Zustand state errors

2. **Verify node selection:**
- Check if `useCanvasStore` is working
- Look for `selectNode` action calls

3. **Check component ID matching:**
- Ensure node ID matches instance ID in store

### Issue: Export Code Not Working

**Symptoms:**
- Export button doesn't copy
- Generated code looks wrong

**Solutions:**

1. **Check clipboard permissions:**
- Browser may block clipboard access
- Allow clipboard permissions when prompted

2. **Verify exporter logic:**
- Check `ReactExporter.ts` or `VueExporter.ts`
- Ensure component has export case

3. **Test manually:**
```typescript
// In browser console
navigator.clipboard.writeText('test')
```

### Issue: Search/Command Palette Not Working

**Symptoms:**
- Cmd+K doesn't open palette
- Search shows no results

**Solutions:**

1. **Check keyboard listener:**
- Verify `CommandPalette.tsx` useEffect is running
- Check browser console for event listener errors

2. **Test keyboard shortcut:**
```javascript
// In browser console
document.addEventListener('keydown', (e) => {
  console.log('Key:', e.key, 'Meta:', e.metaKey, 'Ctrl:', e.ctrlKey);
});
```

3. **Verify Command component:**
- Check if `components/ui/command.tsx` exists
- Reinstall if missing: `bun add cmdk`

### Issue: Slow Performance / Laggy Canvas

**Symptoms:**
- Canvas is slow to pan/zoom
- UI feels sluggish
- High CPU usage

**Solutions:**

1. **Reduce number of visible components:**
- Zoom out to see fewer details
- Close property panel when not needed

2. **Check React Flow settings:**
- In `InfiniteCanvas.tsx`, ensure `minZoom` and `maxZoom` are set
- Consider adding `nodesDraggable={false}` to nodes

3. **Browser Performance:**
- Close other tabs
- Use Chrome/Edge for best React Flow performance
- Check browser task manager (Shift+Esc in Chrome)

4. **Optimize component rendering:**
```typescript
// Add to ComponentRenderer.tsx
import { memo } from 'react';
export const ComponentRenderer = memo(({ componentId, props }) => {
  // ... existing code
});
```

### Issue: Build Failures

**Symptoms:**
- `bun run build` fails
- TypeScript errors
- Module not found errors

**Solutions:**

1. **Check TypeScript errors:**
```bash
npx tsc --noEmit
```

2. **Clear cache and rebuild:**
```bash
rm -rf .next node_modules bun.lockb
bun install
bun run build
```

3. **Check import paths:**
- Verify all `@/` aliases resolve correctly
- Check `tsconfig.json` paths configuration

### Issue: Styling Issues / Components Look Wrong

**Symptoms:**
- Components have no styles
- Layout is broken
- Tailwind classes not working

**Solutions:**

1. **Verify Tailwind CSS setup:**
- Check `app/globals.css` has `@import "tailwindcss";`
- Ensure Tailwind v4 is installed

2. **Check CSS variables:**
- Open DevTools → Elements
- Verify `:root` has CSS variables
- Check for `--color-*` and `--radius` variables

3. **Rebuild Tailwind:**
```bash
rm -rf .next
bun run dev
```

4. **Check component UI files:**
```bash
ls components/ui/
# Should show 42 component files
```

## 🔍 Debug Mode

### Enable React DevTools
```bash
# Install React DevTools browser extension
# Chrome: https://chrome.google.com/webstore/detail/react-developer-tools/
```

### Enable Zustand DevTools
```typescript
// In any store file, add:
import { devtools } from 'zustand/middleware';

export const useCanvasStore = create<CanvasState>()(
  devtools(
    (set, get) => ({
      // ... existing state
    }),
    { name: 'CanvasStore' }
  )
);
```

### Enable Verbose Logging
```typescript
// Add to InfiniteCanvas.tsx or other components
useEffect(() => {
  console.log('Canvas Nodes:', nodes);
  console.log('Canvas Viewport:', viewport);
}, [nodes, viewport]);
```

## 🆘 Still Having Issues?

1. **Check GitHub Issues:**
   - Search for similar problems
   - Open a new issue with details

2. **Provide Debug Info:**
   - Node version: `node --version`
   - Bun version: `bun --version`
   - OS: macOS / Windows / Linux
   - Browser: Chrome / Safari / Firefox
   - Error messages (full stack trace)
   - Steps to reproduce

3. **Reset to Clean State:**
```bash
# Nuclear option - fresh start
rm -rf node_modules .next bun.lockb
bun install
bun run dev
```

## 📝 Getting Help

- Open an issue on GitHub
- Check the [README.md](./README.md) for setup instructions
- Review [QUICKSTART.md](./QUICKSTART.md) for usage guide
- Check [DEVELOPMENT_NOTES.md](./DEVELOPMENT_NOTES.md) for architecture info

---

**Pro Tip:** Most issues are resolved by clearing the cache (`rm -rf .next`) and restarting the dev server.

