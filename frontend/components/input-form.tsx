"use client";

import React, { useState } from "react";  // Ensure React is imported
import { AlertTriangle, Loader2 } from "lucide-react";
import { analyzeText, type AnalysisResult } from "@/services/api";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface InputFormProps {
  onResultsChange: (result: AnalysisResult | null) => void;
}

export function InputForm({ onResultsChange }: InputFormProps) {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    onResultsChange(null);

    try {
      const result = await analyzeText(text.trim());
      onResultsChange(result);
    } catch (err) {
      console.error("Error analyzing text:", err);
      setError("Failed to analyze text. Please try again later.");
      toast({
        title: "Analysis failed",
        description: "Could not connect to the analysis server.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Text Analysis</CardTitle>
        <CardDescription>Enter text to analyze for misinformation and hate speech</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Textarea
            placeholder="Enter text to analyze..."
            className="min-h-[120px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Text"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
