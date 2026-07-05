import { ReactNode } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Pill, PlusCircle, Bell, User, LogOut, Heart, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { NotificationBell } from "./NotificationBell";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/medicines", label: "Medicines", icon: Pill },
  { to: "/add-medicine", label: "Add Medicine", icon: PlusCircle },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children, title, action }: { children: ReactNode; title?: string; action?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar - Desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="grid size-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-elegant">
            <Heart className="size-5" fill="currentColor" />
          </div>
          <div>
            <p className="font-bold leading-none">MediRemind</p>
            <p className="text-[10px] text-muted-foreground">Expiry Tracker</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "gradient-primary text-primary-foreground shadow-elegant"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-8">
          <button onClick={() => setOpen((o) => !o)} className="md:hidden" aria-label="Menu">
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold md:text-xl">{title}</h1>
          </div>
          <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 md:flex">
            <Search className="size-4 text-muted-foreground" />
            <input placeholder="Quick search..." className="w-48 bg-transparent text-sm outline-none" />
          </div>
          <NotificationBell />
          <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 md:flex">
            <div className="grid size-7 place-items-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="text-sm font-medium">{user?.name}</span>
          </div>
          {action}
        </header>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)}>
            <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
            <aside className="absolute left-0 top-0 h-full w-72 bg-sidebar p-4 shadow-elegant" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center gap-2 px-2">
                <div className="grid size-9 place-items-center rounded-xl gradient-primary text-primary-foreground">
                  <Heart className="size-5" fill="currentColor" />
                </div>
                <p className="font-bold">MediRemind</p>
              </div>
              <nav className="space-y-1">
                {nav.map((item) => {
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                        active ? "gradient-primary text-primary-foreground" : "hover:bg-sidebar-accent",
                      )}
                    >
                      <item.icon className="size-4" /> {item.label}
                    </Link>
                  );
                })}
                <Button variant="outline" className="mt-4 w-full" onClick={handleLogout}>
                  <LogOut className="size-4" /> Sign out
                </Button>
              </nav>
            </aside>
          </div>
        )}

        <main className="flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-8">{children}</main>

        {/* Bottom nav - Mobile */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-border bg-card/95 backdrop-blur md:hidden">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="size-5" />
                {item.label.split(" ")[0]}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
