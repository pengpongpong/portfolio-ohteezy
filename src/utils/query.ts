import { useSanityClient } from "@sanity/astro";
import groq from "groq";

// get home
export async function getHome() {
    const query = groq`*[_type == "home"][0]{
        image,
        imageAboutMe,
        imageAboutMeDesktop,
        seo
    }`;
    const doc = await useSanityClient().fetch(query);
    return doc;
}

//  get about-me
export async function getAboutMe() {
    const query = groq`*[_type == "aboutMe"][0]{
        profileImage,
        bio,
        bioEN,
        signatureImage,
        seo
    }`;
    const doc = await useSanityClient().fetch(query);
    return doc;
}

// get work
export async function getWork() {
    const query = groq`*[_type == "work"][0]{
        seo
    }`;
    const doc = await useSanityClient().fetch(query);
    return doc;
}

//  get work-corporate
export async function getWorkCorporate() {
    const query = groq`*[_type == "workCorporate"][0]{
        projects,
        seo
    }`;
    const doc = await useSanityClient().fetch(query);
    return doc;
}

// get work-poster
export async function getWorkPoster() {
    const query = groq`*[_type == "workPoster"][0]{
        poster,
        seo
    }`;
    const doc = await useSanityClient().fetch(query);
    return doc;
}

// get work-sketch
export async function getWorkSketch() {
    const query = groq`*[_type == "workSketch"][0]{
        sketch,
        seo
    }`;
    const doc = await useSanityClient().fetch(query);
    return doc;
}

// get contact
export async function getContact(seo: boolean) {
    const query = seo === true
        ? groq`*[_type == "contact"][0]{
        email,
        instagram,
        linkedIn,
        seo
    }`
        : groq`*[_type == "contact"][0]{
        email,
        instagram,
        linkedIn,
    }`;
    const doc = await useSanityClient().fetch(query);
    return doc;
}

// get navbar
export async function getNavbar() {
    const query = groq`*[_type == "navbar"][0]{
        logo,
        leftImage,
        rightImage
    }`;
    const doc = await useSanityClient().fetch(query);
    return doc;
}
