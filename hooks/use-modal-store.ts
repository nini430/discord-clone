import { Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
  | 'create-server'
  | 'invite'
  | 'edit-server'
  | 'members'
  | 'create-channel'
  | 'leave-server'
  | 'delete-server';

interface ModalData {
  server?: Server;
}
interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type, data?) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

export default useModalStore;
