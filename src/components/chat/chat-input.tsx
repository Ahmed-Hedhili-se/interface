"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

type ChatInputProps = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isButtonDisabled: boolean;
};

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  isButtonDisabled,
}: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Ask about my projects or experience..."
        value={input}
        onChange={handleInputChange}
        disabled={isLoading}
        className="flex-1 font-code bg-transparent border-primary/50 focus:border-primary focus:ring-primary/50"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={isButtonDisabled || !input.trim()}
        className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-primary"
      >
        <Send className="w-6 h-6" />
      </Button>
    </form>
  );
}
