import { chromium } from 'playwright';

export async function captureScreenshot(url: string): Promise<Buffer> {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
    });

    const page = await context.newPage();

    // Navigate to the URL
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Take full page screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: true,
    });

    await context.close();
    return screenshot;
  } finally {
    await browser.close();
  }
}

export function imageToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}

export function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(base64, 'base64');
}
