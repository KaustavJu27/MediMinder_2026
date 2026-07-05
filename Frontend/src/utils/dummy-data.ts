import type { Medicine, Notification } from "@/context/MedicineContext";

const daysFromNow = (d: number) => {
  const dt = new Date();
  dt.setDate(dt.getDate() + d);
  return dt.toISOString();
};

export const seedMedicines = (): Medicine[] => [
  { id: "m1", name: "Paracetamol 500mg", company: "Cipla", expiryDate: daysFromNow(120), quantity: 30, reminderTime: "08:00", dosage: "1 tablet after breakfast", notes: "For fever", createdAt: new Date().toISOString() },
  { id: "m2", name: "Amoxicillin 250mg", company: "Sun Pharma", expiryDate: daysFromNow(15), quantity: 14, reminderTime: "13:00", dosage: "1 capsule with lunch", createdAt: new Date().toISOString() },
  { id: "m3", name: "Vitamin D3", company: "HealthKart", expiryDate: daysFromNow(-5), quantity: 60, reminderTime: "09:00", dosage: "1 capsule daily", createdAt: new Date().toISOString() },
  { id: "m4", name: "Metformin 500mg", company: "Dr. Reddy's", expiryDate: daysFromNow(200), quantity: 90, reminderTime: "20:00", dosage: "1 tablet after dinner", createdAt: new Date().toISOString() },
  { id: "m5", name: "Aspirin 75mg", company: "Bayer", expiryDate: daysFromNow(8), quantity: 28, reminderTime: "21:00", dosage: "1 tablet at night", createdAt: new Date().toISOString() },
];

export const seedNotifications = (): Notification[] => [
  { id: "n1", title: "Medicine Expired", message: "Vitamin D3 has expired. Please dispose safely.", category: "expiry", read: false, createdAt: new Date().toISOString() },
  { id: "n2", title: "Expiring Soon", message: "Aspirin 75mg expires in 8 days.", category: "expiry", read: false, createdAt: new Date(Date.now() - 3600_000).toISOString() },
  { id: "n3", title: "Reminder", message: "Time to take Paracetamol 500mg.", category: "reminder", read: false, createdAt: new Date(Date.now() - 7200_000).toISOString() },
  { id: "n4", title: "Welcome!", message: "Thanks for joining MediRemind.", category: "system", read: true, createdAt: new Date(Date.now() - 86400_000).toISOString() },
];
