'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import cookies from 'browser-cookies'
import { GroupContext } from './GroupProvider';
import { TaskContext } from './TaskProvider';
import Cookies from "js-cookie"
interface UserProps {
    children: ReactNode,
}


export const UserContext = createContext<any>(null);


const UserProvider: React.FC<UserProps> = ({children}) => {
    const router = useRouter();
    const {getGroups, groups} = useContext(GroupContext);
    const [settings, setSettings] = useState({
        color: "#3b82f6",
        addTaskLeft: false,
        completeTaskLeft: false
      });

    useEffect(() => {
        if(Cookies.get("accessToken") == null) {
            router.push("/account");
        }
    }, []);  

    useEffect(() => {
        if(Cookies.get("accessToken") != null) getSettings();
    }, [Cookies.get("accessToken")]);

    const changeSettings = (newSettings: any) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...newSettings
        }));
    };
    
    useEffect(() => {
        updateSettings({CompleteTaskLeft: settings.completeTaskLeft})
    }, [settings.completeTaskLeft])

    useEffect(() => {
        updateSettings({AddTaskLeft: settings.addTaskLeft})
    }, [settings.addTaskLeft])

    const login = async (email: string, password: string) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "User/Login", {Email: email, Password: password})
        .then(async res => {
            let accessToken = res.data.token;
            let expiresIn = res.data.expiresIn;
            Cookies.set("accessToken", accessToken, {expires: expiresIn})
            while(Cookies.get("accessToken") == null){}
            setSettings(settings);
            router.push("/")
            getGroups();
        })
        .catch(err => {
            return false
        })
    }

    const register = async (email: string, password: string, repeatPassword: string) =>{
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "User/Register", {Email: email, Password: password, RepeatedPassword: repeatPassword})
        .then(async res => {
            let accessToken = res.data.token;
            let expiresIn = res.data.expiresIn;
            Cookies.set("accessToken", accessToken, { expires: expiresIn})
            while(Cookies.get("accessToken") == null){}
            router.push("/")
        })
        .catch(err => {
            return false
        })
    }
    const getSettings = async () => {
        await axios.get(process.env.NEXT_PUBLIC_API_URL + "User/Settings", { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
            .then(res => {
                setSettings(res.data);
            })
            .catch(error => {
                if(error.response.status === 401){
                    Cookies.remove("accessToken")
                }
            })
    }

    const updateSettings = async (body: object) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "User/Settings/Change", 
            body, 
            { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
            .then(res => {
                getSettings();
            })
            .catch(error => {
                if(error.response.status === 401){
                    Cookies.remove("accessToken")
                }
            })
    }

    return (
        <UserContext.Provider value={{
            login,
            register,
            settings,
            changeSettings,
            getSettings,
            updateSettings
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;