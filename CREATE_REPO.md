# Create GitHub Repository - Step by Step

## Quick Steps

### 1. Create Repository on GitHub

1. **Go to GitHub**: Open [github.com/new](https://github.com/new) in your browser
2. **Repository name**: `texas-shortterm-rental2` (or your preferred name)
3. **Description** (optional): "Texas Short-Term Rental Guest Guidebook Website"
4. **Visibility**: Choose Public or Private
5. **Important**: 
   - ❌ **DO NOT** check "Add a README file"
   - ❌ **DO NOT** check "Add .gitignore"
   - ❌ **DO NOT** check "Choose a license"
   - (We already have all these files)
6. **Click "Create repository"**

### 2. Copy Repository URL

After creating, GitHub will show you a page with setup instructions. Copy the repository URL:
- HTTPS: `https://github.com/YOUR_USERNAME/texas-shortterm-rental2.git`
- SSH: `git@github.com:YOUR_USERNAME/texas-shortterm-rental2.git`

### 3. Add Remote and Push

Once you have the repository URL, run these commands:

```bash
cd /Users/bstice/texas-shortterm-rental2

# Add the remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/texas-shortterm-rental2.git

# Push your code
git push -u origin 001-property-basics-nav
```

### Alternative: Push to Main Branch

If you prefer to push to `main`:

```bash
cd /Users/bstice/texas-shortterm-rental2

# Switch to main and merge
git checkout main
git merge 001-property-basics-nav

# Add remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/texas-shortterm-rental2.git

# Push to main
git push -u origin main
```

## After Pushing

Once your code is on GitHub, you can:

1. **Deploy to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Vite
   - Set environment variables
   - Deploy!

2. **View your code on GitHub**:
   - Visit `https://github.com/YOUR_USERNAME/texas-shortterm-rental2`

## Need Help?

If you run into any issues:
- Make sure you're logged into GitHub
- Verify the repository name doesn't already exist
- Check that you copied the correct URL (HTTPS or SSH)

