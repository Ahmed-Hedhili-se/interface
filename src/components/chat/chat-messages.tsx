"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BrainCircuit, User, AlertTriangle } from "lucide-react";
import { useEffect, useRef } from "react";

export type Message = {
  role: "user" | "ai" | "error";
  content: string;
};

const Typewriter = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-1">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.2 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
};

export function ChatMessages({
  messages,
  isLoading,
}: {
  messages: Message[];
  isLoading: boolean;
}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollAreaRef}
      className="flex-1 space-y-4 p-4 overflow-y-auto font-code text-sm"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex items-start gap-3",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          {message.role !== "user" && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              {message.role === 'ai' && <BrainCircuit className="w-5 h-5 text-primary" />}
              {message.role === 'error' && <AlertTriangle className="w-5 h-5 text-destructive" />}
            </div>
          )}
          <div
            className={cn(
              "max-w-[75%] rounded-lg p-3 text-white",
              {
                "bg-accent/80 text-accent-foreground": message.role === "user",
                "bg-primary/80": message.role === "ai",
                "bg-destructive/80": message.role === "error",
              }
            )}
          >
            {message.role === "ai" && index === messages.length - 1 ? (
              <Typewriter text={message.content} />
            ) : (
              message.content
            )}
          </div>
          {message.role === "user" && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <User className="w-5 h-5 text-accent" />
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="flex items-start gap-3 justify-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-primary" />
          </div>
          <div className="bg-primary/80 rounded-lg p-3 flex items-center space-x-1">
            <motion.div
              className="w-2 h-2 bg-primary-foreground rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="w-2 h-2 bg-primary-foreground rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary-foreground rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
