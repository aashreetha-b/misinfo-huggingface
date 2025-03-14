export interface FactCheck {
  claim: string
  source: string
  verdict: string
}

export interface AnalysisResult {
  sentiment: number
  toxicity: number
  fact_check: FactCheck
  meta_score: string
  feedback: string
  overall_score?: number
}

export interface HistoryItem {
  id: string
  timestamp: string
  text: string
  result: AnalysisResult
}

