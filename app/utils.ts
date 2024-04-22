import { create } from "zustand";

export const useStore = create<{
  selected: string;
  setSelected: (name: string) => void;
}>((set) => ({
  selected: "",
  setSelected: (name) => set({ selected: name }),
}));
