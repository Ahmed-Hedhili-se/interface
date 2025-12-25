"use server";

import { interactivePortfolioAssistant } from "@/ai/flows/interactive-portfolio-assistant";

export async function handleChat(question: string) {
  if (!question.trim()) {
    return { answer: "Please provide a question." };
  }
  return await interactivePortfolioAssistant({ question });
}
