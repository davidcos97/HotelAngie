import { cn } from "@/lib/utils";

interface Props {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({ label, title, description, align = "left", light = false }: Props) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <span className="section-label">
        <span className="divider-gold" /> {label}
      </span>
      <h2 className={cn("section-title text-balance", light && "text-white")}>{title}</h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed text-charcoal-700/80", light && "text-white/70")}>{description}</p>
      )}
    </div>
  );
}
