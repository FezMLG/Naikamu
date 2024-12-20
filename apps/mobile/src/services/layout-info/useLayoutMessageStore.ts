import { create } from 'zustand';

interface MessageStore {
  message: string | null;
  isVisible: boolean;
  actions: {
    getMessage: () => string | null;
    setMessage: (message: string | null) => void;
    isVisible: () => boolean;
    setIsVisible: (isVisible: boolean) => void;
  };
}

const defaultMessage: MessageStore['message'] = null;
const defaultVisible: MessageStore['isVisible'] = false;

export const useLayoutMessageStore = create<MessageStore>((set, get) => ({
  message: defaultMessage,
  isVisible: defaultVisible,
  actions: {
    getMessage: () => get().message,
    setMessage: message => set({ message }),
    isVisible: () => get().isVisible,
    setIsVisible: isVisible => set({ isVisible }),
  },
}));
