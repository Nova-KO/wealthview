# 🚀 Automated Vercel Deployment Guide

This guide will help you set up automatic deployment of your Wealthwise application to Vercel using GitHub Actions.

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be in the `Nova-KO/wealthview` repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Vercel CLI**: Already installed in your project

## 🔧 Setup Steps

### Step 1: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `Nova-KO/wealthview`
4. Vercel will auto-detect your Vite + React setup
5. Click "Deploy"

### Step 2: Get Vercel Configuration

After the first deployment, you'll need these values from your Vercel project:

1. **Vercel Token**:
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Click "Create Token"
   - Name it "GitHub Actions"
   - Copy the token

2. **Project ID**:
   - Go to your project in Vercel Dashboard
   - Click "Settings" → "General"
   - Copy the "Project ID"

3. **Organization ID**:
   - In the same settings page
   - Copy the "Organization ID"

### Step 3: Add GitHub Secrets

1. Go to your GitHub repository: `https://github.com/Nova-KO/wealthview`
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Add these repository secrets:

```
VERCEL_TOKEN = your_vercel_token_here
VERCEL_ORG_ID = your_organization_id_here
VERCEL_PROJECT_ID = your_project_id_here
```

### Step 4: Test Automatic Deployment

1. Make a small change to your code
2. Commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push origin main
   ```
3. Go to your GitHub repository → "Actions" tab
4. You should see the deployment workflow running
5. Once complete, your site will be automatically updated on Vercel

## 🔄 How It Works

- **Trigger**: Every push to `main` branch or pull request
- **Build**: GitHub Actions builds your app using `npm run build`
- **Deploy**: Automatically deploys to Vercel production
- **URL**: Your site will be available at `https://wealthview.vercel.app` (or custom domain)

## 📝 Manual Deployment (if needed)

If you need to deploy manually:

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

## 🎯 Benefits

✅ **Automatic**: No manual deployment needed  
✅ **Fast**: Deploys in ~2-3 minutes  
✅ **Reliable**: Uses GitHub's infrastructure  
✅ **Preview**: Pull requests get preview deployments  
✅ **Rollback**: Easy to rollback to previous versions  

## 🆘 Troubleshooting

**Build fails?**
- Check the GitHub Actions logs
- Ensure all dependencies are in `package.json`
- Verify the build command works locally

**Deployment fails?**
- Verify Vercel secrets are correct
- Check Vercel project settings
- Ensure Vercel token has proper permissions

**Need help?**
- Check [Vercel Documentation](https://vercel.com/docs)
- Review [GitHub Actions Documentation](https://docs.github.com/en/actions) 