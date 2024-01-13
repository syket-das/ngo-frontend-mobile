import { create } from 'zustand';

const useBottomSheetStore = create((set) => ({
  bottomSheet: false,
  setBottomSheet: (bottomSheet) => set(() => ({ bottomSheet })),

  bottomSheetContent: null,
  setBottomSheetContent: (bottomSheetContent) =>
    set(() => ({ bottomSheetContent })),
}));

export default useBottomSheetStore;
