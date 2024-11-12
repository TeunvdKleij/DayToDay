'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import cookies from "browser-cookies"
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie"
interface GroupProps {
    children: ReactNode,
}
interface GroupContextProps {
    groupItem: string;
    setGroupItem: (value: string) => void;
    groups: string[];
    setGroups: (value: string[]) => void;
    addGroup: (name: string) => void;
    removeGroup: (name: string) => void;
    getGroups: () => Promise<void>;
    setToggleDropDown: (toggle: boolean) => void,
    toggleDropDown: boolean
    lastGroupItem: string
    setLastGroupItem: (item: string) => void
    loading: boolean,
}

export const GroupContext = createContext<GroupContextProps>({
    groupItem: "",
    setGroupItem: () => {},
    groups: [],
    setGroups: () => {},
    addGroup: () => {},
    removeGroup: () => {},
    getGroups: async () => {}, 
    setToggleDropDown: () => {},
    toggleDropDown: false,
    lastGroupItem: "",
    setLastGroupItem: () => {},
    loading: true,
});

export const useGroup = () => {
    return useContext(GroupContext);
}

const GroupProvider: React.FC<GroupProps> = ({children}) => {
    const [groupItem, setGroupItem] = useState<string>("")
    const [groups, setGroups] = useState<string[]>([]);
    const [toggleDropDown, setToggleDropDown] = useState<boolean>(false)
    const [lastGroupItem, setLastGroupItem] = useState<string>("")
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const removeGroup = async (name: string) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "Group/RemoveGroup", { Name: name }, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
            .then(res => {
                getGroups();
            })
            .catch(error => {
                if(error.response.status === 401){
                    Cookies.remove("accessToken")
                    router.push("/account")
                }
            });
    }

    const addGroup = async (name: string) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "Group/AddGroup", { Name: name }, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
            .then(res => {
                setGroupItem(name);
                if (typeof window !== "undefined") localStorage.setItem('groupSelection', name);
                getGroups();
            })
            .catch(error => {
                if(error.response.status === 401){
                    Cookies.remove("accessToken")
                    router.push("/account")
                }
    
            });
    }

    const getGroups = async () => {
        setLoading(true);
        await axios.get(process.env.NEXT_PUBLIC_API_URL + "Group/GetGroups", { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
            .then((res) => {
                setGroups(res.data.groups);
                let item;
                if (typeof window !== "undefined"){
                    item = localStorage.getItem('groupSelection');
                }
                setGroupItem(item ? item : res.data[0] ? res.data[0] : "");
            })
            .catch(error => {
                if(error.response.status === 401){
                    Cookies.remove("accessToken")
                    router.push("/account")
                }
            });
        setLoading(false);
    }

    useEffect(() => {
        if(Cookies.get("accessToken") != null)  getGroups();
    }, []);

    useEffect(() => {
        if (groups && groups.length > 0) {
            setLoading(false);
            let item;
            if(typeof window !== "undefined") item = localStorage.getItem('groupSelection');
            setGroupItem(item ? item : groups[0] ? groups[0] : "");
        }
    }, [groups]);

    return (
        <GroupContext.Provider value={{
            groupItem,
            groups,
            addGroup,
            setGroupItem,
            setGroups,
            removeGroup,
            getGroups,
            setToggleDropDown,
            toggleDropDown,
            lastGroupItem,
            setLastGroupItem,
            loading
        }}>
            {children}
        </GroupContext.Provider>
    )
}

export default GroupProvider;