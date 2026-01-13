# Deploy to Render

This React TypeScript Job Application Tracker is configured for deployment on Render.

## Prerequisites
- GitHub repository with your code
- Render account (free tier available)

## Deployment Steps

### 1. Push to GitHub
Make sure your code is pushed to a GitHub repository:
```bash
git add .
git commit -m "Add Render configuration"
git push origin main
```

### 2. Create Render Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Static Site**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `reactts-job-application-tracker` (or your preferred name)
   - **Root Directory**: Leave empty (root of repo)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: `18` or higher

### 3. Environment Variables (if needed)
If your app requires environment variables, add them in the Render dashboard under **Environment** tab.

### 4. Deploy
Click **Create Static Site** to start the deployment. Render will:
- Install dependencies (`npm install`)
- Build the app (`npm run build`)
- Deploy the `dist` folder to their CDN

## Configuration Files

### render.json
The `render.json` file in the root directory contains:
- Service type: Static site
- Build command: `npm run build`
- Publish path: `dist`
- SPA routing configuration

### package.json
Updated with production build script for Render compatibility.

## Post-Deployment
- Your app will be available at `https://your-service-name.onrender.com`
- Automatic deployments are enabled for pushes to your main branch
- Check the Render dashboard for deployment logs if issues occur

## Troubleshooting
- **Build fails**: Check that all dependencies are in package.json
- **404 errors**: The render.json includes SPA routing to handle React Router
- **Slow loading**: Render's free tier has cold starts, paid tiers are faster
