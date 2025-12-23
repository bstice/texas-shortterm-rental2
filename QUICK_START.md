# Quick Start: Push to GitHub

## Step 1: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Repository name: `texas-shortterm-rental2`
3. Description: "Texas Short-Term Rental Guest Guidebook Website"
4. Choose Public or Private
5. **IMPORTANT**: Don't check any boxes (no README, .gitignore, or license)
6. Click **"Create repository"**

## Step 2: Copy Repository URL

After creating, copy the HTTPS URL from GitHub (it will look like):
```
https://github.com/YOUR_USERNAME/texas-shortterm-rental2.git
```

## Step 3: Run Setup Script

Run this command (replace with your actual URL):

```bash
cd /Users/bstice/texas-shortterm-rental2
./setup-remote.sh https://github.com/YOUR_USERNAME/texas-shortterm-rental2.git
```

Or manually:

```bash
cd /Users/bstice/texas-shortterm-rental2
git remote add origin https://github.com/YOUR_USERNAME/texas-shortterm-rental2.git
git push -u origin 001-property-basics-nav
```

## That's It! 🎉

Your code is now on GitHub and ready to deploy to Vercel!

See `DEPLOYMENT.md` for Vercel deployment instructions.

