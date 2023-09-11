import { type ReactElement, type Ref, forwardRef, useEffect, useRef } from 'react';

import type { TransitionProps } from '@mui/material/transitions';
import { ThemeProvider, createTheme, Slide, DialogContent, Dialog } from "@mui/material";

import { setOpen, setShowBanner, useConsentStore } from "../../utils/store";
import { deleteCookie, getCookie, setCookie, setLocalStorage, type Lang } from "../../utils/utils";

// styles for dialog modal
const theme = createTheme({
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    padding: "1rem 0",
                    borderRadius: "0.5rem",
                    border: "1px solid #fff",
                    fontFamily: "Poppins",
                    backgroundColor: "#000",
                    color: "#fff"
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    width: "100%",
                    margin: "2rem 1rem 0 0",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    gap: "1rem",
                    '@media (max-width: 600px)': {
                        width: "auto",
                        margin: "1rem",
                        padding: 0,
                        flexDirection: "column-reverse",
                        alignItems: "center",
                    }
                },
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    margin: "1rem",
                    '@media (max-width: 600px)': {
                        margin: "0 1rem",
                        paddingBottom: "0"
                    }
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backdropFilter: "blur(3px)"
                }
            }
        }
    },
})

// transition for dialog
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// cookie icon for MUI buttons
export const CookieIcon = ({ style }: { style: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={`${style}`} width="24" height="24" viewBox="0 0 24 24"><path d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3.003-2.937.005-.034.016-.136.017-.17a.998.998 0 0 0-1.254-1.006A2.963 2.963 0 0 1 15 7c-1.654 0-3-1.346-3-3 0-.217.031-.444.099-.716a1 1 0 0 0-1.067-1.236A9.956 9.956 0 0 0 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-.049-.003-.097-.007-.16a1.004 1.004 0 0 0-.395-.776zM12 20c-4.411 0-8-3.589-8-8a7.962 7.962 0 0 1 6.006-7.75A5.006 5.006 0 0 0 15 9l.101-.001a5.007 5.007 0 0 0 4.837 4C19.444 16.941 16.073 20 12 20z" /><circle cx="12.5" cy="11.5" r="1.5" /><circle cx="8.5" cy="8.5" r="1.5" /><circle cx="7.5" cy="12.5" r="1.5" /><circle cx="15.5" cy="15.5" r="1.5" /><circle cx="10.5" cy="16.5" r="1.5" /></svg>)

// set functional, analytics and advertisement cookies
export const setCookies = (functionalChecked?: boolean, analyticChecked?: boolean, advertisementChecked?: boolean) => {
    if (functionalChecked) {
        setCookie("cookie-functional", "true")
    } else {
        deleteCookie("cookie-functional")
    };

    if (analyticChecked) {
        setCookie("cookie-analytics", "true")
    } else {
        deleteCookie("cookie-analytics")
    };

    if (advertisementChecked) {
        setCookie("cookie-advertisement", "true")
    } else {
        deleteCookie("cookie-advertisement")
    };
}

export default function CookieModal({ lang }: { lang: Lang }) {
    const open = useConsentStore(state => state.open) // open state for dialog modal
    const functionalRef = useRef<HTMLInputElement>(null)
    const analyticsRef = useRef<HTMLInputElement>(null)
    const advertisementRef = useRef<HTMLInputElement>(null)

    const functional = functionalRef?.current
    const analytic = analyticsRef?.current
    const advertisement = advertisementRef?.current

    // close modal
    const handleClose = () => {
        setOpen(false);
    };

    // get cookies and set input checked when modal open
    useEffect(() => {
        const functionalCookie = getCookie("cookie-functional")
        const analyticsCookie = getCookie("cookie-analytics")
        const advertisementCookie = getCookie("cookie-advertisement")

        if (!!functionalCookie && functional) functional.checked = !!functionalCookie
        if (!!analyticsCookie && analytic) analytic.checked = !!analyticsCookie
        if (!!advertisementCookie && advertisement) advertisement.checked = !!advertisementCookie

    }, [open, functional, analytic, advertisement])


    // set user cookie settings
    const handleAcceptSettings = () => {
        const functionalChecked = functional?.checked
        const analyticChecked = analytic?.checked
        const advertisementChecked = advertisement?.checked

        setLocalStorage("consent", "partial")

        setCookies(functionalChecked, analyticChecked, advertisementChecked)

        setOpen(false)
        setShowBanner(false)
    }

    // accept all cookies
    const handleAcceptAll = () => {
        setLocalStorage("consent", "granted")

        setCookies(true, true, true)

        setOpen(false)
        setShowBanner(false)
    }

    // deny all cookies
    const handleDeny = () => {
        setLocalStorage("consent", "denied")

        setCookies()

        if (functional?.checked) functional.checked = false
        if (analytic?.checked) analytic.checked = false
        if (advertisement?.checked) advertisement.checked = false

        setOpen(false)
        setShowBanner(false)
    }

    const data = {
        headline: lang === "en"
            ? "Cookie Settings"
            : "Cookie Einstellungen",
        requiredCookieHeadline: lang === "en"
            ? "Required Cookies"
            : "Erforderliche Cookie",
        requiredCookieText: lang === "en"
            ? "Required cookies help make a website usable by enabling basic functions such as page navigation and access to secure areas of the website. Without these cookies, the website cannot function properly."
            : "Erforderliche Cookies helfen dabei, eine Website nutzbar zu machen, indem sie grundlegende Funktionen wie die Seitennavigation und den Zugang zu sicheren Bereichen der Website ermöglichen. Ohne diese Cookies kann die Website nicht richtig funktionieren.",
        functionalCookieHeadline: lang === "en"
            ? "Functional Cookies"
            : "Funktionale Cookies",
        functionalCookieText: lang === "en"
            ? "Preference cookies allow a website to store information that changes the behavior or appearance of the website, such as your preferred language."
            : "Mit Hilfe von Präferenz-Cookies kann eine Website Informationen speichern, die das Verhalten oder das Aussehen der Website verändern, z. B. Ihre bevorzugte Sprache.",
        analyticsCookieHeadline: lang === "en"
            ? "Analytics Cookie"
            : "Analyse Cookies",
        analyticsCookieText: lang === "en"
            ? "Analytics cookies help website operators understand how visitors interact with websites by collecting and reporting information anonymously."
            : "Analytics-Cookies helfen Website-Betreibern zu verstehen, wie Besucher mit Websites interagieren, indem sie Informationen anonym sammeln und melden.",
        advertisingCookieHeadline: lang === "en"
            ? "Advertising cookies"
            : "Werbe Cookies",
        advertisingCookieText: lang === "en"
            ? "Our website only uses an advertising cookie for Google Analytics. This cookie helps us analyze user interactions with ads and measure the effectiveness of our advertising campaigns. No personal data is collected or shared."
            : "Unsere Website verwendet ausschließlich ein Werbe-Cookie für Google Analytics. Dieses Cookie hilft uns, die Interaktionen der Benutzer mit Anzeigen zu analysieren und die Wirksamkeit unserer Werbekampagnen zu messen. Keine personenbezogenen Daten werden erfasst oder weitergegeben."
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="cookie-preference-setting"
                >
                    <button onClick={handleClose} className="absolute top-4 right-4 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" width="35" height="35" viewBox="0 0 24 24">
                            <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z" />
                            <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z" />
                        </svg>
                    </button>
                    <h1 className="my-4 text-center text-4xl font-bold tracking-widest" id="cookie-preference-setting">{data?.headline}</h1>
                    <DialogContent>
                        <form>
                            <fieldset>
                                <label className="cursor-pointer daisy_label mb-2 mt-4 font-bold">
                                    <span className="daisy_label-text text-white text-xl">{data?.requiredCookieHeadline}</span>
                                    <input type="checkbox" name="checkbox" className="daisy_checkbox daisy_checkbox-primary" checked disabled />
                                </label>
                                <p className="w-4/5 ml-3">{data?.requiredCookieText}</p>
                            </fieldset>
                            <fieldset>
                                <label className="cursor-pointer daisy_label mb-2 mt-4 font-bold">
                                    <span className="daisy_label-text text-white text-xl">{data?.functionalCookieHeadline}</span>
                                    <input type="checkbox" name="checkbox" className="daisy_checkbox daisy_checkbox-primary" ref={functionalRef} />
                                </label>
                                <p className="w-4/5 ml-3">{data?.functionalCookieText}</p>
                            </fieldset>
                            <fieldset>
                                <label className="cursor-pointer daisy_label mb-2 mt-4 font-bold">
                                    <span className="daisy_label-text text-white text-xl">{data?.analyticsCookieHeadline}</span>
                                    <input type="checkbox" name="checkbox" className="daisy_checkbox daisy_checkbox-primary" ref={analyticsRef} />
                                </label>
                                <p className="w-4/5 ml-3">{data?.analyticsCookieText}</p>
                            </fieldset>
                            <fieldset>
                                <label className="cursor-pointer daisy_label mb-2 mt-4 font-bold">
                                    <span className="daisy_label-text text-white text-xl">{data?.advertisingCookieHeadline}</span>
                                    <input type="checkbox" name="checkbox" className="daisy_checkbox daisy_checkbox-primary" ref={advertisementRef} />
                                </label>
                                <p className="w-4/5 ml-3">{data?.advertisingCookieText}</p>
                            </fieldset>
                        </form>
                    </DialogContent>
                    <div className="p-4 flex flex-col lg:flex-row-reverse lg:justify-center gap-4">
                        <button className="group text-sm h-8 py-6 px-4 flex justify-center items-center gap-1 bg-white text-black hover:bg-orange hover:text-white transition-colors duration-200 ease-in-out font-poppins rounded-full" onClick={handleAcceptAll}>
                            {lang === "en" ? "Accept" : "Akzeptiere"}
                            <CookieIcon style="fill-black group-hover:fill-white transition duration-300 ease-in-out" />
                        </button>
                        <button className="group whitespace-nowrap text-sm h-8 py-6 px-4 flex justify-center items-center gap-1 bg-white text-black hover:bg-orange hover:text-white transition-colors duration-200 ease-in-out font-poppins rounded-full" onClick={handleAcceptSettings}>
                            {lang === "en" ? "Save Settings" : "Speichere Einstellung"}
                            <CookieIcon style="fill-black group-hover:fill-white transition duration-300 ease-in-out" />
                        </button>
                        <button className="group text-sm h-8 py-6 px-4 flex justify-center items-center gap-1 bg-white text-black hover:bg-orange hover:text-white transition-colors duration-200 ease-in-out font-poppins rounded-full" onClick={handleDeny}>
                            {lang === "en" ? "Deny" : "Ablehnen"}
                            <CookieIcon style="fill-black group-hover:fill-white transition duration-300 ease-in-out" />
                        </button>
                    </div>
                </Dialog>
            </ThemeProvider>
        </>
    );
}