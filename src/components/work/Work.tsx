import { useState } from 'react'
import type { Lang } from "@utils/utils";

type WorkLinkProps = {
    url: string;
    title: string;
    styles?: string;
    animation: string;
    lang: Lang;
    enterHover: () => void;
    exitHover: () => void;
}
//!
const WorkLink = ({ url, title, styles, animation, lang, enterHover, exitHover }: WorkLinkProps) => {
    return (
        <li className={`
        h-[3.5rem] 
        overflow-hidden 
        ${styles} 
        text-4xl 
        xl:text-5xl 
        cursor-pointer 
        hover:text-orange 
        transition-all 
        duration-200 
        ease-in-out 
        focus-visible:outline-1 
        focus-visible:outline`}
            onMouseEnter={enterHover}
            onMouseLeave={exitHover}>
            <a className={`inline-block translate-y-[25rem] ${animation} motion-reduce:translate-y-0 motion-reduce:animate-none`} href={`${lang === "en" ? "/en" : ""}${url}`}>{title}</a>
        </li>
    )
}

const Work = ({ lang }: { lang: Lang }) => {
    const [show, setShow] = useState<boolean>(false)

    const enterHover = () => {
        setShow(true)
    }
    const exitHover = () => {
        setShow(false)
    }

    return (
        <main
            className="
                        m-8 
                        xl:m-16 
                        flex 
                        justify-center 
                        items-center 
                        flex-grow 
                        font-poppins 
                        overflow-hidden"
        >
            <section aria-label={lang === "en" ? "Projects" : "Projekte"} className="flex justify-center items-center">
                <ul
                    className="
                                w-max 
                                h-fit 
                                grid 
                                place-content-center"
                >
                    <WorkLink
                        url="/work/corporate"
                        title="corporate"
                        styles="mb-6 md:mb-0 xl:mb-7"
                        animation="animate-[slideIn_1s_ease-in-out_forwards]"
                        lang={lang}
                        enterHover={enterHover}
                        exitHover={exitHover}
                        key="corporate"
                    />
                    <WorkLink
                        url="/work/sketch"
                        title="sketch"
                        styles="mb-6 md:mb-0 xl:mb-7"
                        animation="animate-[slideIn_1s_.2s_ease-in-out_forwards]"
                        lang={lang}
                        enterHover={enterHover}
                        exitHover={exitHover}
                        key="sketch"
                    />
                    <WorkLink
                        url="/work/poster"
                        title="poster"
                        animation="animate-[slideIn_1s_.4s_ease-in-out_forwards]"
                        lang={lang}
                        enterHover={enterHover}
                        exitHover={exitHover}
                        key="poster"
                    />
                </ul>
                <div className="w-16 h-full md:w-fit flex items-center justify-center">
                    <p className={`${show ? "text-orange" : ""} mb-2 h-full xl:mb-0 md:leading-none rotate-90 md:rotate-0 text-[3.1rem] md:text-[12rem] xl:text-[18rem] translate-x-[50vh] md:translate-x-[150vh] animate-[slideInRightRotated_1s_1s_ease-in-out_forwards] md:animate-[slideInRight_1s_1s_ease-in-out_forwards] motion-reduce:animate-none motion-reduce:translate-x-0 md:motion-reduce:animate-none md:motion-reduce:translate-x-0 tracking-wider uppercase transition-colors duration-200 ease-in-out`}>design</p>
                </div>
            </section>
        </main>
    )
}

export default Work