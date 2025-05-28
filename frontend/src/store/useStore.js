import { create } from "zustand";

const useStore = create((set) => ({
  user: {},
  campaigns: [],
  segments: [],
  setUser: (user) => set({ user }),
  setCampaigns: (campaigns) => set({ campaigns }),
  setSegments: (segments) => set({ segments }),
}));

export default useStore;
