"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const AnimatedText = ({ text, el: Wrapper = "p" }: { text: string; el?: keyof JSX.IntrinsicElements }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.025, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Wrapper>
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className="font-code"
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};


export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="home" className="py-32 sm:py-48 text-center">
      <motion.div
        className="flex flex-col items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold font-headline tracking-tighter"
          variants={itemVariants}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Bridging Low-Level Logic with High-Level AI
          </span>
        </motion.h1>

        <motion.div variants={itemVariants} className="max-w-3xl text-lg sm:text-xl text-muted-foreground font-light">
           <AnimatedText text="Systems & AI Engineer architecting high-performance backends, computer vision tools, and secure intelligent agents." />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-6"
          variants={itemVariants}
        >
          <Button size="lg" asChild>
            <a href="#projects">
              View Projects <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#chat">Contact AI</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
