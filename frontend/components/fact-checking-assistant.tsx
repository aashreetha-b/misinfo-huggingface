"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function FactCheckingAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your fact-checking assistant. Ask me about any information you'd like to verify.",
    },
  ]);
  const [factCheckResult, setFactCheckResult] = useState({
    claim: "",
    source: "",
    verdict: "",
  });

  // 🛠️ handleSubmit function properly closed now
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: question }]);

    try {
      const response = await fetch("http://127.0.0.1:5000/fact_check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I couldn't verify that statement." },
        ]);
      } else {
        setFactCheckResult({
          claim: question,
          source: data.source || "Unknown source",
          verdict: data.verdict || "No verdict",
        });

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Fact check complete: ${data.verdict}` },
        ]);
      }
    } catch (error) {
      console.error("Fact-checking failed:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong. Please try again later." },
      ]);
    }

    // ✅ Missing this part before: reset question input
    setQuestion("");
  }; // 🔥 Missing closing bracket for handleSubmit added here!

  return (
    <Card className="bg-gray-900 border-gray-800 h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Fact-Checking Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                message.role === "assistant"
                  ? "bg-gray-800 text-white self-start"
                  : "bg-red-500 text-white self-end ml-auto"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="fact-check-result mt-4 p-4 border-t border-gray-700">
  {factCheckResult.claim ? (
    <>
      <h3 className="text-white text-lg font-bold">Fact Check Result</h3>
      <p className="text-gray-400">
        <strong>Claim:</strong> {factCheckResult.claim}
      </p>
      <p className="text-gray-400">
        <strong>Source:</strong> {factCheckResult.source}
      </p>
      <p className="text-gray-400">
        <strong>Verdict:</strong>{" "}
        <span
          className={`px-2 py-1 rounded ${
            factCheckResult.verdict.toLowerCase() === "true"
              ? "bg-green-500"
              : factCheckResult.verdict.toLowerCase() === "false"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          {factCheckResult.verdict}
        </span>
      </p>
    </>
  ) : (
    <p className="text-gray-500">Type a statement to fact-check!</p>
  )}
</div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500"
          />
          <Button type="submit" size="icon" className="bg-red-500 hover:bg-red-600">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
