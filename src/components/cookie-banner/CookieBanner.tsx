import { useEffect, type ReactNode } from 'react'
import { setOpen, setShowBanner, useConsentStore } from "@utils/store"
import { CookieIcon, setCookies } from "./CookieModal"

import { getLocalStorage, setLocalStorage, type Lang } from "@utils/utils"

type Consent = "granted" | "partial" | "denied" | null

type CookieBannerButtonProps = {
    onClick?: () => void;
    children: ReactNode;
    styles?: string;
}

// open cookie settings modal
export const ShowCookieModal = ({ children, styles }: CookieBannerButtonProps) => {
    const handleModal = () => {
        setOpen(true)
    }

    return <CookieBannerButton styles={styles} onClick={handleModal}>{children}</CookieBannerButton>
}

export const CookieBannerButton = ({ onClick, children, styles }: CookieBannerButtonProps) => {
    return (
        <button className={` 
                            h-8 
                            py-6
                            px-4 
                            flex 
                            justify-center 
                            items-center 
                            rounded-full
                            bg-white 
                            text-sm 
                            text-black 
                            hover:bg-orange 
                            hover:text-white 
                            transition-colors 
                            duration-200 
                            ease-in-out
                            ${styles}`
        }
            onClick={onClick}
        >
            {children}
        </button>
    )
}

type CookieBannerProps = {
    pathname: string;
    lang: Lang;
}

const CookieBanner = ({ pathname, lang }: CookieBannerProps) => {
    const showBanner = useConsentStore(state => state.showBanner)
    // show cookie banner if no cookie consent 
    useEffect(() => {
        const consent = getLocalStorage("consent") as Consent
        if ((consent === "granted") || (consent === "partial") || (consent === "denied")) {
            return
        }

        return setShowBanner(true)
    }, [])

    // accept all cookies
    const handleAcceptAll = () => {
        setShowBanner(false)

        setLocalStorage("consent", "granted")

        // set functional, analytics and advertisement cookie 
        setCookies(true, true, true)
    }

    return (
        <>
            {showBanner
                ? <div className={`
                                ${pathname === "/" || pathname === "/en"
                        ? "invisible animate-[showVisibility_.4s_6.3s_ease-in-out_forwards]"
                        : "visible"} 
                                px-8 
                                py-3 
                                xl:px-16 
                                flex 
                                flex-col 
                                gap-4 
                                lg:flex-row 
                                lg:justify-between 
                                lg:items-center 
                                fixed 
                                bottom-0 
                                left-0 
                                right-0 
                                z-50
                                border-t 
                                border-orange 
                                bg-black 
                                font-poppins 
                                text-white 
                `}>
                    <a className="
                                group 
                                flex 
                                gap-2
                                hover:text-orange 
                                transition-colors 
                                duration-200 
                                ease-in-out"
                        href="/datenschutz"
                        title="Gehe zu Datenschutz"
                    >
                        <svg
                            className="stroke-white 
                                        group-hover:stroke-orange 
                                        transition-colors 
                                        duration-200 
                                        ease-in-out  
                                        shrink-0 w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {lang === "en" ? "Privacy Policy" : "Datenschutz"}
                    </a >
                    <div className="flex gap-2">
                        <div>
                            <CookieIcon style="fill-white" />
                        </div>
                        <span>{lang === "en"
                            ? "We use cookies to improve your online experience. By using our website, you accept our cookie policy."
                            : "Wir nutzen Cookies, um Ihr Online-Erlebnis zu verbessern. Durch die Nutzung unserer Website akzeptieren Sie unsere Cookie-Richtlinien."}
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <ShowCookieModal styles="w-44 xl:w-40">
                            {lang === "en"
                                ? "Advanced"
                                : "Erweitert"}
                        </ShowCookieModal>

                        <CookieBannerButton styles="w-44 xl:w-40" onClick={handleAcceptAll}>
                            {lang === "en"
                                ? "Accept"
                                : "Akzeptieren"}
                        </CookieBannerButton>
                    </div>
                </div>
                : ""}
        </>
    )
}

export default CookieBanner