'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
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
}

export const GroupContext = createContext<GroupContextProps>({
    groupItem: "Home",
    setGroupItem: () => {},
    groups: [],
    setGroups: () => {},
    addGroup: () => {},
    removeGroup: () => {},
    getGroups: async () => [], 
});

const GroupProvider: React.FC<GroupProps> = ({children}) => {
    const [groupItem, setGroupItem] = useState<string>("")
    const [groups, setGroups] = useState<string[]>([]);
    

    const removeGroup = (name: string) => {
        let result = axios.post("https://localhost:7267/api/Group/RemoveGroup", {Name: name})
        .then(res => {
             result = res.data
        })
        .catch(err => {
             console.log('Error:', err);
        })
        return result
    }

    const addGroup = (name: string) => {
        let result = axios.post("https://localhost:7267/api/Group/AddGroup", {Name: name})
        .then(res => {
             result = res.data
             setGroups(res.data.groups);
        })
        .catch(err => {
             console.log('Error:', err);
        })
        return result
     }
     const getGroups = async () => {
        let result: string[] = await axios.get('https://localhost:7267/api/Group/GetGroups')
        .then(res => {
            return res.data.groups
        })
        .catch(error => {
            console.log('Error:', error);
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
            getGroups
        }}>
            {children}
        </GroupContext.Provider>
    )
}

export default GroupProvider;