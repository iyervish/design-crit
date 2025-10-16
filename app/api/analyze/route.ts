import { NextRequest, NextResponse } from 'next/server';
import { captureScreenshot, imageToBase64 } from '@/lib/screenshot';
import { analyzeDesign } from '@/lib/analyze';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds timeout for Vercel

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const type = formData.get('type') as 'url' | 'screenshot';

    let imageBase64: string;
    let sourceValue: string;

    if (type === 'url') {
      const url = formData.get('value') as string;

      if (!url) {
        return NextResponse.json(
          { error: 'URL is required' },
          { status: 400 }
        );
      }

      // Validate URL
      try {
        new URL(url);
      } catch {
        return NextResponse.json(
          { error: 'Invalid URL format' },
          { status: 400 }
        );
      }

      // Capture screenshot
      console.log('Capturing screenshot for:', url);
      const screenshotBuffer = await captureScreenshot(url);
      imageBase64 = imageToBase64(screenshotBuffer);
      sourceValue = url;
    } else if (type === 'screenshot') {
      const file = formData.get('screenshot') as File;

      if (!file) {
        return NextResponse.json(
          { error: 'Screenshot file is required' },
          { status: 400 }
        );
      }

      // Convert file to base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imageBase64 = imageToBase64(buffer);
      sourceValue = file.name;
    } else {
      return NextResponse.json(
        { error: 'Invalid request type' },
        { status: 400 }
      );
    }

    // Analyze the design
    console.log('Analyzing design...');
    const analysis = await analyzeDesign(imageBase64, type, sourceValue);

    // Generate a unique ID for this analysis
    const id = randomBytes(16).toString('hex');

    // Save the result to disk (in production, you'd use a database)
    const resultsDir = join(process.cwd(), 'public', 'results');
    await mkdir(resultsDir, { recursive: true });

    const resultPath = join(resultsDir, `${id}.json`);
    await writeFile(resultPath, JSON.stringify(analysis, null, 2));

    // Also save the screenshot
    const screenshotsDir = join(process.cwd(), 'public', 'screenshots');
    await mkdir(screenshotsDir, { recursive: true });

    const screenshotPath = join(screenshotsDir, `${id}.png`);
    await writeFile(screenshotPath, Buffer.from(imageBase64, 'base64'));

    return NextResponse.json({
      id,
      success: true,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to analyze design',
      },
      { status: 500 }
    );
  }
}
