import { create } from 'zustand';

const useBottomSheetStore = create((set) => ({
  bottomSheet: false,
  bottomSheetRef: null,
  setBottomSheetRef: (bottomSheetRef) => set(() => ({ bottomSheetRef })),
  setBottomSheet: (bottomSheet) => set(() => ({ bottomSheet })),
  initialSnap: '25%',
  setInitialSnap: (initialSnap) => set(() => ({ initialSnap })),
  bottomSheetContent: null,
  setBottomSheetContent: (bottomSheetContent) =>
    set(() => ({ bottomSheetContent })),
}));

export default useBottomSheetStore;
