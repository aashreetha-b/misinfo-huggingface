import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
})

// Interface for the analysis result
export interface AnalysisResult {
  analysis: string
  score: number
  sentiment: number
  toxicity: number
}

// Function to analyze text
export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await api.post("/analyze", { text })
    return response.data
  } catch (error) {
    console.error("Error analyzing text:", error)
    throw error
  }
}

