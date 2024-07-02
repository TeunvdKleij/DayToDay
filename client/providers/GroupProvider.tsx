'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import cookies from "browser-cookies"
import { useRouter } from 'next/navigation';
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
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "Group/RemoveGroup", { Name: name }, { headers: { Authorization: `Bearer ${cookies.get("accessToken")}` } })
            .then(res => {
                getGroups();
            })
            .catch(error => {
                if(error.response.status === 401){
                    cookies.erase("accessToken")
                    router.push("/account")
                }
                toast.error("Group not removed")
            });
    }

    const addGroup = async (name: string) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "Group/AddGroup", { Name: name }, { headers: { Authorization: `Bearer ${cookies.get("accessToken")}` } })
            .then(res => {
                setGroupItem(name);
                localStorage.setItem('groupSelection', name);
                getGroups();
            })
            .catch(error => {
                if(error.response.status === 401){
                    cookies.erase("accessToken")
                    router.push("/account")
                }
                toast.error("Group not added")
            });
    }

    const getGroups = async () => {
        setLoading(true);
        await axios.get(process.env.NEXT_PUBLIC_API_URL + "Group/GetGroups", { headers: { Authorization: `Bearer ${cookies.get("accessToken")}` } })
            .then((res) => {
                setGroups(res.data.groups);
                let item = localStorage.getItem('groupSelection');
                setGroupItem(item ? item : res.data[0] ? res.data[0] : "");
            })
            .catch(error => {
                if(error.response.status === 401){
                    cookies.erase("accessToken")
                    router.push("/account")
                }
            });
        setLoading(false);
    }

    useEffect(() => {
        if(cookies.get("accessToken") != null)  getGroups();
    }, []);

    useEffect(() => {
        if (groups && groups.length > 0) {
            setLoading(false);
            let item = localStorage.getItem('groupSelection');
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