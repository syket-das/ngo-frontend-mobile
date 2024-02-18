import { create } from 'zustand';

export const useControlStore = create((set) => ({
  homePostsScrolled: false,
  setHomePostsScrolled: (value) => set({ homePostsScrolled: value }),
}));
