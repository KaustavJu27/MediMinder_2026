import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Pill } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMedicines } from "@/context/MedicineContext";
import { toast } from "sonner";
import { MedicinesAPI } from "@/services/api";

export const Route = createFileRoute("/_authenticated/add-medicine")({
  head: () => ({ meta: [{ title: "Add Medicine — MediRemind" }] }),
  component: AddMedicine,
});

function AddMedicine() {
  const { addMedicine } = useMedicines();
  const navigate = useNavigate();
  const [image, setImage] = useState<string | undefined>();
  const [form, setForm] = useState({
    name: "",
    company: "",
    expiryDate: "",
    quantity: "",
    reminderTime: "08:00",
    dosage: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.expiryDate) e.expiryDate = "Required";
    if (!form.quantity || Number(form.quantity) <= 0) e.quantity = "Must be > 0";
    if (!form.dosage.trim()) e.dosage = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }
   
    await MedicinesAPI.create({
    medicineName: form.name,
    companyName: form.company,
    expiryDate: new Date(form.expiryDate).toISOString(),
    quantity: Number(form.quantity),
    reminderTime: form.reminderTime,
    dosageInstructions: form.dosage,
    notes: form.notes,
  });
  
    toast.success("Medicine added!");
    navigate({ to: "/medicines" });
  };

  return (
    <AppShell title="Add Medicine">
      <div className="mx-auto max-w-3xl">
        <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
              <Pill className="size-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">New medicine</h2>
              <p className="text-sm text-muted-foreground">Fill in the details below</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Medicine name" error={errors.name}>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Paracetamol 500mg" />
            </Field>
            <Field label="Company" error={errors.company}>
              <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. Cipla" />
            </Field>
            <Field label="Expiry date" error={errors.expiryDate}>
              <Input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
            </Field>
            <Field label="Quantity" error={errors.quantity}>
              <Input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="30" />
            </Field>
            <Field label="Reminder time">
              <Input type="time" value={form.reminderTime} onChange={(e) => setForm({ ...form, reminderTime: e.target.value })} />
            </Field>
            <Field label="Dosage instructions" error={errors.dosage}>
              <Input value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} placeholder="1 tablet after meals" />
            </Field>
            <div className="md:col-span-2">
              <Field label="Notes">
                <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes..." rows={3} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Label className="mb-1.5 block">Medicine image</Label>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background py-8 transition-colors hover:bg-accent/30">
                {image ? (
                  <img src={image} alt="preview" className="size-24 rounded-xl object-cover" />
                ) : (
                  <>
                    <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Upload className="size-5" />
                    </div>
                    <p className="text-sm text-muted-foreground">Click to upload an image</p>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate({ to: "/medicines" })}>Cancel</Button>
            <Button type="submit" className="gradient-primary text-primary-foreground shadow-elegant">Save medicine</Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
