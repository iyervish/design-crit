'use client';

import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import OverallScore from '@/components/OverallScore';
import ScoreCard from '@/components/ScoreCard';
import { AnalysisResult } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`/results/${resolvedParams.id}.json`);

        if (!response.ok) {
          throw new Error('Analysis not found');
        }

        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 mx-auto mb-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-text-muted">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center">
            <ExclamationTriangleIcon className="w-8 h-8 text-error" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Analysis Not Found</h1>
          <p className="text-text-muted mb-6">{error}</p>
          <Link href="/" className="btn-primary inline-flex items-center">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabels = {
    aestheticCohesion: 'Aesthetic Cohesion',
    hierarchyLayout: 'Hierarchy & Layout',
    typography: 'Typography',
    colorContrast: 'Color & Contrast',
    imageryIconography: 'Imagery & Iconography',
    brandExpression: 'Brand Expression',
    systemConsistency: 'System Consistency',
    visualCraft: 'Visual Craft & Detail',
    aiSlopIndicators: 'AI Slop Indicators',
    emotionalResonance: 'Emotional Resonance',
  };

  return (
    <main className="min-h-screen pb-16">
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

      {/* Results Content */}
      <div className="container pt-8">
        {/* Compact Meta Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 pb-6 border-b border-border"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-lg font-semibold text-text mb-1">Design Analysis Report</h1>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span>
                  {analysis.sourceType === 'url' ? (
                    <a
                      href={analysis.sourceValue}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {analysis.sourceValue}
                    </a>
                  ) : (
                    analysis.sourceValue
                  )}
                </span>
                <span>•</span>
                <span>{formatDate(analysis.timestamp)}</span>
              </div>
            </div>
            <div className="w-24 h-16 bg-background-dark rounded-lg overflow-hidden border border-border flex-shrink-0">
              <Image
                src={`/screenshots/${resolvedParams.id}.png`}
                alt="Design screenshot"
                width={96}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Overall Score - Hero */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <OverallScore score={analysis.overallScore} />
          </motion.div>
        </div>

        {/* Top Recommendations - Featured Section */}
        {analysis.topRefinements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 relative"
          >
            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl -z-10"></div>

            <div className="relative p-8 md:p-12 rounded-3xl border-2 border-primary/20 bg-background/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="heading-lg">Key Recommendations</h2>
                  <p className="text-lg text-text-muted">Priority improvements for immediate impact</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {analysis.topRefinements.map((refinement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="relative group"
                  >
                    <div className="card p-8 hover:shadow-elevated transition-all duration-300 border-l-4 border-primary">
                      <div className="flex items-center gap-5">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary transition-colors">
                            <span className="text-xl font-bold text-primary">{index + 1}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg leading-relaxed text-text">{refinement}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="heading-lg mb-6">Executive Summary</h2>
          <div className="card p-8 bg-background-light/50">
            <div className="prose max-w-none">
              {analysis.summary.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg text-text leading-relaxed mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category Scores */}
        <div className="mb-20">
          <div className="mb-10">
            <h2 className="heading-lg mb-3">Detailed Breakdown</h2>
            <p className="text-lg text-text-muted">Comprehensive analysis across 10 design categories</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(analysis.categories).map(([key, value], index) => (
              <ScoreCard
                key={key}
                title={categoryLabels[key as keyof typeof categoryLabels]}
                score={value.score}
                rationale={value.rationale}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* AI Slop Detection */}
        {analysis.aiSlopDetection.indicators.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mb-12"
          >
            <div className="mb-8">
              <h2 className="heading-lg mb-3">AI Pattern Detection</h2>
              <p className="text-lg text-text-muted">Analysis of common AI-generated design patterns</p>
            </div>
            <div className="card p-10 bg-background-light/50">
              <div className="flex items-start gap-8 mb-8 pb-8 border-b border-border">
                <div className="flex-shrink-0">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-card ${
                    analysis.aiSlopDetection.score >= 7 ? 'bg-success/10 border-2 border-success/20' :
                    analysis.aiSlopDetection.score >= 4 ? 'bg-warning/10 border-2 border-warning/20' :
                    'bg-error/10 border-2 border-error/20'
                  }`}>
                    <span className={`text-4xl font-bold ${
                      analysis.aiSlopDetection.score >= 7 ? 'text-success' :
                      analysis.aiSlopDetection.score >= 4 ? 'text-warning' :
                      'text-error'
                    }`}>
                      {analysis.aiSlopDetection.score.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">Originality Score</h3>
                  <p className="text-lg text-text leading-relaxed">
                    {analysis.aiSlopDetection.score >= 7
                      ? 'Highly original design with minimal AI-generated patterns. This design shows strong evidence of custom, thoughtful design decisions.'
                      : analysis.aiSlopDetection.score >= 4
                      ? 'Some AI-generated patterns detected. The design has a mix of custom and templated elements.'
                      : 'Heavy use of AI-generated design patterns. This design relies heavily on common templates and automated solutions.'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-5 text-text">Detected Patterns</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.aiSlopDetection.indicators.map((indicator, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background border border-warning/20">
                      <ExclamationTriangleIcon className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-muted leading-relaxed">{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
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
          </p>
        </div>
      </footer>
    </main>
  );
}
