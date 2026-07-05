import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Pill, LayoutGrid, List } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MedicineCard } from "@/components/MedicineCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMedicines, type Medicine } from "@/context/MedicineContext";
import { getStatus, type MedStatus } from "@/utils/medicine";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/medicines")({
  head: () => ({ meta: [{ title: "Medicines — MediRemind" }] }),
  component: MedicinesPage,
});

const filters: { label: string; value: "all" | MedStatus }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Expiring Soon", value: "expiring" },
  { label: "Expired", value: "expired" },
];

function MedicinesPage() {
  const { medicines, deleteMedicine } = useMedicines();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | MedStatus>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return medicines.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(q.toLowerCase()) ||
        m.company.toLowerCase().includes(q.toLowerCase());
      const matchesFilter = filter === "all" || getStatus(m) === filter;
      return matchesSearch && matchesFilter;
    });
  }, [medicines, q, filter]);

  const handleDelete = (m: Medicine) => {
    deleteMedicine(m.id);
    toast.success(`${m.name} deleted`);
  };

  return (
    <AppShell title="My Medicines">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{filtered.length} medicines</p>
        </div>
        <Link to="/add-medicine">
          <Button className="gradient-primary text-primary-foreground shadow-elegant"><Plus className="size-4" /> Add medicine</Button>
        </Link>
      </div>

      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search medicines..." className="pl-9" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                filter === f.value
                  ? "gradient-primary text-primary-foreground shadow-elegant"
                  : "border border-border bg-background hover:bg-accent",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-xl border border-border p-1">
          <button onClick={() => setView("grid")} className={cn("rounded-lg p-1.5", view === "grid" && "bg-primary/10 text-primary")} aria-label="Grid">
            <LayoutGrid className="size-4" />
          </button>
          <button onClick={() => setView("list")} className={cn("rounded-lg p-1.5", view === "list" && "bg-primary/10 text-primary")} aria-label="List">
            <List className="size-4" />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Pill}
          title="No medicines yet"
          description="Add your first medicine to start tracking expiry and reminders."
          action={<Link to="/add-medicine"><Button><Plus className="size-4" /> Add medicine</Button></Link>}
        />
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MedicineCard key={m.id} medicine={m} onEdit={() => toast.info("Edit coming soon")} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((m) => (
            <div key={m.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-soft transition-colors hover:bg-accent/30">
              <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><Pill className="size-4" /></div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.company} • Qty {m.quantity}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => handleDelete(m)}>Delete</Button>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
