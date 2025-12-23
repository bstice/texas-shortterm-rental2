#!/bin/bash

# Script to add GitHub remote and push code
# Usage: ./setup-remote.sh YOUR_REPOSITORY_URL

set -e

REPO_URL="$1"

if [ -z "$REPO_URL" ]; then
    echo "❌ Error: Repository URL required"
    echo ""
    echo "Usage: ./setup-remote.sh YOUR_REPOSITORY_URL"
    echo ""
    echo "Example:"
    echo "  ./setup-remote.sh https://github.com/username/texas-shortterm-rental2.git"
    echo ""
    exit 1
fi

echo "🚀 Setting up remote repository..."
echo ""

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo "⚠️  Remote 'origin' already exists:"
    git remote get-url origin
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin "$REPO_URL"
        echo "✅ Remote updated"
    else
        echo "❌ Aborted"
        exit 1
    fi
else
    git remote add origin "$REPO_URL"
    echo "✅ Remote added: $REPO_URL"
fi

echo ""
echo "📤 Pushing code to remote..."
echo ""

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"
echo ""

# Push to remote
git push -u origin "$CURRENT_BRANCH"

echo ""
echo "✅ Success! Your code has been pushed to GitHub"
echo ""
echo "🌐 Repository URL: $REPO_URL"
echo ""
echo "Next steps:"
echo "1. Visit your repository on GitHub"
echo "2. Deploy to Vercel: https://vercel.com/new"
echo "3. Import your GitHub repository"
echo ""

