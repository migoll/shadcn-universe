# 🚀 Quick Start - shadcn-universe

## Option 1: Start with npm (Easiest - Works Now!)

```bash
npm run dev
```

✅ That's it! Visit **http://localhost:3000**

---

## Option 2: Setup Bun (Faster - Requires Setup)

### Step 1: Add Bun to your PATH

You need to add Bun to your shell configuration file.

**For zsh (default on macOS):**

```bash
# Add these lines to ~/.zshrc
echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.zshrc
echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.zshrc

# Reload your shell
source ~/.zshrc
```

**For bash:**

```bash
# Add these lines to ~/.bash_profile
echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bash_profile
echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.bash_profile

# Reload your shell
source ~/.bash_profile
```

### Step 2: Verify Bun Works

```bash
bun --version
# Should show: 1.3.1 or similar
```

### Step 3: Install & Run

```bash
bun install
bun run dev:bun
```

---

## Automatic Bun Setup (Alternative)

We have a setup script that does everything automatically:

```bash
# Run the setup script
./setup-bun.sh

# Then reload your shell
source ~/.zshrc  # or source ~/.bash_profile

# Verify
bun --version

# Run the app
bun install
bun run dev:bun
```

---

## 🎯 What You'll See

Once the server starts (npm or bun), visit **http://localhost:3000** to see:

1. **Left Sidebar** - All 42 components organized by category
2. **Canvas** - Interactive component grid with pan/zoom
3. **MiniMap** - Bottom-right for navigation
4. **Controls** - Bottom-left for zoom

### Try It Out:
- 🖱️ Click any component to open the property editor
- 🔍 Press `Cmd+K` to open command palette
- ⚡ Change variants, sizes, colors in real-time
- 📋 Export code in React or Vue

---

## ⚠️ Troubleshooting

### Issue: "command not found: bun"

**Solution:** Follow the PATH setup above, then restart your terminal.

### Issue: Blank page

**Solution:**
```bash
# Clear cache and restart
rm -rf .next
npm run dev
# Then hard refresh browser (Cmd+Shift+R)
```

### Issue: Network interface error (npm)

**Error:**
```
uv_interface_addresses returned Unknown system error 1
```

**Solution:** This error is harmless. The server still works!
Just ignore it and visit http://localhost:3000

Or use Bun to avoid it entirely.

---

## 📊 npm vs Bun

| Feature | npm | Bun |
|---------|-----|-----|
| Speed | Normal | 3-10x faster |
| Installation | Pre-installed | Requires setup |
| Network errors | Sometimes | No |
| Works now? | ✅ Yes | ⚠️ Needs PATH setup |

---

## 💡 Recommendation

1. **Start with npm** - It works right now without setup
2. **Switch to Bun later** - Once you've verified everything works

---

## 🆘 Still Having Issues?

Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions.

---

**Ready to start?**

```bash
npm run dev
```

Then open **http://localhost:3000** 🎉

