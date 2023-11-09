import { useRef, useState, type KeyboardEventHandler, type SyntheticEvent } from "react";
import { urlFor, type SanityImage, type Lang } from "../../utils/utils";
import "../../styles/navbar.scss";
import { LanguageSwitch } from "./LanguageSwitch";

export type NavData = {
  logo: SanityImage,
  leftImage: SanityImage,
  rightImage: SanityImage,
}


type NavListProps = {
  pathname: string,
  path: { de: string, en: string },
  lang: Lang,
  title: string, styles?: string,
  checked: boolean,
  slideInAnimation: string,
  slideOutAnimation: string
  aria: { de: string, en: string }
}

type StripeProps = {
  checked: boolean,
  fullHeightAnimation: string,
  noHeightAnimation: string,
}

type NavImageProps = {
  styles: string,
  checked: boolean,
  slideInAnimation: string,
  slideOutAnimation: string,
  imgSrc: SanityImage,
  alt: string
}

type NavbarMenuProps = {
  pathname: string,
  navData: NavData,
  contactButtonText: string,
  lang: Lang
}

// nav links
const NavList = ({ pathname, path, title, styles, checked, slideInAnimation, slideOutAnimation, lang, aria }: NavListProps) => {
  const pathRegExDE = /\/\w*-*\w*/gi
  const pathRegExEN = /\/en\/?\w*-*\w*/gi
  const paths = lang === "en" ? pathname.match(pathRegExEN) ?? "" : pathname.match(pathRegExDE) ?? ""

  return (
    <li className="w-fit mb-6 xl:mb-8 cursor-pointer overflow-hidden focus-within:outline-1 focus-within:outline">
      <a href={lang === "en" ? path.en : path.de}
        aria-label={lang === "en" ? aria.en : aria.de}
        className={`inline-block text-3xl xl:text-8xl
        ${styles}
        ${checked ? `translate-y-[25vh] ${slideInAnimation}` : `translate-y-0 ${slideOutAnimation}`} 
        ${lang === "en"
            ? paths[0] === path.en
              ? "font-poppins"
              : "font-outline"
            : paths[0] === path.de
              ? "font-poppins"
              : "font-outline"}`}>
        {title}
      </a>
    </li>
  )
}

// overlay stripes
const Stripe = ({ checked = false, fullHeightAnimation, noHeightAnimation }: StripeProps) => {
  return (
    <div className={`w-1/5 bg-black ${checked ? `h-0 ${fullHeightAnimation}` : `h-screen ${noHeightAnimation}`}`}></div>
  )
}

//nav menu image 
const NavImage = ({ styles, checked, slideInAnimation, slideOutAnimation, imgSrc, alt }: NavImageProps) => {
  return (
    <img className={`xl:mt-12 h-[300px] xl:w-[500px] xl:h-[650px] object-cover ${styles} ${checked ? slideInAnimation : slideOutAnimation}`} src={urlFor(imgSrc).size(500, 650).url()} alt={alt} />
  )
}

// nav menu
const NavbarMenu = ({ pathname, navData, contactButtonText, lang }: NavbarMenuProps) => {
  const [checked, setChecked] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);

  // hamburger button
  const Hamburger = ({ handleMenu }: { handleMenu: () => void }) => {

    const handleKeyPress: KeyboardEventHandler<HTMLLabelElement> = (event) => {
      if (event.key === "Enter" && checked === true) {
        setChecked(false)
        handleMenu()
      } else if (event.key === "Enter") {
        setChecked(true)
        handleMenu()
      }
    }
    return (
      <label
        tabIndex={0}
        className="group w-8 h-8 mr-4 bg-transparent cursor-pointer relative"
        htmlFor="burger"
        role="menu"
        aria-expanded={checked}
        aria-controls="navlist"
        aria-label={lang === "en" ? "open/close nav-menu" : "öffne/schließe Navigationsmenü"}
        onClick={handleMenu}
        onKeyDown={handleKeyPress}>
        <input type="checkbox" className="sr-only peer" defaultChecked={checked} id="burger" />
        <span className={`block w-full h-0.5 bg-white group-hover:bg-orange hover:text-white transition-colors duration-200 ease-in-out rounded-lg absolute top-1/2 left-1/2 rotate-90 animate-[hamburgerMoveBack_0.4s_0.4s_ease-in-out_forwards] peer-checked:left-0 peer-checked:animate-[hamburgerMove_0.4s_ease-in-out_forwards]`}></span>
        <span className={`block w-full h-0.5 bg-white group-hover:bg-orange hover:text-white transition-colors duration-200 ease-in-out rounded-lg absolute top-1/2 left-1/2 rotate-90 animate-[hamburgerRotateBack_0.4s_ease-in-out_forwards] peer-checked:animate-[hamburgerRotate_0.4s_0.3s_ease-in-out_forwards]`}></span>
      </label>
    )
  }

  const handleMenu = () => {
    const overlay = overlayRef.current as HTMLDivElement;

    const menu = menuRef.current as HTMLDivElement;
    const menuList = menuListRef.current as HTMLUListElement;
    const body = document.querySelector("body") as HTMLBodyElement

    // toggle hamburger menu
    if (!checked) {
      const showMenu = () => {
        setChecked(true)
        body.style.overflow = "hidden"

        // show overlay and menu
        overlay.style.animation = "showOverlay 1s ease-in-out forwards";
        menu.style.display = "flex";
        menu.style.animation = "showNavMenu 1s 1s ease-in-out forwards"; // delay menu animation after overlay finished

        menuList.style.animation = "showNavMenu 1s 1s ease-in-out forwards";
      };

      requestAnimationFrame(showMenu);
    } else if (checked) {
      const hideMenu = () => {
        setChecked(false)
        body.style.overflow = "auto"

        // hide overlay after nav links animation
        overlay.style.visibility = "visible";
        overlay.style.animation = "hideOverlay 1s .8s ease-in-out forwards";
        menu.style.animation = "hideNavMenu 1.3s ease-in-out forwards";

        menuList.style.animation = "hideNavMenu .8s ease-in-out forwards";
      };

      requestAnimationFrame(hideMenu);
    }
  };

  // set main animation only on front page
  const styles = {
    logo:
      pathname === "/" || pathname === "/en"
        ? "translate-y-[30vh] animate-[slideIn30_1s_4.2s_ease-in-out_forwards] xl:animate-[slideIn_1s_4.2s_ease-in-out_forwards]"
        : "translate-y-[0]",
    nav:
      pathname === "/" || pathname === "/en"
        ? "translate-y-[40vh] animate-[slideInMob40_1s_4.5s_ease-in-out_forwards]"
        : "translate-y-0"
  };


  return (
    <header className="m-8 xl:mx-16 xl:mt-12 3xl:mx-24 3xl:mt-16 xl:mb-8">
      {/* nav bar */}
      <nav className="flex flex-col xl:flex-row gap-8 xl:gap-0 justify-between items-start">
        {navData.logo ? <a href={lang === "en" ? "/en" : "/"} aria-label={lang === "en" ? "go to home page" : "gehe zur Home Seite"}>
          <img
            width={100}
            height={22}
            className={`${styles.logo} motion-reduce:translate-y-0 motion-reduce:animate-none z-50 xl:z-0 relative`}
            src={urlFor(navData.logo).size(2560, 566).url()}
            alt="oh-teezy logo"
          />
        </a> : ""}

        <nav
          className={`w-full xl:w-auto flex items-center justify-between xl:justify-center gap-8 ${styles.nav} motion-reduce:translate-y-0 motion-reduce:animate-none`}
        >
          <a
            href={lang === "en" ? "/en/contact" : "/kontakt"}
            aria-label={lang === "en" ? "go to contact page" : "gehe zur Kontakt Seite"}
            className="w-44 text-sm xl:w-40 h-8 py-6 px-4 flex justify-center items-center bg-white text-black hover:bg-orange hover:text-white transition-colors duration-200 ease-in-out font-poppins rounded-full">
            {contactButtonText}
          </a>
          <LanguageSwitch pathname={pathname} lang={lang} />
          <Hamburger handleMenu={handleMenu} />
        </nav>

        {/* overlay */}
        <div className={`w-full h-[calc(100vh-136px)] xl:h-[calc(100vh-128px)] flex overflow-hidden invisible absolute top-[8.5rem] xl:top-32 left-0 z-30`} ref={overlayRef}>
          <Stripe checked={checked} fullHeightAnimation="animate-[fullHeight_0.5s_ease-in-out_forwards]" noHeightAnimation="animate-[noHeight_0.5s_.7s_ease-in-out_forwards]" />
          <Stripe checked={checked} fullHeightAnimation="animate-[fullHeight_0.5s_0.1s_ease-in-out_forwards]" noHeightAnimation="animate-[noHeight_0.5s_.8s_ease-in-out_forwards]" />
          <Stripe checked={checked} fullHeightAnimation="animate-[fullHeight_0.5s_0.2s_ease-in-out_forwards]" noHeightAnimation="animate-[noHeight_0.5s_.9s_ease-in-out_forwards]" />
          <Stripe checked={checked} fullHeightAnimation="animate-[fullHeight_0.5s_0.3s_ease-in-out_forwards]" noHeightAnimation="animate-[noHeight_0.5s_1.0s_ease-in-out_forwards]" />
          <Stripe checked={checked} fullHeightAnimation="animate-[fullHeight_0.5s_0.4s_ease-in-out_forwards]" noHeightAnimation="animate-[noHeight_0.5s_1.1s_ease-in-out_forwards]" />
        </div>

      </nav >

      {/* nav bar menu */}
      <div id="navlist" className="w-full h-[calc(100vh-136px)] xl:h-[calc(100vh-128px)] hidden invisible flex-col xl:flex-row xl:justify-between overflow-hidden absolute top-[8.5rem] xl:top-32 left-0 z-30" ref={menuRef} >
        <nav>
          <ul className="ml-8 xl:ml-16 mt-8 xl:mt-16 w-fit" ref={menuListRef}>
            <NavList
              lang={lang}
              checked={checked}
              title="Home"
              path={{ de: "/", en: "/en" }}
              pathname={pathname}
              aria={{ de: "gehe zur Home Seite", en: "go to home page" }}
              slideInAnimation="animate-[slideIn_.8s_.6s_ease-in-out_forwards]"
              slideOutAnimation="animate-[slideOut_.5s_ease-in-out_forwards]" />
            <NavList
              lang={lang}
              checked={checked}
              title="Work"
              path={{ de: "/work", en: "/en/work" }}
              pathname={pathname}
              aria={{ de: "gehe zur Work Seite", en: "go to work page" }}
              slideInAnimation="animate-[slideIn_.8s_.7s_ease-in-out_forwards]"
              slideOutAnimation="animate-[slideOut_.5s_.1s_ease-in-out_forwards]" />
            <NavList
              lang={lang}
              checked={checked}
              title={lang === "en" ? "About Me" : "Über Mich"}
              path={{ de: "/ueber-mich", en: "/en/about-me" }}
              pathname={pathname} styles="xl:leading-[6.5rem]"
              aria={{ de: "gehe zur über mich Seite", en: "go to about me page" }}
              slideInAnimation="animate-[slideIn_.8s_.8s_ease-in-out_forwards]"
              slideOutAnimation="animate-[slideOut_.5s_.2s_ease-in-out_forwards]" />
            <NavList
              lang={lang}
              checked={checked}
              title={lang === "en" ? "Contact" : "Kontakt"}
              path={{ de: "/kontakt", en: "/en/contact" }}
              pathname={pathname}
              aria={{ de: "gehe zur Kontakt Seite", en: "go to contact page" }}
              slideInAnimation="animate-[slideIn_.8s_.9s_ease-in-out_forwards]"
              slideOutAnimation="animate-[slideOut_.5s_.3s_ease-in-out_forwards]" />
          </ul>
        </nav>
        <div className="xl:mr-16 flex gap-8 md:justify-center">
          {navData.leftImage && navData.rightImage ? <>
            <NavImage
              styles="mx-8 xl:mx-0 w-full md:w-[300px]"
              slideInAnimation="translate-y-[100vh] animate-[slideInImage_.8s_1s_ease-in-out_forwards]"
              slideOutAnimation="translate-y-0 animate-[slideOutImage_.8s_.6s_ease-in-out_forwards]"
              imgSrc={navData.leftImage}
              alt="poster"
              checked={checked}
            />
            <NavImage
              styles="hidden md:block md:w-[300px]"
              slideInAnimation="translate-y-[100vh] animate-[slideInImage_.8s_1.1s_ease-in-out_forwards]"
              slideOutAnimation="translate-y-0 animate-[slideOutImage_.8s_.7s_ease-in-out_forwards]"
              imgSrc={navData.rightImage}
              alt="poster"
              checked={checked}
            />
          </> : ""}
        </div>
      </ div>
    </header>
  );
};

export default NavbarMenu;
