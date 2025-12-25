"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChatInput } from "./chat-input";
import { ChatMessages, type Message } from "./chat-messages";
import { GlowingCard } from "../ui/glowing-card";
import { handleChat } from "@/app/actions";

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Hello! I'm a personalized AI assistant. Ask me anything about this developer's skills, experience, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    
    setIsLoading(true);
    setIsButtonDisabled(true);

    try {
      const response = await handleChat(currentInput);
      const botMessage: Message = { role: "ai", content: response.answer };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error connecting to AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          content:
            "Connection error. The AI brain might be sleeping. Please try again in 30s.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsButtonDisabled(false), 2000);
    }
  };


  return (
    <motion.section
      id="chat"
      className="py-24 sm:py-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-secondary">
          Interactive AI Assistant
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question? Get an instant answer from my AI-powered assistant.
        </p>
      </div>

      <GlowingCard className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col bg-background/80 rounded-lg h-fit max-h-[600px]">
          <ChatMessages messages={messages} isLoading={isLoading} />
          <div className="p-4 border-t border-primary/20">
            <ChatInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              isButtonDisabled={isButtonDisabled}
            />
          </div>
        </div>
      </GlowingCard>
    </motion.section>
  );
}
