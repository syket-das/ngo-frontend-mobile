import { create } from 'zustand';

const useModalStore = create((set) => ({
  visible: false,
  setVisible: (visible) => set(() => ({ visible })),
  hideModal: () => set(() => ({ visible: false })),
  modalContent: null,
  setModalContent: (modalContent) => set(() => ({ modalContent })),
}));

export default useModalStore;
