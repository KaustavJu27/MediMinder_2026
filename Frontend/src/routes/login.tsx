import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — MediRemind" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden flex-col justify-between gradient-hero p-12 text-primary-foreground md:flex">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid size-10 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <Heart className="size-5" fill="currentColor" />
          </div>
          <span className="text-lg font-bold">MediRemind</span>
        </Link>
        <div>
          <h2 className="text-4xl font-bold leading-tight">Your health, organized.</h2>
          <p className="mt-3 max-w-md opacity-90">Sign in to access your medicine cabinet, reminders, and expiry alerts.</p>
        </div>
        <div className="text-sm opacity-80">© 2026 MediRemind</div>
      </div>

      <div className="flex items-center justify-center bg-background p-6 md:p-12">
        <div className="w-full max-w-md animate-fade-up">
          <Link to="/" className="mb-8 flex items-center gap-2 md:hidden">
            <div className="grid size-9 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <Heart className="size-5" fill="currentColor" />
            </div>
            <span className="font-bold">MediRemind</span>
          </Link>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to your account to continue</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-9" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input id="password" type={show ? "text" : "password"} placeholder="••••••••" className="pl-9 pr-9" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                  <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground">
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>

              <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground shadow-elegant">
                {loading ? "Signing in..." : <>Sign in <ArrowRight className="size-4" /></>}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-primary hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
