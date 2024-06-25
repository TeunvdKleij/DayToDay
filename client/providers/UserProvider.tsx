'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import {getCookie, setCookie} from "@/hooks/useCookie";
interface UserProps {
    children: ReactNode,
}


export const UserContext = createContext<any>(null);


const UserProvider: React.FC<UserProps> = ({children}) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const [settings, setSettings] = useState<any>({
        color: "bg-blue-500",
        addTaskLeft: false,
        completeTaskLeft: false
    })

    useEffect(() => {
        getSettings();
    }, [user]);

    const login = async (email: string, password: string) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "User/Login", {Email: email, Password: password})
        .then(async res => {
            let accessToken = res.data.token;
            let expiresIn = res.data.expiresIn;
            setCookie("accessToken", accessToken, expiresIn)
            setUser("")
            setSettings(settings);
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
            setCookie("accessToken", accessToken, expiresIn)
            router.push("/")
        })
        .catch(err => {
            toast.error("Could not register")
        })
    }
    const getSettings = async () => {
        await axios.get(process.env.NEXT_PUBLIC_API_URL + "User/Settings", { headers: { Authorization: `Bearer ${getCookie("accessToken")}` } })
            .then(res => {
                setSettings(res.data);
            })
            .catch(err => {
                toast.error("Could not find settings")
            })
    }

    const updateSettings = async () => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "User/Settings/Change", {
            color: settings?.color,
            addTaskLeft: settings?.addTaskLeft,
            completeTaskLeft: settings?.completeTaskLeft,
        }, { headers: { Authorization: `Bearer ${getCookie("accessToken")}` } })
            .then(res => {
                getSettings();
            })
            .catch(err => {
                toast.error("Could not update settings");
            })
    }

    useEffect(() => {
        if(getCookie("accessToken") !== null) {
            setUser(getCookie("accessToken"));
        } else {
            router.push("/account");
        }
    }, []);

    return (
        <UserContext.Provider value={{
            login,
            register,
            user,
            setUser,
            settings,
            setSettings,
            getSettings,
            updateSettings
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;