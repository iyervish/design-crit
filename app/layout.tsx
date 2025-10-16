import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'DesignCrit - Expert Design Critique Tool',
  description: 'Get expert-level design critiques. Analyze websites and screenshots for aesthetic cohesion, typography, color, and more.',
  keywords: 'design critique, design review, UI analysis, UX evaluation, design quality, design tools',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
