import { createFileRoute } from "@tanstack/react-router";
import { Bell, AlertTriangle, Clock, Info, CheckCheck } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useMedicines, type Notification } from "@/context/MedicineContext";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({ meta: [{ title: "Notifications — MediRemind" }] }),
  component: NotificationsPage,
});

const categories = [
  { value: "all", label: "All" },
  { value: "expiry", label: "Expiry" },
  { value: "reminder", label: "Reminders" },
  { value: "system", label: "System" },
] as const;

const categoryMeta: Record<Notification["category"], { icon: typeof Bell; className: string }> = {
  expiry: { icon: AlertTriangle, className: "bg-destructive/10 text-destructive" },
  reminder: { icon: Clock, className: "bg-primary/10 text-primary" },
  system: { icon: Info, className: "bg-success/10 text-success" },
};

function NotificationsPage() {
  const { notifications, markRead, markAllRead } = useMedicines();
  const [cat, setCat] = useState<(typeof categories)[number]["value"]>("all");

  const filtered = notifications.filter((n) => cat === "all" || n.category === cat);

  return (
    <AppShell title="Notifications">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={cn(
                "whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                cat === c.value
                  ? "gradient-primary text-primary-foreground shadow-elegant"
                  : "border border-border bg-card hover:bg-accent",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <Button variant="outline" onClick={markAllRead}><CheckCheck className="size-4" /> Mark all read</Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
      ) : (
        <div className="space-y-2">
          {filtered.map((n) => {
            const meta = categoryMeta[n.category];
            return (
              <div
                key={n.id}
                className={cn(
                  "flex items-start gap-4 rounded-2xl border bg-card p-4 shadow-soft transition-colors",
                  n.read ? "border-border opacity-70" : "border-primary/20 bg-primary/5",
                )}
              >
                <div className={cn("grid size-10 shrink-0 place-items-center rounded-xl", meta.className)}>
                  <meta.icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold">{n.title}</h4>
                    {!n.read && <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDistanceToNow(parseISO(n.createdAt), { addSuffix: true })}</p>
                </div>
                {!n.read && (
                  <Button size="sm" variant="ghost" onClick={() => markRead(n.id)}>Mark read</Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
