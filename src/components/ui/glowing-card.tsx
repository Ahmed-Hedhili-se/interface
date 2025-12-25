import { cn } from "@/lib/utils";

type GlowingCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlowingCard({ children, className }: GlowingCardProps) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative bg-background rounded-lg leading-none">
        {children}
      </div>
    </div>
  );
}
