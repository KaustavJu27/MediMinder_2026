import { cn } from "@/lib/utils";
import { statusMeta, type MedStatus } from "@/utils/medicine";

export function StatusBadge({ status }: { status: MedStatus }) {
  const meta = statusMeta[status];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", meta.className)}>
      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}
