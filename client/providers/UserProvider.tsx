'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation';
interface UserProps {
    children: ReactNode,
}
interface UserContextProps {
    login: (email: string, password: string) => void
    register: (email: string, password: string, repeatPassword: string) => void
}

export const UserContext = createContext<UserContextProps>({
    login: () => {},
    register: () => {},
});

const UserProvider: React.FC<UserProps> = ({children}) => {
    const router = useRouter();

    const login = async (email: string, password: string) => {
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "User/Login", {Email: email, Password: password})
        .then(async res => {
            let accessToken = res.data.token;
            let expiresIn = res.data.expiresIn;
            Cookies.set('accessToken', accessToken, { expires: expiresIn, secure: true});
            router.push("/")
        })
        .catch(err => {
            toast.error("Could not login")
        })
    }
    const register = async (email: string, password: string, repeatPassword: string) =>{
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "User/Register", {Email: email, Password: password, RepeatedPassword: repeatPassword})
        .then(async res => {
            let accessToken = res.data.token;
            let expiresIn = res.data.expiresIn;
            Cookies.set('accessToken', accessToken, { expires: expiresIn, secure: true});
            router.push("/")
        })
        .catch(err => {
            toast.error("Could not register")
        })
    }

    return (
        <UserContext.Provider value={{
            login,
            register
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;