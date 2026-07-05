import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "destructive";
  trend?: string;
}

const toneClasses = {
  primary: "from-primary/15 to-primary/5 text-primary",
  success: "from-success/15 to-success/5 text-success",
  warning: "from-warning/20 to-warning/5 text-warning-foreground",
  destructive: "from-destructive/15 to-destructive/5 text-destructive",
};

export function StatsCard({ label, value, icon: Icon, tone = "primary", trend }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
      <div className={cn("absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br opacity-60 blur-2xl", toneClasses[tone])} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {trend && <p className="mt-1 text-xs text-muted-foreground">{trend}</p>}
        </div>
        <div className={cn("rounded-xl p-3 bg-gradient-to-br", toneClasses[tone])}>
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}
