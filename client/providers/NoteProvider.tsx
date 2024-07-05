'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useState} from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie"
interface NoteProps {
    children: ReactNode,
}
interface NoteContextProps {
    noteText: string;
    setNoteText: (text: string) => void;
    getNoteForADay: (changed: any, groupItem: string) => void;
    updateNote: (changed: number, text: string, groupItem: string) => void;
    showNote: boolean;
    setShowNote: (toggle: boolean) => void;
    removeNotesByGroup: (name: string) => void
}

export const NoteContext = createContext<NoteContextProps>({
    noteText: "",
    setNoteText: () => {},
    getNoteForADay: () => {},
    updateNote: () => {},
    showNote: false,
    setShowNote: () => {},
    removeNotesByGroup: () => {},

});

const NoteProvider: React.FC<NoteProps> = ({children}) => {
    const [noteText, setNoteText] = useState<string>("")
    const [showNote, setShowNote] = useState<boolean>(false)
    const router = useRouter();

    
    const getNoteForADay = async (changedDate: number, groupItem: string) => {
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "Note/NoteForADay", {ChangedDate: changedDate, GroupName: groupItem}, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
            .then(res => {
                if(res.data.status == 200) {if(res.data.note.noteText != null) setNoteText(res.data.note.noteText);}
                if(res.data.status == 204) setNoteText("");
            })
            .catch(error => {
                if(error.response.status === 401){
                    Cookies.remove("accessToken")
                    router.push("/account")
                }
                setNoteText("")
            })

    }

    const removeNotesByGroup = async (name: string) => {
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "Note/RemoveNotesByGroup", {GroupName: name}, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
        .then(res => {
            return res.data
        })
        .catch(error => { 
            if(error.response.status === 401){
                Cookies.remove("accessToken")
                router.push("/account")
            }
            toast.error("Notes not removed")
        })
        return result
    }


    const updateNote = async (changedDate: number, noteText: string, groupItem: string) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "Note/UpdateNote", {ChangedDate: changedDate, NoteText: noteText, GroupName: groupItem}, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
        .catch(error => {
            if(error.response.status === 401){
                Cookies.remove("accessToken")
                router.push("/account")
            }
            toast.error("Note not updated")
        });
    }

    return (
        <NoteContext.Provider value={{
            noteText,
            setNoteText,
            getNoteForADay,
            updateNote,
            showNote,
            setShowNote,
            removeNotesByGroup,
        }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteProvider;