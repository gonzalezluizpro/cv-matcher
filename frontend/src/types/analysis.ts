// src/types/analysis.ts

export interface MatchMetrics {
    'Overall Match': string;
    'Skills Match': string;
  }
  
  export interface SkillsAnalysis {
    'Matching Skills': string[];
    'Missing Skills': string[];
    'Additional Skills': string[];
  }
  
  export interface AnalysisReport {
    metrics: MatchMetrics;
    skills_analysis: SkillsAnalysis;
  }