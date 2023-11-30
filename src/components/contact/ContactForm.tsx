import { useState } from 'react'

import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import type { Lang } from "@utils/utils"

import PropagateLoader from "react-spinners/PropagateLoader"


const ErrorText = ({ text }: { text?: string }) => {
    return <p className="mb-2 font-text text-error text-center">{text}</p>
}

// telephone check
const phoneRegex = /(?:\+?\d{1,3}\s?)?(?:(?:\(\d{1,}\)|\d{1,})[-.\s]?\d{1,}[-.\s]?\d{1,}|(?:\d{1,}[-.\s]?){3,}\d{1,})\s?(?:#|x|ext)\s?\d{1,}|(?:\d{1,}[-.\s]?){3,}\d{1,}/g;

const ContactForm = ({ api, url, lang }: { api: string, url: string, lang: Lang }) => {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    // error messages
    const errorMessage = {
        name: lang === "en"
            ? "Please enter your name"
            : "Bitte Name eintragen",
        select: lang === "en"
            ? "Please choose contact method"
            : "Bitte Kontaktform auswählen",
        email: lang === "en"
            ? "Invalid email"
            : "Ungültige Email",
        call: lang === "en"
            ? "Invalid phone number"
            : "Ungültige Telefonnummer",
    }

    // schema validation
    const schema = yup.object({
        name: yup.string().required(errorMessage.name),
        select: yup.string().required(errorMessage.select),
        email: yup.string().email(errorMessage.email).when("select", {
            is: "email",
            then: (email) => email.required(errorMessage.email),
            otherwise: (email) => email.notRequired()
        }),
        call: yup.string().when("select", {
            is: "call",
            then: (call) => call.matches(phoneRegex, errorMessage.call).required(errorMessage.call),
            otherwise: (call) => call.notRequired()
        }),
        message: yup.string(),
    })

    // get react hook form
    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            select: "",
            email: "",
            call: "",
            message: "",
        }
    })

    // watch select element to render email or phone input conditionally
    const watchSelect = watch("select", "")

    // submit data
    const onSubmit = handleSubmit((data) => {
        (async () => {
            setLoading(true)
            await fetch(url, {
                method: "POST", body: JSON.stringify({
                    data
                }), headers: {
                    "x-api-key": api
                }
            })
                .then(res => res.json())
                .then(result => {
                    const { message } = JSON.parse(result.body)

                    // handle error
                    if (message === "Required fields missing") {
                        const error = lang === "en" ? "Error - Required fields missing!" : "Fehler - Erforderliche Felder fehlen!"
                        setMessage(error)
                        setLoading(false)
                    } else if (message === "Invalid email") {
                        const error = lang === "en" ? "Error - Invalid email!" : "Fehler - Ungültige Email!"
                        setMessage(error)
                        setLoading(false)

                        // handle success
                    } else if (message === "success") {
                        const success = lang === "en" ? "Message sent!" : "Kontaktanfrage gesendet!"
                        setMessage(success)
                        reset()
                        setLoading(false)
                    }
                })
        })()
    })

    const styles = {
        input: "p-3 px-4 focus:ring-1 ring-orange ring-offset-2 ring-offset-black outline-none rounded-xl w-full border border-white bg-black text-white placeholder-white"
    }

    return (
        <form onSubmit={onSubmit} className="max-w-[600px]">
            <fieldset className="font-text flex flex-col gap-4">
                <label htmlFor="name">Name</label>
                <input type="text" placeholder={lang === "en" ? "Your name" : "Dein Name"} autoComplete="name" className={`${styles.input}`} {...register("name")} />
                {errors?.name && <ErrorText text={errors?.name?.message} />}

                <Controller
                    control={control}
                    name="select"
                    render={({ field: { onChange } }) => (
                        <>
                            <label htmlFor="select">{lang === "en" ? "How would you like to be contacted?" : "Wie möchtest du kontaktiert werden?"}</label>
                            <select name="type" className={`${styles.input} appearance-none selectArrow`} onChange={onChange} defaultValue={lang === "en" ? "How would you like to be contacted?" : "Wie möchtest du kontaktiert werden?"}>
                                <option disabled>{lang === "en" ? "How would you like to be contacted?" : "Wie möchtest du kontaktiert werden?"}</option>
                                <option value="email">Email</option>
                                <option value="call">{lang === "en" ? "Call" : "Anruf"}</option>
                            </select>
                            {errors?.select && <ErrorText text={errors?.select?.message} />}
                        </>
                    )}
                />

                {watchSelect === "email" ? <input type="text" placeholder={lang === "en" ? "your@email.com" : "deine@email.com"} autoComplete="email" className={`${styles.input}`} {...register("email")} /> : ""}
                {errors?.email && <ErrorText text={errors?.email?.message} />}

                {watchSelect === "call" ? <input type="text" placeholder={lang === "en" ? "Your phone number" : "Deine Telefonnummer"} autoComplete="tel" className={`${styles.input}`} {...register("call")} /> : ""}
                {errors?.call && watchSelect && <ErrorText text={errors?.call?.message} />}
                <label htmlFor="message">{lang === "en" ? "Leave me a message" : "Hinterlasse mir eine Nachricht"}</label>
                <textarea className={`${styles.input}`} rows={6} placeholder={lang === "en" ? "Leave me a message" : "Hinterlasse mir eine Nachricht"} {...register("message")} />
            </fieldset>

            <button className="w-full p-3 mt-12 border rounded-full bg-white text-black box-shadow tracking-wider hover:bg-orange hover:text-white hover:border-orange transition-color duration-300 ease-in-out" type="submit">{lang === "en" ? "Send" : "Abschicken"}</button>
            {loading ? <div className="mt-4 flex justify-center items-center">
                <PropagateLoader color="rgb(253, 81, 49)" />
            </div> : null}
            {message !== "" ? <p className="text-center my-4 tracking-wide font-text">{message}</p> : ""}
        </form>
    )
}

export default ContactForm