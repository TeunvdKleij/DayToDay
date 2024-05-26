'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useEffect, useState} from 'react';
import is from "@sindresorhus/is";
import undefined = is.undefined;
import { toast } from 'react-toastify';
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

const GroupProvider: React.FC<GroupProps> = ({children}) => {
    const [groupItem, setGroupItem] = useState<string>("")
    const [groups, setGroups] = useState<string[]>([]);
    const [toggleDropDown, setToggleDropDown] = useState<boolean>(false)
    const [lastGroupItem, setLastGroupItem] = useState<string>("")
    const [loading, setLoading] = useState(true);

    const removeGroup = async (name: string) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "Group/RemoveGroup", { Name: name })
            .then(res => {
                getGroups();
            })
            .catch(err => {
                toast.error("Group not removed")
            });
    }

    const addGroup = async (name: string) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "Group/AddGroup", { Name: name })
            .then(res => {
                setGroupItem(name);
                localStorage.setItem('groupSelection', name);
                getGroups();
            })
            .catch(err => {
                toast.error("Group not added")
            });
    }

    const getGroups = async () => {
        setLoading(true);
        await axios.get(process.env.NEXT_PUBLIC_API_URL + "Group/GetGroups")
            .then((res) => {
                setGroups(res.data.groups);
                let item = localStorage.getItem('groupSelection');
                setGroupItem(item ? item : res.data[0] ? res.data[0] : "");
            })
            .catch(error => {
                toast.error("Groups not retrieved")
            });
        setLoading(false);
    }

    useEffect(() => {
        getGroups();
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