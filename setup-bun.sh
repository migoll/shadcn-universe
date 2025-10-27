#!/bin/bash

# Setup script for Bun on macOS
echo "🚀 Setting up Bun for shadcn-universe..."

# Check if Bun is already installed
if command -v bun &> /dev/null; then
    echo "✅ Bun is already installed: $(bun --version)"
else
    echo "📦 Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
fi

# Add to shell configuration
BUN_INSTALL="$HOME/.bun"
BUN_PATH="export BUN_INSTALL=\"\$HOME/.bun\"\nexport PATH=\"\$BUN_INSTALL/bin:\$PATH\""

# Detect shell
if [ -n "$ZSH_VERSION" ]; then
    SHELL_CONFIG="$HOME/.zshrc"
    SHELL_NAME="zsh"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_CONFIG="$HOME/.bash_profile"
    SHELL_NAME="bash"
else
    SHELL_CONFIG="$HOME/.profile"
    SHELL_NAME="shell"
fi

echo "📝 Detected shell: $SHELL_NAME"
echo "📝 Config file: $SHELL_CONFIG"

# Check if Bun path is already in config
if ! grep -q "BUN_INSTALL" "$SHELL_CONFIG" 2>/dev/null; then
    echo "➕ Adding Bun to $SHELL_CONFIG..."
    echo "" >> "$SHELL_CONFIG"
    echo "# Bun" >> "$SHELL_CONFIG"
    echo -e "$BUN_PATH" >> "$SHELL_CONFIG"
    echo "✅ Added Bun to $SHELL_CONFIG"
else
    echo "✅ Bun path already in $SHELL_CONFIG"
fi

# Source the config to apply changes
echo "🔄 Applying changes..."
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Verify Bun is accessible
if [ -x "$BUN_INSTALL/bin/bun" ]; then
    echo "✅ Bun installed successfully!"
    echo "📍 Location: $BUN_INSTALL/bin/bun"
    echo "📦 Version: $($BUN_INSTALL/bin/bun --version)"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "To use Bun immediately, run:"
    echo "  source $SHELL_CONFIG"
    echo ""
    echo "Or open a new terminal window."
    echo ""
    echo "Then run:"
    echo "  bun install"
    echo "  bun run dev:bun"
else
    echo "❌ Bun installation failed. Please install manually:"
    echo "   curl -fsSL https://bun.sh/install | bash"
fi

