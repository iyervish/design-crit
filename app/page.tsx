'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpTrayIcon, LinkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// FEATURE FLAG: Enable URL analysis when you upgrade to Vercel Pro
// Change this to true to re-enable URL input (requires Vercel Pro for 60s timeout)
const ENABLE_URL_ANALYSIS = false;

export default function Home() {
  const [inputType, setInputType] = useState<'url' | 'screenshot'>('screenshot');
  const [url, setUrl] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData();

      if (inputType === 'url') {
        if (!url.trim()) {
          throw new Error('Please enter a valid URL');
        }
        formData.append('type', 'url');
        formData.append('value', url);
      } else {
        if (!screenshot) {
          throw new Error('Please upload a screenshot');
        }
        formData.append('type', 'screenshot');
        formData.append('screenshot', screenshot);
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze design');
      }

      const result = await response.json();

      // Redirect to results page with the analysis ID
      router.push(`/results/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return;
      }
      setScreenshot(file);
      setError('');
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-10">
        <div className="container py-4">
          <Link
            href="/"
            className="text-3xl font-heading font-black text-primary"
          >
            Studio Pimmit
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 border-b border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="heading-xl mb-6">
              Visual Design Critique
            </h1>
            <p className="text-lg text-text mb-8 max-w-2xl mx-auto leading-relaxed">
              {ENABLE_URL_ANALYSIS
                ? 'Upload a screenshot or enter a URL to receive a comprehensive design evaluation.'
                : 'Upload a screenshot to receive a comprehensive design evaluation.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Input Section */}
      <section className="section container">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-8"
          >
            {/* Input Type Toggle */}
            {ENABLE_URL_ANALYSIS && (
              <div className="flex gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setInputType('url')}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
                    inputType === 'url'
                      ? 'bg-primary text-white shadow-glow-primary'
                      : 'bg-background-light text-text-muted hover:bg-background-dark'
                  }`}
                >
                  <LinkIcon className="w-5 h-5" />
                  Website URL
                </button>
                <button
                  type="button"
                  onClick={() => setInputType('screenshot')}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
                    inputType === 'screenshot'
                      ? 'bg-primary text-white shadow-glow-primary'
                      : 'bg-background-light text-text-muted hover:bg-background-dark'
                  }`}
                >
                  <ArrowUpTrayIcon className="w-5 h-5" />
                  Upload Screenshot
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {ENABLE_URL_ANALYSIS && inputType === 'url' ? (
                <div>
                  <label htmlFor="url" className="block text-sm font-medium mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                  <p className="mt-2 text-sm text-text-muted">
                    Enter the full URL of the website you want to analyze
                  </p>
                </div>
              ) : (
                <div>
                  <label htmlFor="screenshot" className="block text-sm font-medium mb-2">
                    Upload Screenshot
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="screenshot"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="screenshot"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg hover:border-primary cursor-pointer transition-all bg-background-light hover:bg-background-dark"
                    >
                      {screenshot ? (
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-success/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium">{screenshot.name}</p>
                          <p className="text-xs text-text-muted mt-1">
                            {(screenshot.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <>
                          <ArrowUpTrayIcon className="w-12 h-12 text-text-muted mb-3" />
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-text-muted mt-1">PNG, JPG, GIF up to 10MB</p>
                        </>
                      )}
                    </label>
                  </div>
                  {screenshot && (
                    <button
                      type="button"
                      onClick={() => setScreenshot(null)}
                      className="mt-2 text-sm text-error hover:underline"
                    >
                      Remove file
                    </button>
                  )}
                </div>
              )}

              {error && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-sm text-error">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || (inputType === 'url' && !url.trim()) || (inputType === 'screenshot' && !screenshot)}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Design...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    Analyze Design
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-text-muted">
          <p>
            Built by{' '}
            <a
              href="https://studiopimmit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Studio Pimmit
            </a>
            {' '}— A Design & Development Consultancy
          </p>
        </div>
      </footer>
    </main>
  );
}
