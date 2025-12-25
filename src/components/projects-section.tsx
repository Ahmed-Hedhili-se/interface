import { ProjectCard } from "./project-card";
import { projects } from "@/lib/data";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-secondary">
          My Digital Arsenal
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A selection of projects where I've turned complex problems into elegant solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
