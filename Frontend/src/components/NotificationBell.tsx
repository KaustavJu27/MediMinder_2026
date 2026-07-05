import { Bell } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMedicines } from "@/context/MedicineContext";

export function NotificationBell() {
  const { notifications } = useMedicines();
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <Link
      to="/notifications"
      className="relative inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card transition-colors hover:bg-accent"
      aria-label="Notifications"
    >
      <Bell className="size-5" />
      {unread > 0 && (
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
          {unread}
        </span>
      )}
    </Link>
  );
}
