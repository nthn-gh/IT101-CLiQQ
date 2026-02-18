# Deployment Guide - GitHub Pages

## 🚀 Quick Start

Your app is configured for automatic deployment to GitHub Pages!

## Setup Steps

### 1. Create GitHub Repository

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - CLiQQ Vue App"

# Create a new repository on GitHub (go to https://github.com/new)
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. That's it! The workflow will auto-deploy on every push to `main`

### 3. Access Your App

After the workflow completes (2-3 minutes), your app will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## 🔄 Automatic Deployment

Every time you push to the `main` branch, GitHub Actions will:
1. Install dependencies
2. Build your app
3. Deploy to GitHub Pages

Check deployment status: **Actions** tab in your GitHub repository

## 📱 HTTPS & Camera Access

✅ **GitHub Pages provides HTTPS by default** - your QR scanner will work perfectly!
- No certificate warnings
- Camera access works on all devices
- Secure connection for mobile browsers

## Local Development

Your local dev setup with mkcert is still intact:

```powershell
# Development with HTTPS (no warnings)
npm run dev

# Access at:
# https://localhost:3000
# https://YOUR_IP:3000
```

## Manual Deployment (Alternative)

If you prefer manual deployment instead of automatic:

```powershell
# Build and preview locally
npm run build
npm run preview

# Install gh-pages for manual deployment
npm install -D gh-pages

# Deploy manually
npm run deploy
```

## Environment Variables

The build automatically uses the correct base path for GitHub Pages:
- **Local dev**: `/` (root path)
- **GitHub Pages**: `/YOUR_REPO_NAME/` (repository name)

## Troubleshooting

### Build Fails
```powershell
# Check TypeScript errors locally
npm run type-check

# Fix linting issues
npm run lint
```

### 404 Errors on Deployed Site
- Verify **Settings → Pages → Source** is set to **GitHub Actions**
- Check the workflow completed successfully in the **Actions** tab
- Wait 5-10 minutes for DNS propagation

### Camera Not Working
- GitHub Pages uses HTTPS automatically ✅
- Ensure camera permissions are granted in browser
- Check browser compatibility (Chrome, Safari, Edge supported)

## Repository Structure

```
.github/workflows/deploy.yml  ← GitHub Actions deployment workflow
dist/                          ← Build output (gitignored)
src/                           ← Source code
vite.config.ts                 ← Vite config with base path support
```

## Next Steps

1. Create your GitHub repository
2. Push your code
3. Enable GitHub Pages with GitHub Actions
4. Share your app URL! 🎉
