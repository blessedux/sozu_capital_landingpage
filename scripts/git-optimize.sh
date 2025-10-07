#!/bin/bash

# Git Repository Optimization Script
# Run this script periodically to maintain optimal git performance

echo "🔧 Optimizing Git repository..."

# Clean up unnecessary files
echo "📁 Cleaning up untracked files..."
git clean -fd

# Remove cached files that should be ignored
echo "🗑️  Removing cached files that should be ignored..."
git rm -r --cached .next/ 2>/dev/null || true
git rm -r --cached node_modules/ 2>/dev/null || true
git rm --cached .DS_Store 2>/dev/null || true

# Garbage collect and optimize
echo "♻️  Running garbage collection..."
git gc --aggressive --prune=now

# Check repository size
echo "📊 Repository size:"
du -sh .git

# Show current status
echo "📋 Current git status:"
git status --porcelain

echo "✅ Git optimization complete!"
echo ""
echo "💡 Tips for faster commits:"
echo "   - Always check 'git status' before committing"
echo "   - Use 'git add .' carefully - check what's being added"
echo "   - Run this script weekly to maintain performance"
echo "   - Avoid committing large files or build artifacts"
