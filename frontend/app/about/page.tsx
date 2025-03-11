import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold tracking-tight">About Misinformation Detection</h1>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Understanding our misinformation and hate speech detection system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our system uses a combination of advanced natural language processing techniques and machine learning
              models to detect misinformation and hate speech in text content.
            </p>

            <h3 className="text-lg font-medium">Key Components:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Sentiment Analysis:</strong> We use Google Cloud Natural Language API to analyze the sentiment
                of text, which helps identify potentially harmful content.
              </li>
              <li>
                <strong>Toxicity Detection:</strong> Using Google's Perspective API, we measure the toxicity level of
                text to identify hate speech and abusive language.
              </li>
              <li>
                <strong>Meta-Classifier:</strong> Our system combines multiple signals using a machine learning model to
                provide more accurate detection of misinformation and hate speech.
              </li>
            </ul>

            <h3 className="text-lg font-medium">Scoring System:</h3>
            <p>Our system provides scores between 0 and 1:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Overall Score:</strong> A combined measure of how likely the text contains misinformation or
                hate speech. Higher scores indicate higher likelihood.
              </li>
              <li>
                <strong>Sentiment Score:</strong> Ranges from -1 (very negative) to 1 (very positive).
              </li>
              <li>
                <strong>Toxicity Score:</strong> Ranges from 0 (not toxic) to 1 (very toxic).
              </li>
            </ul>

            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium">Disclaimer</h4>
              <p className="text-sm text-muted-foreground">
                While our system is designed to be accurate, it may not catch all instances of misinformation or hate
                speech. It should be used as a tool to assist human judgment, not replace it.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

