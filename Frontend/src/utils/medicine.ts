import { differenceInCalendarDays, parseISO } from "date-fns";
import type { Medicine } from "@/context/MedicineContext";

export type MedStatus = "expired" | "expiring" | "active";

export function getStatus(m: Medicine): MedStatus {
  const days = differenceInCalendarDays(parseISO(m.expiryDate), new Date());
  if (days < 0) return "expired";
  if (days <= 30) return "expiring";
  return "active";
}

export function daysUntilExpiry(m: Medicine) {
  return differenceInCalendarDays(parseISO(m.expiryDate), new Date());
}

export const statusMeta: Record<MedStatus, { label: string; className: string }> = {
  expired: { label: "Expired", className: "bg-destructive/10 text-destructive border-destructive/20" },
  expiring: { label: "Expiring Soon", className: "bg-warning/15 text-warning-foreground border-warning/30" },
  active: { label: "Active", className: "bg-success/10 text-success border-success/20" },
};
