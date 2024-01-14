import { create } from 'zustand';

const useBottomSheetStore = create((set) => ({
  bottomSheet: false,
  bottomSheetRef: null,
  setBottomSheetRef: (bottomSheetRef) => set(() => ({ bottomSheetRef })),
  setBottomSheet: (bottomSheet) => set(() => ({ bottomSheet })),

  bottomSheetContent: null,
  setBottomSheetContent: (bottomSheetContent) =>
    set(() => ({ bottomSheetContent })),
}));

export default useBottomSheetStore;
