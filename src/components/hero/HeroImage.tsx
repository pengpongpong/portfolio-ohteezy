import { urlFor, type SanityImage } from "@utils/utils"

export const HeroImage = ({ image }: { image: SanityImage }) => {
    return (
        <img
            className="
                        hidden
                        xl:block
                        absolute
                        w-[500px]
                        h-[500px]
                        top-50
                        right-[-15rem]
                        z-50
                        translate-x-[150vh]
                        animate-[slideInRight_1s_5s_ease-in-out_forwards]"
            src={urlFor(image).size(2560, 2560).url()}
        />
    )
}