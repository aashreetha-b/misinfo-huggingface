import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Steps, StepItem } from "@/components/steps"

export default function ExtensionPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold tracking-tight">Browser Extension</h1>

        <Card>
          <CardHeader>
            <CardTitle>Misinformation Detection Extension</CardTitle>
            <CardDescription>Detect misinformation and hate speech as you browse the web</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-muted p-6 sm:flex-row">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Extension icon"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium">SDG Misinformation Detector</h3>
                <p className="text-sm text-muted-foreground">Version 1.0.0 | Chrome, Firefox, Edge</p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium">Installation Guide</h3>
              <Steps>
                <StepItem title="Download the Extension">
                  Click the download button below to get the latest version of the extension.
                </StepItem>
                <StepItem title="Open Chrome Extensions">Navigate to chrome://extensions in your browser.</StepItem>
                <StepItem title="Enable Developer Mode">Toggle on "Developer mode" in the top-right corner.</StepItem>
                <StepItem title="Load Unpacked">
                  Click "Load unpacked" and select the downloaded extension folder.
                </StepItem>
                <StepItem title="Pin the Extension">
                  Click the puzzle piece icon in your browser toolbar and pin the extension for easy access.
                </StepItem>
              </Steps>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium">Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analyze any text on a webpage by selecting it and right-clicking</li>
                <li>Automatic detection of potentially misleading headlines</li>
                <li>Real-time analysis of social media posts</li>
                <li>Detailed breakdown of sentiment and toxicity scores</li>
                <li>Integration with our fact-checking database</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Download Extension (Coming Soon)</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

