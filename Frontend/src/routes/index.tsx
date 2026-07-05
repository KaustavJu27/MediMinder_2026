import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Bell, Calendar, Shield, TrendingUp, CheckCircle2, ArrowRight, Pill, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediRemind — Never Miss a Medicine Again" },
      { name: "description", content: "Smart medicine expiry tracking with reminders, alerts, and a clean dashboard for your health." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-elegant">
              <Heart className="size-5" fill="currentColor" />
            </div>
            <span className="font-bold">MediRemind</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#how" className="text-muted-foreground hover:text-foreground">How it works</a>
            <a href="#stats" className="text-muted-foreground hover:text-foreground">Why us</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/register">
              <Button size="sm" className="gradient-primary text-primary-foreground shadow-elegant">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-32 top-10 size-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-32 top-40 size-96 rounded-full bg-success/20 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              Smart health management
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Never miss a <span className="text-gradient">medicine expiry</span> again
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Track every medicine in your cabinet. Get timely reminders, expiry alerts, and a beautiful
              dashboard to keep your family safe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  Start free <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">Sign in</Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> No credit card</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Free forever</div>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-destructive/60" />
                  <div className="size-3 rounded-full bg-warning/60" />
                  <div className="size-3 rounded-full bg-success/60" />
                </div>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: "Total", value: "42", tone: "from-primary/20 to-primary/5", icon: Pill },
                  { label: "Active", value: "31", tone: "from-success/20 to-success/5", icon: CheckCircle2 },
                  { label: "Expiring", value: "8", tone: "from-warning/30 to-warning/5", icon: Clock },
                  { label: "Expired", value: "3", tone: "from-destructive/20 to-destructive/5", icon: Bell },
                ].map((s) => (
                  <div key={s.label} className={`rounded-2xl bg-gradient-to-br ${s.tone} p-4`}>
                    <s.icon className="size-5" />
                    <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-bold">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-border bg-background p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-semibold">Recent reminders</span>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
                {["Paracetamol", "Vitamin D3", "Amoxicillin"].map((m, i) => (
                  <div key={m} className="flex items-center justify-between border-t border-border py-2.5 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Pill className="size-3.5" />
                      </div>
                      <span>{m}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{["08:00", "09:00", "13:00"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Everything you need to stay healthy</h2>
          <p className="mt-4 text-muted-foreground">Built for individuals, families, and caregivers.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Bell, title: "Smart Reminders", desc: "Get notified at the right time for every dose, every day." },
            { icon: Calendar, title: "Expiry Tracking", desc: "See what's expiring soon and what's already past its date." },
            { icon: Shield, title: "Family Safe", desc: "Track medicines for everyone in your household securely." },
            { icon: TrendingUp, title: "Insightful Stats", desc: "Beautiful dashboard with at-a-glance medicine health." },
            { icon: Pill, title: "Easy Add", desc: "Add medicines in seconds with photos, dosage, and notes." },
            { icon: Clock, title: "Always On", desc: "Works on mobile and desktop with bottom-nav and sidebar." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="mb-4 inline-grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                <f.icon className="size-5" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="overflow-hidden rounded-3xl gradient-hero p-10 text-center text-primary-foreground shadow-elegant md:p-16">
          <h2 className="text-3xl font-bold md:text-4xl">Start managing your medicines today</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">Join thousands who never let a medicine expire on their watch.</p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="mt-6">Create your free account <ArrowRight className="size-4" /></Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:px-8">
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center rounded-lg gradient-primary text-primary-foreground">
              <Heart className="size-3.5" fill="currentColor" />
            </div>
            <span>© 2026 MediRemind. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
