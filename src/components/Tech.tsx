import { Badge } from "@/components/ui/badge";
import { technologies } from "@/data";

export default function Tech() {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {technologies.map((tech) => (
        <Badge
          key={tech.name}
          variant="secondary"
          className="px-4 py-2 text-sm font-medium border border-border hover:border-primary transition-colors cursor-default"
        >
          {tech.name}
        </Badge>
      ))}
    </div>
  );
}
