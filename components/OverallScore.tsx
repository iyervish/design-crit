'use client';

import { motion } from 'framer-motion';
import { getScoreColor } from '@/lib/utils';

interface OverallScoreProps {
  score: number;
}

export default function OverallScore({ score }: OverallScoreProps) {
  const circumference = 2 * Math.PI * 85;
  const progress = (score / 10) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center relative"
    >
      <h2 className="heading-md mb-2 text-text">Overall Score</h2>
      <p className="text-base text-text-muted mb-12">Design quality rating</p>

      <div className="relative inline-block mb-8">
        <svg className="transform -rotate-90" width="240" height="240">
          {/* Background circle */}
          <circle
            cx="120"
            cy="120"
            r="95"
            stroke="currentColor"
            strokeWidth="16"
            fill="none"
            className="text-background-dark"
          />
          {/* Progress circle with glow */}
          <circle
            cx="120"
            cy="120"
            r="95"
            stroke="currentColor"
            strokeWidth="16"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className={`transition-all duration-1000 ${
              score >= 8 ? 'text-success' : score >= 6 ? 'text-warning' : 'text-error'
            }`}
            style={{
              filter: score >= 8
                ? 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.6))'
                : score >= 6
                ? 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.6))'
                : 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.6))'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-7xl font-bold ${getScoreColor(score)}`}>
            {score.toFixed(1)}
          </span>
          <span className="text-sm text-text-muted mt-2 font-medium">out of 10</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`inline-block px-6 py-3 rounded-full border-2 ${
          score >= 8 ? 'bg-success/10 text-success border-success/20' :
          score >= 6 ? 'bg-warning/10 text-warning border-warning/20' :
          'bg-error/10 text-error border-error/20'
        }`}>
          <span className="font-semibold text-base">
            {score >= 8 ? '✓ Excellent Design' : score >= 6 ? '~ Good Design' : '✗ Needs Improvement'}
          </span>
        </div>
        <p className="text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
          {score >= 8
            ? 'This design demonstrates strong attention to detail and professional execution.'
            : score >= 6
            ? 'This design is solid with room for refinement and improvement.'
            : 'This design has significant opportunities for enhancement.'}
        </p>
      </div>
    </motion.div>
  );
}
