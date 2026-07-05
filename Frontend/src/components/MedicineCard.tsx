import { format, parseISO } from "date-fns";
import { Pill, Calendar, Pencil, Trash2 } from "lucide-react";
import type { Medicine } from "@/context/MedicineContext";
import { getStatus, daysUntilExpiry } from "@/utils/medicine";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";

interface Props {
  medicine: Medicine;
  onEdit?: (m: Medicine) => void;
  onDelete?: (m: Medicine) => void;
}

export function MedicineCard({ medicine, onEdit, onDelete }: Props) {
  const status = getStatus(medicine);
  const days = daysUntilExpiry(medicine);
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 p-2.5 text-primary">
            <Pill className="size-5" />
          </div>
          <div>
            <h3 className="font-semibold leading-tight">{medicine.name}</h3>
            <p className="text-xs text-muted-foreground">{medicine.company}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Expiry</p>
          <p className="font-medium">{format(parseISO(medicine.expiryDate), "MMM d, yyyy")}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Quantity</p>
          <p className="font-medium">{medicine.quantity} units</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Reminder</p>
          <p className="font-medium">{medicine.reminderTime}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Days left</p>
          <p className="font-medium">{days < 0 ? `${Math.abs(days)}d ago` : `${days}d`}</p>
        </div>
      </div>

      {medicine.dosage && (
        <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">
          <Calendar className="mr-1 inline size-3" />
          {medicine.dosage}
        </p>
      )}

      {(onEdit || onDelete) && (
        <div className="mt-4 flex gap-2 border-t border-border pt-3">
          {onEdit && (
            <Button size="sm" variant="outline" className="flex-1" onClick={() => onEdit(medicine)}>
              <Pencil className="size-3.5" /> Edit
            </Button>
          )}
          {onDelete && (
            <Button size="sm" variant="outline" className="flex-1 text-destructive hover:bg-destructive/10" onClick={() => onDelete(medicine)}>
              <Trash2 className="size-3.5" /> Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
