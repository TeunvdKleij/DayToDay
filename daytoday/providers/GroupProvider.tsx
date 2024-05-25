'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useState} from 'react';
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
    getGroups: () => Promise<string[]>;
    setToggleBool: (toggle: boolean) => void,
    toggleBool: boolean
    lastGroupItem: string
    setLastGroupItem: (item: string) => void
}

export const GroupContext = createContext<GroupContextProps>({
    groupItem: "",
    setGroupItem: () => {},
    groups: [],
    setGroups: () => {},
    addGroup: () => {},
    removeGroup: () => {},
    getGroups: async () => [], 
    setToggleBool: () => {},
    toggleBool: false,
    lastGroupItem: "",
    setLastGroupItem: () => {}
});

const GroupProvider: React.FC<GroupProps> = ({children}) => {
    const [groupItem, setGroupItem] = useState<string>("")
    const [groups, setGroups] = useState<string[]>([]);
    const [toggleBool, setToggleBool] = useState<boolean>(false)
    const [lastGroupItem, setLastGroupItem] = useState<string>("")
    

    const removeGroup = async (name: string) => {
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "Group/RemoveGroup", {Name: name})
        .then(res => {
            return res.data
        })
        .catch(err => {
            toast.error("Group not removed")
            //console.log('Error:', err);
        })
        return result
    }

    const addGroup = async (name: string) => {
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "Group/AddGroup", {Name: name})
        .then(res => {
            setGroups(res.data.groups);
            return res.data
        })
        .catch(err => {
            toast.error("Group not added")
            console.log('Error:', err);
        })
        return result
     }
     const getGroups = async () => {
        let result: string[] = await axios.get(process.env.NEXT_PUBLIC_API_URL + "Group/GetGroups")
        .then(res => {
            return res.data.groups
        })
        .catch(error => {
            toast.error("No groups retrieved")
            //console.log('Error:', error);
        });
        return result
    }

    return (
        <GroupContext.Provider value={{
            groupItem,
            groups,
            addGroup,
            setGroupItem,
            setGroups,
            removeGroup,
            getGroups,
            setToggleBool,
            toggleBool,
            lastGroupItem,
            setLastGroupItem
        }}>
            {children}
        </GroupContext.Provider>
    )
}

export default GroupProvider;