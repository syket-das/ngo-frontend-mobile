import { create } from 'zustand';

export const useControlStore = create((set) => ({
  headerHeight: 0,
  setHeaderHeight: (value) => set({ headerHeight: value }),
  bottoTabBarHeight: 0,
  setBottoTabBarHeight: (value) => set({ bottoTabBarHeight: value }),

  homePostsScrolled: false,
  setHomePostsScrolled: (value) => set({ homePostsScrolled: value }),
}));
