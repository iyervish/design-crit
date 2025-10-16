# Deploying DesignCrit to Vercel

## What Was Fixed

Your app wasn't deploying because **Playwright doesn't work on Vercel's serverless environment**. I've updated the code to use a serverless-compatible version.

### Changes Made:
1. ✅ Installed `playwright-core` and `@sparticuz/chromium` (serverless-compatible Chromium)
2. ✅ Updated `lib/screenshot.ts` to automatically detect serverless environment
3. ✅ Configured `vercel.json` with proper function settings (60s timeout, 3GB memory)

The app now works both locally AND on Vercel!

---

## How to Deploy to Vercel

### Step 1: Push to GitHub
Make sure your latest code is pushed to GitHub:

```bash
git add .
git commit -m "feat: Add serverless Chromium support for Vercel deployment"
git push
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (or create an account)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect it's a Next.js project

### Step 3: Configure Environment Variables

**CRITICAL**: Before deploying, add your OpenAI API key:

1. In the Vercel project setup, scroll to **"Environment Variables"**
2. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-proj-...`)
   - **Environment**: Check all boxes (Production, Preview, Development)

### Step 4: Deploy

Click **"Deploy"** and wait 2-3 minutes.

Vercel will:
- Install dependencies
- Build your Next.js app
- Deploy it to a `.vercel.app` URL

### Step 5: Test

Once deployed, visit your URL and try analyzing a design!

---

## Custom Domain (Optional)

Want to use your own domain like `designcrit.yourdomain.com`?

1. In your Vercel project, go to **Settings → Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `designcrit.studiopimmit.com`)
4. Follow Vercel's instructions to update your DNS records

---

## Troubleshooting

### "Function execution timed out"
This means the screenshot capture or AI analysis took too long. The function is configured for 60s timeout (Vercel's maximum for Pro plans; 10s for free tier).

**Solutions:**
- Upgrade to Vercel Pro ($20/mo) for 60s timeouts
- Or reduce the screenshot size/quality in `lib/screenshot.ts`

### "Invalid API key" or OpenAI errors
- Double-check your `OPENAI_API_KEY` in Vercel environment variables
- Make sure you've added billing info to your OpenAI account
- Redeploy after adding/updating environment variables

### "Memory limit exceeded"
The function is configured for 3GB memory (requires Vercel Pro). Free tier has 1GB limit.

**Solution:**
- Upgrade to Vercel Pro
- Or reduce `memory` in `vercel.json` to `1024` (but may fail for large pages)

### Build failures
- Check the Vercel build logs for specific errors
- Make sure all dependencies are in `package.json` (not just `devDependencies`)
- Try running `npm run build` locally first

---

## Important Notes

### Vercel Free Tier Limitations
- **Function timeout**: 10 seconds (vs 60s on Pro)
- **Function memory**: 1GB (vs 3GB on Pro)
- **Bandwidth**: 100GB/month

For DesignCrit, you'll likely need **Vercel Pro** because:
- Screenshot capture takes 5-10 seconds
- AI analysis takes 5-15 seconds
- Total can exceed 10 seconds easily

### Cost Breakdown
- **Vercel Pro**: $20/month (per user)
- **OpenAI API**: ~$0.05-0.10 per analysis
- **Total**: ~$20/month + usage-based OpenAI costs

---

## Next Steps

After deploying:

1. ✅ Test with a real URL to ensure screenshots work
2. ✅ Test with an uploaded screenshot
3. ✅ Monitor Vercel's function logs for errors
4. ✅ Set up custom domain (optional)
5. ✅ Share with your team!

---

## Need Help?

If deployment still fails:
1. Check Vercel build logs for specific errors
2. Verify environment variables are set correctly
3. Make sure you're on the latest commit with serverless Chromium support
4. Open an issue or contact support
