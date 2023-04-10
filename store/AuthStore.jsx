import { create } from "zustand";

export const authStore = create((set) => 
({
    user: [],
    setUser:   (value) => set({ user: value }),
    resetUser: () => set({ user: null }),

    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IisyNDM4MTg4NjA2NjMiLCJpYXQiOjE2ODAyODQ1OTB9.oBagIaEgRdg72eRG1zsXDYDk58OXZRUg3P68W6jmT7U",
    setToken:   (value) => set({ token: value }),
    resetToken: () => set({ token: null }),
}))