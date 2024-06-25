import {useEffect} from "react";

export const setCookie = (name : any, value : any, expires: any) => {
    if(value == null) document.cookie = getCookie(name) + "=; Max-Age=-99999999;"
    document.cookie = name + "=" + (value || "") + expires + "; path=/;"; // Add "Secure" later
}

export const getCookie = (cookieName : any) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === cookieName) {
            return cookie[1];
        }
    }
    return null; // Cookie not found
}

