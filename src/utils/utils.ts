import imageUrlBuilder from '@sanity/image-url'

// language type
export type Lang = "de" | "en"

export interface SanityImage {
    _type: string,
    asset: {
        _ref: string;
        _type: string
    }
}

// sanity image builder
export const imageBuilder = imageUrlBuilder({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
});

export function urlFor(source: SanityImage) {
    return imageBuilder.image(source).auto('format').fit('max')
}

// set local storage
export function setLocalStorage(item: string, value: string) {
    if (!window) return console.error("no window defined")

    return localStorage.setItem(item, value)
}

// get local storage
export function getLocalStorage(item: string) {
    if (!window) return console.error("no window defined")

    return localStorage.getItem(item)
}

// set cookie
export const setCookie = (item: string, value: string) => {
    if (!window) return console.error("no window defined")

    return document.cookie = `${item}=${value}; max-age=31536000;Secure;SameSite=Strict`
}

// set cookie
export const getCookie = (item: string) => {
    if (!window) return console.error("no window defined")

    return document.cookie.split("; ")
        .find((row) => row.startsWith(item + "="))
        ?.split("=")[1]
}

// delete cookie
export const deleteCookie = (item: string) => {
    if (!window) return console.error("no window defined")

    return document.cookie = item + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
}

