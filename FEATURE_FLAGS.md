# Feature Flags

This document explains how to enable/disable features in DesignCrit.

---

## URL Analysis Feature

**Status**: Currently **DISABLED** (for Vercel Free Tier compatibility)

### What This Feature Does
Allows users to enter a website URL and automatically capture a screenshot for analysis using Playwright + Chromium.

### Why It's Disabled
- Requires 15-30 seconds total execution time (screenshot + AI analysis)
- Vercel Free Tier only allows 10-second function timeout
- Requires Vercel Pro ($20/month) for 60-second timeout

### How to Re-Enable

**Step 1: Upgrade to Vercel Pro**
1. Go to your Vercel dashboard
2. Upgrade your account to Pro plan ($20/month)

**Step 2: Enable the Feature Flag**
Edit `app/page.tsx` and change line 11:

```typescript
// Change from:
const ENABLE_URL_ANALYSIS = false;

// To:
const ENABLE_URL_ANALYSIS = true;
```

**Step 3: Update Vercel Configuration**
Edit `vercel.json` to use Pro tier limits:

```json
{
  "functions": {
    "app/api/analyze/route.ts": {
      "maxDuration": 60,
      "memory": 3008
    }
  }
}
```

**Step 4: Deploy**
```bash
git add .
git commit -m "feat: Enable URL analysis feature"
git push
```

Vercel will automatically redeploy with the URL input option visible.

---

## What Happens When Enabled

Users will see:
- ✅ Toggle buttons to switch between "Website URL" and "Upload Screenshot"
- ✅ URL input field with validation
- ✅ Automatic screenshot capture for entered URLs
- ✅ Full-page screenshot analysis

The backend code is **already there** and ready to use - it's just hidden in the UI.

---

## Backend Code Status

All URL analysis code remains intact:
- ✅ `app/api/analyze/route.ts` - Handles both URL and screenshot inputs
- ✅ `lib/screenshot.ts` - Playwright screenshot capture with serverless Chromium
- ✅ `vercel.json` - Currently configured for free tier (10s timeout, 1GB memory)

**To enable URL analysis**: Flip the feature flag AND update `vercel.json` to Pro tier settings (see below)!

---

## Cost Comparison

### Free Tier (Current Setup)
- **Cost**: $0/month for Vercel
- **Features**: Screenshot upload only
- **Limitations**: 10s timeout, 1GB memory
- **OpenAI API**: ~$0.05-0.10 per analysis

### Pro Tier (With URL Analysis)
- **Cost**: $20/month for Vercel Pro
- **Features**: Screenshot upload + URL analysis
- **Benefits**: 60s timeout, 3GB memory, custom domains
- **OpenAI API**: ~$0.05-0.10 per analysis

---

## Testing the Feature

After enabling, test with these URLs:
- ✅ Simple site: `https://example.com`
- ✅ Design portfolio: `https://studiopimmit.com`
- ✅ Complex site: `https://vercel.com`

Watch the function logs in Vercel dashboard to verify it completes within 60s.

---

## Troubleshooting

### "Function execution timed out" after enabling
- You may still be on Free Tier (10s timeout)
- Verify Vercel Pro upgrade completed
- Check function logs for exact execution time

### Feature flag changed but UI not updating
- Clear browser cache
- Verify deployment succeeded on Vercel
- Check that you're viewing the production URL (not local dev)

### Screenshots failing on Vercel
- Check Vercel function logs for Chromium errors
- Verify serverless Chromium is properly configured
- Test locally first: `npm run dev`

---

## Questions?

See `DEPLOYMENT.md` for full deployment guide and troubleshooting tips.
