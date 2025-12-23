# Deployment Guide: Vercel

This guide covers deploying the guidebook application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier available)
2. **Git Repository**: Code should be in a Git repository (GitHub, GitLab, or Bitbucket)
3. **Environment Variables**: OpenAI API key for chatbot functionality

## Current Configuration

The project is already configured for Vercel deployment:

- ✅ `vercel.json` - Vercel configuration file
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Framework: `vite`
- ✅ API routes configured for serverless functions
- ✅ SPA rewrites configured

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push code to Git repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import project in Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Vercel will auto-detect the Vite framework

3. **Configure build settings** (should auto-detect, but verify):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Root Directory**: `guidebook-app` (if repo root is parent directory)

4. **Set environment variables**
   - Go to Project Settings → Environment Variables
   - Add:
     - `OPENAI_API_KEY` - Your OpenAI API key (for chatbot)
     - `OPENAI_MODEL` (optional) - Default: `gpt-3.5-turbo`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to project directory**
   ```bash
   cd guidebook-app
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   - Follow prompts to link project
   - For production: `vercel --prod`

5. **Set environment variables**
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add OPENAI_MODEL  # Optional
   ```

## Configuration Details

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "vite",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "functions": {
    "api/chat/route.ts": {
      "maxDuration": 30
    }
  }
}
```

### Build Output

- **Output Directory**: `dist/`
- **Static Assets**: Automatically served from `dist/`
- **API Routes**: Serverless functions in `api/` directory
- **SPA Routing**: All routes rewrite to `index.html`

## Environment Variables

### Required

- `OPENAI_API_KEY` - OpenAI API key for chatbot functionality

### Optional

- `OPENAI_MODEL` - OpenAI model to use (default: `gpt-3.5-turbo`)

### Setting in Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable for:
   - **Production**
   - **Preview** (optional, for PR previews)
   - **Development** (optional, for local dev)

## Features Deployed

### ✅ Guidebook Website
- All pages and content
- Responsive design
- SEO optimization

### ✅ AI Chatbot
- Serverless API route: `/api/chat`
- Rate limiting (10 requests/minute)
- Streaming responses
- Context-aware conversations

### ✅ PDF Export
- Client-side PDF generation
- Image embedding
- Markdown rendering
- Progress tracking

## Post-Deployment Checklist

- [ ] Verify site loads correctly
- [ ] Test navigation between pages
- [ ] Test chatbot functionality
- [ ] Test PDF download feature
- [ ] Verify images load correctly
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Verify HTTPS is enabled (automatic)
- [ ] Check build logs for warnings

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## Monitoring & Analytics

### Vercel Analytics (Optional)

1. Go to Project Settings → Analytics
2. Enable Vercel Analytics (free tier available)
3. View performance metrics and user insights

### Error Monitoring

- Check Vercel Function Logs for API errors
- Monitor build logs for deployment issues
- Use browser console for client-side errors

## Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Verify Node.js version** (should be 18.x or 20.x)
3. **Check dependencies** - ensure all are in `package.json`
4. **Verify build command** - should be `npm run build`

### API Routes Return 404

1. **Verify API route exists** in `api/` directory
2. **Check function configuration** in `vercel.json`
3. **Verify environment variables** are set
4. **Check function logs** in Vercel dashboard

### PDF Generation Fails

1. **Check browser console** for errors
2. **Verify images are accessible** (CORS issues)
3. **Check network tab** for failed requests
4. **Test locally first** with `npm run build && npm run preview`

### Images Not Loading

1. **Verify image paths** are correct
2. **Check public directory** structure
3. **Ensure images are committed** to Git
4. **Verify build includes** images in `dist/`

## Performance Optimization

### Already Configured

- ✅ Code splitting (React lazy loading)
- ✅ Image optimization (manual)
- ✅ Bundle optimization (manual chunks)
- ✅ Source maps for debugging

### Additional Optimizations

- Consider enabling Vercel Image Optimization
- Enable edge caching for static assets
- Monitor bundle size with Vercel Analytics

## Continuous Deployment

Vercel automatically deploys:
- **Production**: On push to `main` branch
- **Preview**: On every pull request
- **Branch**: On push to any branch (optional)

## Rollback

If deployment has issues:

1. Go to Deployments in Vercel dashboard
2. Find previous working deployment
3. Click "..." menu → "Promote to Production"

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Project Issues**: Check project repository

