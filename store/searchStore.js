import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  searchedUser: null,
  searchedNgo: null,
  role: '',
  setRole: (role) => {
    set((state) => ({
      role: role,
    }));
  },

  setSearchedUser: (user) => {
    set((state) => ({
      searchedUser: user,
    }));
  },

  setSearchedNgo: (ngo) => {
    set((state) => ({
      searchedNgo: ngo,
    }));
  },
}));
