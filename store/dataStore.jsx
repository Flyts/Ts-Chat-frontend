import { create } from "zustand";

export const dataStore = create((set) => 
({
    loader: false,
    setLoaderToTrue: () => set({ loader: true }),
    resetLoader:     () => set({ loader: false })
}))