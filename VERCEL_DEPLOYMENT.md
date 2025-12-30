# Vercel Deployment Guide for Financial Assistant

This guide will help you set up automated deployment for your Next.js finance app using Vercel. Follow these steps to ensure a production-ready deployment that matches the roadmap and quality standards.

---

## 1. Connect Your Repository to Vercel

1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click **New Project** and import your finance app repository.
3. Select the correct repository and click **Import**.
4. Vercel will auto-detect Next.js and TypeScript configuration.

## 2. Configure Build Settings

- **Framework Preset:** Next.js
- **Root Directory:** `/`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## 3. Set Environment Variables

Add the following environment variables in the Vercel dashboard under **Project Settings > Environment Variables**:

- `NEXT_PUBLIC_API_URL` (your backend API endpoint)
- `NODE_ENV` (set to `production`)
- Any other variables listed in `.env.local` (see README for details)

> **Tip:** Never commit secrets to your repository. Always use Vercel's environment variable manager.

## 4. Automatic Deployments

- Every push to `main` (or your production branch) will trigger a deployment.
- Preview deployments are created for each pull request.
- Vercel provides deployment logs and status in the dashboard.

## 5. Custom Domains

- Add your custom domain in **Project Settings > Domains**.
- Follow Vercel's instructions to update DNS records.

## 6. Post-Deployment Checklist

- Test the live site for all user flows and edge cases.
- Verify environment variables are set correctly.
- Check for console errors and warnings.
- Confirm mobile responsiveness and accessibility.
- Review performance and loading states.

## 7. Troubleshooting

- See [Vercel Docs](https://vercel.com/docs) for help with build errors, environment variables, and custom domains.
- For Next.js-specific issues, see [Next.js Deployment](https://nextjs.org/docs/deployment).

---

## Example Environment Variables for ~$60k/year Household

```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_DEFAULT_HOUSEHOLD_INCOME=60000
```

---

## Updating This Guide

- Update this file if your deployment process changes.
- Document any new environment variables or build steps.

---

**Maintainer:** [Your Name]
**Last Updated:** 2025-12-30
