import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Brain, MessageSquare } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />
      <div className="ml-64">
        <Header title="About Misinformation Detection" />
        <div className="p-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">How It Works</h2>
                <p className="text-gray-300">Understanding our misinformation and hate speech detection system</p>

                <p className="text-gray-300 mt-4">
                  Our system uses a combination of advanced natural language processing techniques and machine learning
                  models to detect misinformation and hate speech in text content.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white">Key Components:</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                      <h4 className="font-semibold text-white">Sentiment Analysis</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      We use Google Cloud Natural Language API to analyze the sentiment of text, which helps identify
                      potentially harmful content.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <h4 className="font-semibold text-white">Toxicity Detection</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Using Google's Perspective API, we measure the toxicity level of text to identify hate speech and
                      abusive language.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="h-5 w-5 text-purple-400" />
                      <h4 className="font-semibold text-white">Meta-Classifier</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Our system combines multiple signals using a machine learning model to provide more accurate
                      detection of misinformation and hate speech.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white">Scoring System:</h3>
                <p className="text-gray-300">Our system provides scores between 0 and 1:</p>

                <ul className="space-y-2 text-gray-300 list-disc pl-5">
                  <li>
                    <span className="font-medium text-white">Overall Score:</span> A combined measure of how likely the
                    text contains misinformation or hate speech. Higher scores indicate higher likelihood.
                  </li>
                  <li>
                    <span className="font-medium text-white">Sentiment Score:</span> Ranges from -1 (very negative) to 1
                    (very positive).
                  </li>
                  <li>
                    <span className="font-medium text-white">Toxicity Score:</span> Ranges from 0 (not toxic) to 1 (very
                    toxic).
                  </li>
                </ul>
              </section>

              <section className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-2">Disclaimer</h3>
                <p className="text-gray-300">
                  While our system is designed to be accurate, it may not catch all instances of misinformation or hate
                  speech. It should be used as a tool to assist human judgment, not replace it.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

