import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { seedMedicines, seedNotifications } from "@/utils/dummy-data";
import { MedicinesAPI } from "@/services/api";

export interface Medicine {
  id: string;
  name: string;
  company: string;
  expiryDate: string; // ISO
  quantity: number;
  reminderTime: string; // HH:mm
  dosage: string;
  notes?: string;
  image?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: "expiry" | "reminder" | "system";
  read: boolean;
  createdAt: string;
}

interface Ctx {
  medicines: Medicine[];
  notifications: Notification[];
  addMedicine: (m: Omit<Medicine, "id" | "createdAt">) => void;
  updateMedicine: (id: string, patch: Partial<Medicine>) => void;
  deleteMedicine: (id: string) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

const MedicineContext = createContext<Ctx | null>(null);
const KEY_M = "mers_medicines";
const KEY_N = "mers_notifications";

export function MedicineProvider({ children }: { children: ReactNode }) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // useEffect(() => {
  //   try {
  //     const m = localStorage.getItem(KEY_M);
  //     const n = localStorage.getItem(KEY_N);
  //     setMedicines(m ? JSON.parse(m) : seedMedicines());
  //     setNotifications(n ? JSON.parse(n) : seedNotifications());
  //   } catch {
  //     setMedicines(seedMedicines());
  //     setNotifications(seedNotifications());
  //   }
  // }, []);

  useEffect(() => {
  const fetchMedicines = async () => {
    try {
      const res = await MedicinesAPI.list();

      console.log("MEDICINES:", res.data);

      setMedicines(
        res.data.map((m: any) => ({
          id: m._id,
          name: m.medicineName,
          company: m.companyName,
          expiryDate: m.expiryDate,
          quantity: m.quantity,
          reminderTime: m.reminderTime,
          dosage: m.dosageInstructions,
          notes: m.notes,
          createdAt: m.createdAt,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  fetchMedicines();
}, []);

  useEffect(() => {
    if (medicines.length) localStorage.setItem(KEY_M, JSON.stringify(medicines));
  }, [medicines]);
  useEffect(() => {
    if (notifications.length) localStorage.setItem(KEY_N, JSON.stringify(notifications));
  }, [notifications]);

  const addMedicine: Ctx["addMedicine"] = (m) => {
    const newM: Medicine = { ...m, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setMedicines((prev) => [newM, ...prev]);
  };
  const updateMedicine: Ctx["updateMedicine"] = (id, patch) =>
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  const deleteMedicine: Ctx["deleteMedicine"] = (id) =>
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  const markRead: Ctx["markRead"] = (id) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <MedicineContext.Provider
      value={{ medicines, notifications, addMedicine, updateMedicine, deleteMedicine, markRead, markAllRead }}
    >
      {children}
    </MedicineContext.Provider>
  );
}

export function useMedicines() {
  const ctx = useContext(MedicineContext);
  if (!ctx) throw new Error("useMedicines must be used within MedicineProvider");
  return ctx;
}
