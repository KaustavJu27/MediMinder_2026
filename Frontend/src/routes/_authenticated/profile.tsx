import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Lock, Bell, Sun, Moon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Profile — MediRemind" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { theme, toggle } = useTheme();
  const [profile, setProfile] = useState({ name: user?.name || "", email: user?.email || "" });
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [notif, setNotif] = useState({ expiry: true, reminders: true, weekly: false });

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: profile.name, email: profile.email });
    toast.success("Profile updated");
  };

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.next.length < 6) return toast.error("Password too short");
    if (pw.next !== pw.confirm) return toast.error("Passwords don't match");
    setPw({ current: "", next: "", confirm: "" });
    toast.success("Password changed");
  };

  return (
    <AppShell title="Profile & Settings">
      <div className="mx-auto grid max-w-4xl gap-6">
        {/* Header card */}
        <div className="flex items-center gap-4 rounded-3xl gradient-hero p-6 text-primary-foreground shadow-elegant">
          <div className="grid size-16 place-items-center rounded-2xl bg-white/20 text-2xl font-bold backdrop-blur">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm opacity-90">{user?.email}</p>
          </div>
        </div>

        {/* Profile */}
        <Section icon={User} title="Profile information">
          <form onSubmit={saveProfile} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" className="gradient-primary text-primary-foreground">Save changes</Button>
            </div>
          </form>
        </Section>

        {/* Password */}
        <Section icon={Lock} title="Change password">
          <form onSubmit={changePassword} className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Current</Label>
              <Input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>New</Label>
              <Input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Confirm</Label>
              <Input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <Button type="submit" className="gradient-primary text-primary-foreground">Update password</Button>
            </div>
          </form>
        </Section>

        {/* Notifications */}
        <Section icon={Bell} title="Notification preferences">
          <div className="space-y-4">
            <Toggle label="Expiry alerts" desc="Get notified before medicines expire" checked={notif.expiry} onChange={(v) => setNotif({ ...notif, expiry: v })} />
            <Toggle label="Daily reminders" desc="Receive reminders for scheduled doses" checked={notif.reminders} onChange={(v) => setNotif({ ...notif, reminders: v })} />
            <Toggle label="Weekly summary" desc="Get a weekly digest of your medicine cabinet" checked={notif.weekly} onChange={(v) => setNotif({ ...notif, weekly: v })} />
          </div>
        </Section>

        {/* Theme */}
        <Section icon={theme === "dark" ? Moon : Sun} title="Appearance">
          <Toggle
            label="Dark mode"
            desc="Switch between light and dark themes"
            checked={theme === "dark"}
            onChange={toggle}
          />
        </Section>
      </div>
    </AppShell>
  );
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Toggle({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
