import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GlobalFilterState {
  company: string;
  status: string;
  setFilter(key: "company" | "status", value: string): void;
}

export const useGlobalFilterStore = create<GlobalFilterState>()(
  devtools((set) => ({
    company: "",
    status: "",
    setFilter(key, value) {
      set({ [key]: value });
    },
  }))
);
