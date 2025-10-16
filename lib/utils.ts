import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateOverallScore(scores: Record<string, number>): number {
  const values = Object.values(scores);
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
}

export function getScoreColor(score: number): string {
  if (score >= 8) return 'text-success';
  if (score >= 6) return 'text-warning';
  return 'text-error';
}

export function getScoreBgColor(score: number): string {
  if (score >= 8) return 'bg-success/10';
  if (score >= 6) return 'bg-warning/10';
  return 'bg-error/10';
}
