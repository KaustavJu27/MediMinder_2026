import axios from "axios";

// Axios instance for backend API integration.
// Replace baseURL with your backend URL when connecting.
export const api = axios.create({
 // baseURL: "/api",
 baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const raw = typeof window !== "undefined" ? localStorage.getItem("mers_user") : null;
  if (raw) {
    try {
      const u = JSON.parse(raw);
      if (u?.token) config.headers.Authorization = `Bearer ${u.token}`;
    } catch {}
  }
  return config;
});

export const AuthAPI = {
  // register: (data: { name: string; email: string; password: string }) => api.post("/register", data),
  // login: (data: { email: string; password: string }) => api.post("/login", data),
 register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

};

export const MedicinesAPI = {
  list: () => api.get("/medicines"),
  create: (data: unknown) => api.post("/medicines", data),
  update: (id: string, data: unknown) => api.put(`/medicines/${id}`, data),
  remove: (id: string) => api.delete(`/medicines/${id}`),
};

export const DashboardAPI = {
  stats: () => api.get("/dashboard"),
};

export const NotificationsAPI = {
  list: () => api.get("/notifications"),
};
