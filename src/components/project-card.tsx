"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    description: string;
    link: string;
    tag: string;
    color: "blue" | "pink" | "purple";
  };
};

const colorVariants = {
  blue: "hover:border-accent",
  pink: "hover:border-secondary",
  purple: "hover:border-primary",
};

const glowVariants = {
    blue: 'shadow-[0_0_20px_theme(colors.accent)]',
    pink: 'shadow-[0_0_20px_theme(colors.secondary)]',
    purple: 'shadow-[0_0_20px_theme(colors.primary)]',
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div
        className={cn(
          "group relative flex flex-col h-full rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 p-6 transition-all duration-300 hover:scale-105",
          colorVariants[project.color]
        )}
      >
        <div className={cn("absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300", glowVariants[project.color])} />
        
        <div className="relative flex-grow flex flex-col">
            <h3 className="text-xl font-bold font-headline mb-2">
              {project.title}
            </h3>
            <div className="mb-4">
                <Badge variant="outline" className="border-white/20">{project.tag}</Badge>
            </div>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">
              {project.description}
            </p>
            <div className="mt-auto">
              <Button asChild variant="outline" className="border-white/20 hover:bg-white/10 hover:text-foreground">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
