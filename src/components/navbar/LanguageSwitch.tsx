import type { Lang } from "@utils/utils";

type LanguageSwitchProps = {
    pathname: string;
    lang: Lang
}

export const LanguageSwitch = ({ pathname, lang }: LanguageSwitchProps) => {
    // get correct path
    const paths: { [key: string]: string } = {
        "/": "/en",
        "/en": "/",
        "/work": "/en/work",
        "/en/work": "/work",
        "/work/corporate": "/en/work/corporate",
        "/en/work/corporate": "/work/corporate",
        "/work/sketch": "/en/work/sketch",
        "/en/work/sketch": "/work/sketch",
        "/work/poster": "/en/work/poster",
        "/en/work/poster": "/work/poster",
        "/ueber-mich": "/en/about-me",
        "/en/about-me": "/ueber-mich",
        "/kontakt": "/en/contact",
        "/en/contact": "/kontakt",
        "/impressum": "/en/legal",
        "/en/legal": "/impressum",
        "/datenschutz": "/en/privacy-policy",
        "/en/privacy-policy": "/datenschutz",
    };

    const url = paths[pathname] ?? "/"

    return (
        <a
            className="font-poppins 
                    hover:text-orange 
                    transition-colors 
                    duration-200 
                    ease-in-out"
            aria-label={lang === "en" ? "change language to german" : "wechsel Sprache zu Englisch"}
            href={url}
        >
            DE/EN
        </a>
    )
}