// The index card's open state, shared by its trigger and the card.
import { create } from "zustand";

type IndexState = { open: boolean; setOpen: (open: boolean) => void; toggle: () => void };

export const useIndex = create<IndexState>((set, get) => ({
  open: false,
  setOpen: (open) => set({ open }),
  toggle: () => set({ open: !get().open }),
}));
