'use client'
import React, {createContext, ReactNode, useEffect, useState} from 'react';
interface MainProps {
    children: ReactNode,
}
interface MainContextProps {
    screenWidth: number | null
    theme: string
    setTheme: (value: string) => void
    replaceHTML: (input: string) => string
    validateEmail : (input: string) => boolean
    validatePassword : (input: string) => boolean
}

export const MainContext = createContext<MainContextProps>({
    screenWidth: 0,
    theme: "dark",
    setTheme: () => {},
    replaceHTML: () => "",
    validateEmail: () => false,
    validatePassword: () => false,
});

export enum ColorEnum {
    BLUE = "bg-blue-500",
    RED = "bg-red-500",
    LIGHTGREY = "bg-light-grey",
    GREY = "bg-grey",
    GREEN = "bg-green-500",
    NONE = ""
}

export const useMain = () => {
    return React.useContext(MainContext);
}

const MainProvider: React.FC<MainProps> = ({children}) => {
    const [screenWidth, setScreenWidth] = useState<number | null>(null);
    const [theme, setTheme] = useState<string>("dark");
    const [mainColor, setMainColor] = useState<string>('')


    useEffect(() => {
        if (typeof window !== 'undefined') {
          setScreenWidth(window.innerWidth);
          const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
          };
          window.addEventListener('resize', updateScreenWidth);
        }
        if(localStorage.getItem("theme") != null) {
            const theme : string = localStorage.getItem("theme") as string
            setTheme(theme)
        }
      }, []);
    const validateEmail = (email: string) => {
        if(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
            return true;
        }
        return false;
    };
    const validatePassword = (password: string) => {
        if(password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%/^&*()\-_=+{};:,<.>]).{12,128}$/)){
            return true;
        }
        return false;
    }

    const replaceHTML = (input: string) => {
        const htmlElements = [
            "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", 
            "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", 
            "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", 
            "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "i", 
            "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "meta", 
            "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", 
            "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", 
            "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", 
            "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", 
            "wbr"
        ];
        const pattern = new RegExp(`</?(${htmlElements.join('|')})[^>]*>`, 'gi');
        while (pattern.test(input)) {
            input = input.replace(pattern, '');
        }
        return input.trim();
    }

    return (
        <MainContext.Provider value={{
            screenWidth,
            theme,
            setTheme,
            replaceHTML,
            validateEmail,
            validatePassword
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainProvider;