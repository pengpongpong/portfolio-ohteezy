import { create } from "zustand"

interface ConsentStore {
    open: boolean;
    showBanner: boolean;
    setOpen: (open: boolean) => void,
    setShowBanner: (banner: boolean) => void,
}

export const useConsentStore = create<ConsentStore>((set) => ({
    open: false,
    showBanner: false,
    setOpen: ((open) => set(() => ({ open: open }))),
    setShowBanner: ((banner) => set(() => ({ showBanner: banner }))),
}))

// open cookie-settings modal
export const setOpen = (open: boolean) => {
    useConsentStore.getState().setOpen(open)
}

// show/hide cookie banner
export const setShowBanner = (banner: boolean) => {
    useConsentStore.getState().setShowBanner(banner)
}