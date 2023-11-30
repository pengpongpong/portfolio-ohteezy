import { type MouseEvent, type TouchEvent, type ReactNode, type RefObject, useRef } from "react";
import { urlFor, type SanityImage } from "@utils/utils";

const SpanContainer = ({ children, styles }: { children: ReactNode, styles: string }) => {
    return (
        <span
            className={`
                    block 
                    relative 
                    overflow-hidden 
                    leading-none 
                    xl:leading-[6rem] 
                    ${styles}`}
        >
            {children}
        </span>
    )
}

const Span = ({ children, styles }: { children: ReactNode, styles: string }) => {
    return (
        <span
            className={`
                    w-fit 
                    h-full
                    inline-block 
                    overflow-hidden 
                    translate-y-[10vh] 
                    xl:translate-y-[25vh] 
                    ${styles} 
                    motion-reduce:animate-[showVisibility_1s_5s_ease-in-out_forwards] 
                    motion-reduce:translate-y-0 
                    motion-reduce:opacity-0 
                    motion-reduce:invisible 
                    xl:motion-reduce:animate-[showVisibility_1s_5s_ease-in-out_forwards] 
                    xl:motion-reduce:translate-y-0 
                    xl:motion-reduce:opacity-0 
                    xl:motion-reduce:invisible`}
        >
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

    //touch-move on span -> display image and hide after timeout
    const enterSpanTouch = (event: TouchEvent) => {
        if (imageRef.current) {
            const image = imageRef.current as HTMLImageElement

            const hideImage = () => {
                image.style.visibility = "hidden"
                image.style.opacity = "0"
                image.style.transition = "visibility .2s .2s ease-in-out, opacity .2s ease-in-out"
            }

            const showImage = () => {
                image.style.visibility = "visible"
                image.style.opacity = "1"
                image.style.transform = `translate(${event.touches[0].clientX + 20}px, ${event.touches[0].clientY + 20}px)`
                image.style.transition = "visibility .1s ease-in-out, opacity .2s .1s ease-in-out"

                setTimeout(() => {
                    hideImage()
                }, 1500)
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
        <span
            className={`
                    inline-block 
                    w-fit 
                    h-full 
                    translate-y-[25vh] 
                    relative 
                    z-20 
                    overflow-hidden 
                    font-outline
                    select-none
                    ${styles} 
                    motion-reduce:animate-[showVisibility_1s_5s_ease-in-out_forwards] 
                    motion-reduce:translate-y-0 
                    motion-reduce:opacity-0 
                    motion-reduce:invisible 
                    xl:motion-reduce:animate-[showVisibility_1s_5s_ease-in-out_forwards] 
                    xl:motion-reduce:translate-y-0 
                    xl:motion-reduce:opacity-0 
                    xl:motion-reduce:invisible`}
            onMouseOut={exitSpan}
            onMouseMove={enterSpan}
            onTouchStart={enterSpanTouch}
        >
            {children}
        </span>
    )
}

const HeroMain = ({ image, heroText }: { image: SanityImage, heroText: { first: string, second: string, third: string, fourth: string } }) => {
    const imageRef = useRef<HTMLImageElement>(null)

    return (
        <>
            <h1
                className="
                        pt-32
                        pb-12 
                        md:pb-32 
                        xl:pb-40 
                        overflow-hidden 
                        relative
                        font-poppins
                        text-4xl 
                        md:text-6xl 
                        xl:text-8xl 
                        3xl:text-9xl 
                        bg-black"
            >
                <SpanContainer
                    styles="
                        h-[4rem] 
                        md:h-[4.5rem] 
                        xl:h-[7.5rem] 
                        3xl:h-[9rem]"
                >
                    <Span
                        styles="
                            animate-[slideInMob_1s_4s_ease-in-out_forwards] 
                            xl:animate-[slideIn_1s_4s_ease-in-out_forwards]"
                    >
                        {heroText?.first}
                    </Span>
                </SpanContainer>
                <SpanContainer
                    styles="
                        h-[4rem] 
                        md:h-[4.5rem] 
                        xl:h-[7.5rem] 
                        3xl:h-[9rem]"
                >
                    <Span
                        styles="
                            3xl:leading-[7rem]
                            animate-[slideInMob_1s_4.4s_ease-in-out_forwards] 
                            xl:animate-[slideIn_1s_4.4s_ease-in-out_forwards]"
                    >
                        {heroText?.second}
                    </Span>
                </SpanContainer>
                <SpanContainer
                    styles="
                        h-[3rem] 
                        md:h-[4rem] 
                        xl:h-[6.5rem] 
                        3xl:h-[7.5rem]"
                >
                    <Span styles="
                                leading-[2.5rem] 
                                md:leading-[4.5rem] 
                                xl:leading-[7rem] 
                                3xl:leading-[9rem]
                                animate-[slideInMob_1s_4.8s_ease-in-out_forwards] 
                                xl:animate-[slideIn_1s_4.8s_ease-in-out_forwards]"
                    >
                        {heroText?.third}
                    </Span>{" "}
                    <SpanOutline styles="
                                        leading-[2.5rem] 
                                        md:leading-[4.5rem] 
                                        xl:leading-[7rem] 
                                        3xl:leading-[9rem]
                                        animate-[slideInMob_1s_5.2s_ease-in-out_forwards] 
                                        xl:animate-[slideIn_1s_5.2s_ease-in-out_forwards]"
                        imageRef={imageRef}
                    >
                        {heroText?.fourth}
                    </SpanOutline>
                </SpanContainer>
            </h1>
            <img
                width={2560}
                height={2560}
                className="
                        w-44
                        h-44
                        xl:w-64 
                        xl:h-64 
                        xl:inline-block 
                        absolute 
                        top-0 
                        left-0 
                        invisible 
                        opacity-0 
                        z-20"
                src={urlFor(image).size(2560, 2560).url()}
                alt="poster"
                ref={imageRef}
                aria-hidden="true" />
        </>
    )
}

export default HeroMain