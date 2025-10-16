'use client';

import { motion } from 'framer-motion';
import { getScoreColor, getScoreBgColor } from '@/lib/utils';

interface ScoreCardProps {
  title: string;
  score: number;
  rationale: string;
  index?: number;
}

export default function ScoreCard({ title, score, rationale, index = 0 }: ScoreCardProps) {
  const circumference = 2 * Math.PI * 40;
  const progress = (score / 10) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      {/* Subtle gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 rounded-2xl transition-all duration-300 -z-10"></div>

      <div className="card p-7 hover:shadow-elevated transition-all duration-300 h-full">
        <div className="flex flex-col gap-4">
          {/* Header with Title and Score */}
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-text flex-1">{title}</h3>

            {/* Compact Score Circle */}
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16">
                <svg className="transform -rotate-90 w-full h-full">
                  {/* Background circle */}
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-background-dark"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ${
                      score >= 8 ? 'text-success' : score >= 6 ? 'text-warning' : 'text-error'
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xl font-bold ${getScoreColor(score)}`}>
                    {score.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Score Badge */}
          <div className="inline-flex">
            <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${getScoreBgColor(score)} ${getScoreColor(score)}`}>
              {score >= 8 ? 'Excellent' : score >= 6 ? 'Good' : 'Needs Work'}
            </span>
          </div>

          {/* Rationale */}
          <p className="text-lg text-text leading-relaxed">{rationale}</p>
        </div>
      </div>
    </motion.div>
  );
}
