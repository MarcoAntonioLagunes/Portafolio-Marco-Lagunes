import { ChevronDown } from "lucide-react";

export function ScrollCue({ label, className }: { label: string; className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="mt-1 flex animate-float-y justify-center motion-reduce:animate-none">
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
