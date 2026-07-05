import { createFileRoute, Link } from "@tanstack/react-router";
import { Pill, AlertTriangle, XCircle, Clock, Plus, Search } from "lucide-react";
import { format, parseISO } from "date-fns";
import { AppShell } from "@/components/AppShell";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMedicines } from "@/context/MedicineContext";
import { useAuth } from "@/context/AuthContext";
import { getStatus } from "@/utils/medicine";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — MediRemind" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { medicines, notifications } = useMedicines();
  const { user } = useAuth();
  const [q, setQ] = useState("");

  const stats = useMemo(() => {
    const total = medicines.length;
    const expired = medicines.filter((m) => getStatus(m) === "expired").length;
    const expiring = medicines.filter((m) => getStatus(m) === "expiring").length;
    const today = notifications.filter((n) => n.category === "reminder").length;
    return { total, expired, expiring, today };
  }, [medicines, notifications]);

  const filtered = medicines
    .filter((m) => m.name.toLowerCase().includes(q.toLowerCase()) || m.company.toLowerCase().includes(q.toLowerCase()))
    .slice(0, 6);

  const upcoming = [...medicines]
    .sort((a, b) => a.reminderTime.localeCompare(b.reminderTime))
    .slice(0, 5);

  return (
    <AppShell title="Dashboard">
      {/* Welcome */}
      <div className="mb-6 overflow-hidden rounded-3xl gradient-hero p-6 text-primary-foreground shadow-elegant md:p-8">
        <p className="text-sm opacity-90">Welcome back</p>
        <h2 className="mt-1 text-2xl font-bold md:text-3xl">Hi {user?.name} 👋</h2>
        <p className="mt-2 max-w-xl text-sm opacity-90">Here's a quick overview of your medicine cabinet today.</p>
        <Link to="/add-medicine">
          <Button variant="secondary" className="mt-5"><Plus className="size-4" /> Add medicine</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Medicines" value={stats.total} icon={Pill} tone="primary" trend="In your cabinet" />
        <StatsCard label="Expiring Soon" value={stats.expiring} icon={AlertTriangle} tone="warning" trend="Within 30 days" />
        <StatsCard label="Expired" value={stats.expired} icon={XCircle} tone="destructive" trend="Dispose safely" />
        <StatsCard label="Today's Reminders" value={stats.today} icon={Clock} tone="success" trend="Scheduled" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent medicines table */}
        <div className="rounded-2xl border border-border bg-card shadow-soft lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
            <div>
              <h3 className="font-semibold">Recent medicines</h3>
              <p className="text-xs text-muted-foreground">Latest items in your cabinet</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="pl-9 md:w-64" />
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={Pill} title="No medicines found" description="Try adjusting your search or add a new one." action={<Link to="/add-medicine"><Button><Plus className="size-4" /> Add medicine</Button></Link>} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3">Medicine</th>
                    <th className="px-5 py-3">Expiry</th>
                    <th className="px-5 py-3">Qty</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (
                    <tr key={m.id} className="border-t border-border transition-colors hover:bg-muted/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Pill className="size-4" />
                          </div>
                          <div>
                            <p className="font-medium">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{m.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{format(parseISO(m.expiryDate), "MMM d, yyyy")}</td>
                      <td className="px-5 py-3 text-muted-foreground">{m.quantity}</td>
                      <td className="px-5 py-3"><StatusBadge status={getStatus(m)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Upcoming reminders */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Upcoming reminders</h3>
              <p className="text-xs text-muted-foreground">Your next doses</p>
            </div>
            <Clock className="size-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {upcoming.map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-accent/50">
                <div className="grid size-10 place-items-center rounded-xl gradient-primary text-primary-foreground">
                  <Pill className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.dosage}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{m.reminderTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
