import axios from 'axios';

// Create Axios instance pointing to Flask backend
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
});

// Define the structure of our backend response
export interface AnalysisResult {
  analysis: string;
  score: number;
  sentiment: number;
  toxicity: number;
}

// Function to send text for analysis
export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await api.post('/analyze', { text });
    return response.data;
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw error;
  }
};
