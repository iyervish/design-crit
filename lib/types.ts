export interface CategoryScore {
  score: number;
  rationale: string;
}

export interface AnalysisResult {
  overallScore: number;
  categories: {
    aestheticCohesion: CategoryScore;
    hierarchyLayout: CategoryScore;
    typography: CategoryScore;
    colorContrast: CategoryScore;
    imageryIconography: CategoryScore;
    brandExpression: CategoryScore;
    systemConsistency: CategoryScore;
    visualCraft: CategoryScore;
    aiSlopIndicators: CategoryScore;
    emotionalResonance: CategoryScore;
  };
  summary: string;
  aiSlopDetection: {
    score: number;
    indicators: string[];
  };
  topRefinements: string[];
  timestamp: string;
  sourceType: 'url' | 'screenshot';
  sourceValue: string;
}

export interface AnalysisRequest {
  type: 'url' | 'screenshot';
  value: string;
  screenshot?: string; // base64 encoded image
}
