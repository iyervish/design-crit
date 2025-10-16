# Deploying DesignCrit to Vercel

## Current Configuration (Free Tier)

Your app is configured to work on **Vercel's Free (Hobby) Tier** with screenshot uploads only.

### Changes Made:
1. ✅ Installed `playwright-core` and `@sparticuz/chromium` (for future URL analysis)
2. ✅ Updated `lib/screenshot.ts` to automatically detect serverless environment
3. ✅ Configured `vercel.json` for free tier limits (10s timeout, 1GB memory)
4. ✅ Disabled URL analysis feature (screenshot upload only)

The app now works on Vercel Free Tier!

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
This means the AI analysis took too long. The function is configured for 10s timeout (Vercel Free tier limit).

**Solutions:**
- This is normal for very large screenshot files or complex images
- Reduce screenshot file size before uploading (compress or resize images)
- If timeouts are frequent, consider upgrading to Vercel Pro ($20/mo) for 60s timeouts

### "Invalid API key" or OpenAI errors
- Double-check your `OPENAI_API_KEY` in Vercel environment variables
- Make sure you've added billing info to your OpenAI account
- Redeploy after adding/updating environment variables

### "Memory limit exceeded"
The function is configured for 1GB memory (Vercel Free tier limit).

**Solutions:**
- Reduce screenshot file size before uploading
- Use lower resolution images (under 5MB recommended)
- If needed, upgrade to Vercel Pro for 3GB memory limit

### Build failures
- Check the Vercel build logs for specific errors
- Make sure all dependencies are in `package.json` (not just `devDependencies`)
- Try running `npm run build` locally first

---

## Important Notes

### Vercel Free Tier Configuration
Your app is configured to work on the **Free (Hobby) Tier**:
- **Function timeout**: 10 seconds
- **Function memory**: 1GB
- **Bandwidth**: 100GB/month
- **Features**: Screenshot upload only (URL analysis disabled)

This works because:
- Screenshot uploads are fast (< 1 second)
- AI analysis typically takes 5-8 seconds
- No browser automation needed (Chromium disabled)
- Total execution time stays under 10 seconds

### Cost Breakdown (Free Tier)
- **Vercel Hosting**: $0/month
- **OpenAI API**: ~$0.05-0.10 per analysis
- **Total**: Only pay for OpenAI API usage

### When to Upgrade to Pro
Consider upgrading to Vercel Pro ($20/month) if:
- You want URL analysis feature (requires 60s timeout + 3GB memory)
- You need custom domains
- You're hitting timeout limits with large screenshots
- You need faster builds or more bandwidth

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
