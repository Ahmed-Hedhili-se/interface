import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ChatSection } from "@/components/chat/chat-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ChatSection />
      </div>
    </div>
  );
}
