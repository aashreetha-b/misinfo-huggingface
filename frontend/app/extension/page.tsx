import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Download, AlertTriangle } from "lucide-react"

export default function ExtensionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />
      <div className="ml-64">
        <Header title="Browser Extension" />
        <div className="p-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Misinformation Detection Extension</h2>
                <p className="text-gray-300">Detect misinformation and hate speech as you browse the web</p>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center justify-between mt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">SDG Misinformation Detector</h3>
                      <p className="text-gray-400">Version 1.0.0 | Chrome, Firefox, Edge</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white">Installation Guide</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Download the Extension</h4>
                      <p className="text-gray-300 mb-2">
                        Click the download button below to get the latest version of the extension.
                      </p>
                      <Button className="bg-red-500 hover:bg-red-600 text-white gap-2">
                        <Download className="h-4 w-4" />
                        Download Extension (Coming Soon)
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Open Chrome Extensions</h4>
                      <p className="text-gray-300">Navigate to chrome://extensions in your browser.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Enable Developer Mode</h4>
                      <p className="text-gray-300">Toggle on "Developer mode" in the top-right corner.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Load Unpacked</h4>
                      <p className="text-gray-300">Click "Load unpacked" and select the downloaded extension folder.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Pin the Extension</h4>
                      <p className="text-gray-300">
                        Click the puzzle piece icon in your browser toolbar and pin the extension for easy access.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white">Features</h3>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-300">
                      Analyze any text on a webpage by selecting it and right-clicking
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-300">Automatic detection of potentially misleading headlines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-300">Real-time analysis of social media posts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-300">Detailed breakdown of sentiment and toxicity scores</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-300">Integration with our fact-checking database</span>
                  </li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

