"use client";

import { hardSkills, softSkills } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";
import { GlowingCard } from "./ui/glowing-card";
import { motion } from "framer-motion";

const SkillList = ({ title, skills, titleColorClass }: { title: string; skills: string[], titleColorClass: string }) => (
  <GlowingCard>
    <div className="p-8 bg-background/80 rounded-lg h-fit">
      <h3 className={`text-2xl font-bold font-headline mb-6 ${titleColorClass}`}>{title}</h3>
      <ul className="space-y-4">
        {skills.map((skill, index) => (
          <motion.li
            key={skill}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">{skill}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </GlowingCard>
);

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-secondary">
          Skills & Expertise
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          The tools and techniques I use to build modern web experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <SkillList title="Hard Skills" skills={hardSkills} titleColorClass="text-primary" />
        <SkillList title="Soft Skills" skills={softSkills} titleColorClass="text-accent" />
      </div>
    </section>
  );
}
