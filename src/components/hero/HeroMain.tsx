import  { type MouseEvent, type ReactNode,type RefObject, useRef } from "react";
import { urlFor, type SanityImage } from "../../utils/utils";

const SpanContainer = ({ children, styles }: { children: ReactNode, styles: string }) => {
    return (
        <span className={`block leading-none xl:leading-[6rem] overflow-hidden relative ${styles}`}>
            {children}
        </span>
    )
}

const Span = ({ children, styles }: { children: ReactNode, styles: string }) => {
    return (
        <span className={`inline-block w-fit h-full translate-y-[10vh] xl:translate-y-[25vh] overflow-hidden ${styles} motion-reduce:animate-[showVisibility_1s_5s_ease-in-out_forwards] motion-reduce:translate-y-0 motion-reduce:opacity-0 motion-reduce:invisible xl:motion-reduce:animate-[showVisibility_1s_5s_ease-in-out_forwards] xl:motion-reduce:translate-y-0 xl:motion-reduce:opacity-0 xl:motion-reduce:invisible`}>
            {children}
        </span>
    )
}

// outlined text with image on cursor
const SpanOutline = ({ children, styles, imageRef }: { children: ReactNode, styles: string, imageRef: RefObject<HTMLImageElement> }) => {

    //mouse-move on span -> display image
    const enterSpan = (event: MouseEvent) => {
        if (imageRef.current) {
            const image = imageRef.current as HTMLImageElement
            const showImage = () => {
                image.style.visibility = "visible"
                image.style.opacity = "1"
                image.style.transform = `translate(${event.clientX + 20}px, ${event.clientY + 20}px)`
                image.style.transition = "visibility .1s ease-in-out, opacity .2s ease-in-out"
            }
            requestAnimationFrame(showImage)
        }
    };

    const exitSpan = () => {
        if (imageRef.current) {
            const image = imageRef.current as HTMLImageElement
            const hideImage = () => {
                image.style.visibility = "hidden"
                image.style.opacity = "0"
                image.style.transition = "visibility .2s ease-in-out, opacity .2s ease-in-out"
            }
            requestAnimationFrame(hideImage)
        }
    }

    return (
        <span className={`font-outline inline-block w-fit h-full translate-y-[25vh] relative z-20 overflow-hidden ${styles} motion-reduce:animate-[showVisibility_1s_5s_ease-in-out_forwards] motion-reduce:translate-y-0 motion-reduce:opacity-0 motion-reduce:invisible xl:motion-reduce:animate-[showVisibility_1s_5s_ease-in-out_forwards] xl:motion-reduce:translate-y-0 xl:motion-reduce:opacity-0 xl:motion-reduce:invisible`} onMouseOut={exitSpan} onMouseMove={enterSpan}>
            {children}
        </span>
    )
}

const HeroMain = ({ image, heroText }: { image: SanityImage, heroText: {first: string, second: string, third: string, fourth: string} }) => {
    const imageRef = useRef<HTMLImageElement>(null)

    return (
        <>
            <h1 className="font-poppins py-32 md:pb-32 xl:pb-40 text-4xl md:text-6xl xl:text-8xl 3xl:text-9xl overflow-hidden relative bg-black">
                <SpanContainer styles="h-[4rem] md:h-[4.5rem] xl:h-[7.5rem] 3xl:h-[9rem]">
                    <Span styles="animate-[slideInMob_1s_4s_ease-in-out_forwards] xl:animate-[slideIn_1s_4s_ease-in-out_forwards]">{heroText?.first}</Span>
                </SpanContainer>
                <SpanContainer styles="h-[4rem] md:h-[4.5rem] xl:h-[7.5rem] 3xl:h-[9rem]">
                    <Span styles="animate-[slideInMob_1s_4.4s_ease-in-out_forwards] xl:animate-[slideIn_1s_4.4s_ease-in-out_forwards] 3xl:leading-[7rem]">{heroText?.second}</Span>
                </SpanContainer>
                <SpanContainer styles="h-[3rem] md:h-[4rem] xl:h-[6.5rem] 3xl:h-[7.5rem]">
                    <Span styles="animate-[slideInMob_1s_4.8s_ease-in-out_forwards] xl:animate-[slideIn_1s_4.8s_ease-in-out_forwards] leading-[2.5rem] md:leading-[4.5rem] xl:leading-[7rem] 3xl:leading-[9rem]">{heroText?.third}</Span>{" "}
                    <SpanOutline styles="hidden xl:inline-block animate-[slideInMob_1s_5.2s_ease-in-out_forwards] xl:animate-[slideIn_1s_5.2s_ease-in-out_forwards] leading-[2.5rem] md:leading-[4.5rem] xl:leading-[7rem] 3xl:leading-[9rem]" imageRef={imageRef} >{heroText?.fourth}</SpanOutline>
                    <Span styles="xl:hidden font-outline cursor-auto animate-[slideInMob_1s_5.2s_ease-in-out_forwards] xl:animate-[slideIn_1s_5.2s_ease-in-out_forwards] leading-[2.5rem] md:leading-[4.5rem] xl:leading-[7rem] 3xl:leading-[9rem]">{heroText?.fourth}</Span>
                </SpanContainer>
            </h1>
            <img width={2560} height={2560} className="hidden xl:inline-block xl:w-64 xl:h-64 absolute top-0 left-0 invisible opacity-0 z-20" src={urlFor(image).size(2560, 2560).url()} alt="poster" ref={imageRef} aria-hidden="true" />
        </>
    )
}

export default HeroMain