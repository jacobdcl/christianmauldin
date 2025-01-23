# Ultimate Deployment Guide

This guide will take you from local development to a fully deployed website with content management.

## 1. GitHub Setup (Free)

1. Create a GitHub account at [github.com](https://github.com)

2. Create a new repository:
   - Go to GitHub
   - Click "New repository"
   - Name it `christianmauldin`
   - Keep it public (free)
   - Don't initialize with any files

3. Push your code:
   ```bash
   # In your project folder
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/christianmauldin.git
   git push -u origin main
   ```

## 2. Vercel Setup (Free)

1. Create Vercel account:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Choose the free "Hobby" plan

2. Deploy main website:
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add Environment Variables:
     ```
     VITE_SANITY_TOKEN=your_token_here
     ```
   - Deploy

## 3. Sanity Studio Deployment (Free)

1. Deploy Sanity Studio:
   ```bash
   cd studio
   npm run deploy
   ```

2. Set up CORS in Sanity:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Go to API settings
   - Add CORS origins:
     - Add `http://localhost:3000` (development)
     - Add your Vercel URL (e.g., `https://christianmauldin.vercel.app`)
     - Add your custom domain when ready
   - Allow credentials
   - Save

## 4. Domain Setup

### Option A: Transfer from Squarespace
1. Unlock domain at Squarespace
2. Get transfer authorization code
3. Initiate transfer in Vercel
4. Wait up to 7 days

### Option B: Keep Domain at Squarespace (Recommended)
1. In Vercel:
   - Go to project settings → Domains
   - Add your domain
   - Copy the DNS records

2. In Squarespace:
   - Go to Domains settings
   - Manage DNS records
   - Add A and CNAME records from Vercel
   - Wait for DNS propagation (up to 48 hours)

## 5. Client Access Setup

1. Create Sanity account for client:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Click "Team & Plan"
   - Click "Invite Member"
   - Enter client's email
   - Set role to "Editor" (can edit content but not change structure)

2. Send client these details:
   ```
   Studio URL: https://christianmauldin.sanity.studio
   Email: [their email]
   Password: [they'll set this up]
   ```

## 6. Verify Everything Works

1. Check main website:
   - Visit your domain
   - Test all pages
   - Verify images load
   - Test responsive design

2. Check Sanity Studio:
   - Log in as client
   - Try adding content
   - Verify content appears on main site

## 7. Free Tier Limits

Vercel (Hobby Plan):
- 100GB bandwidth/month
- Unlimited personal projects
- Automatic HTTPS
- Global CDN

Sanity (Free Plan):
- 100k API requests/month
- 10GB bandwidth/month
- 5GB assets storage
- 2 datasets
- 3 users

These limits are more than enough for a photography portfolio.

## 8. Maintenance

The site will automatically:
- Deploy when you push to GitHub
- Update content when published in Sanity
- Handle SSL certificates
- Serve from global CDN

You only need to:
- Keep dependencies updated (every few months)
- Monitor Sanity/Vercel usage (rarely hits limits)
- Help client with content questions

## 9. Troubleshooting

If the site isn't working:

1. Check Vercel deployment:
   - Go to Vercel dashboard
   - Look for failed deployments
   - Check build logs

2. Check Sanity connection:
   - Verify environment variables
   - Check CORS settings
   - Test Sanity Studio login

3. Check domain:
   - Verify DNS records
   - Check SSL certificate
   - Test with different browsers

## Support Resources

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Sanity Documentation: [sanity.io/docs](https://sanity.io/docs)
- React Documentation: [react.dev](https://react.dev)

Remember: Both Vercel and Sanity have excellent free support through their Discord communities if you need help. 