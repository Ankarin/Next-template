import { create } from "zustand";
import { User } from "@supabase/gotrue-js";

type ZustState = {
  message: string;
  setMessage: (_msg: string) => void;
  user: User | null | "no";
  setUser: (_user: User | null | "no") => void;
};

const zust = create<ZustState>((set) => ({
  message:
    "This is my Next.js template, there are many like it but this one is mine.",
  setMessage: (msg: string) => set({ message: msg }),
  user: null,
  setUser: (user: User | null | "no") => set({ user: user }),
}));

export { zust };
