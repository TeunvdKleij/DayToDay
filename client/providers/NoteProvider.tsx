'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useState} from 'react';
import { toast } from 'react-toastify';
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

    
    const getNoteForADay = async (changedDate: number, groupItem: string) => {
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "Note/NoteForADay", {ChangedDate: changedDate, GroupName: groupItem})
            .then(res => {
                if(res.data.status == 200) {if(res.data.note.noteText != null) setNoteText(res.data.note.noteText);}
                if(res.data.status == 204) setNoteText("");
            })
            .catch(error => {
                setNoteText("")
                toast.error("Note not retrieved")
            })

    }

    const removeNotesByGroup = async (name: string) => {
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "Note/RemoveNotesByGroup", {GroupName: name})
        .then(res => {
            return res.data
        })
        .catch(err => { 
            toast.error("Notes not removed")
        })
        return result
    }


    const updateNote = async (changedDate: number, noteText: string, groupItem: string) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "Note/UpdateNote", {ChangedDate: changedDate, NoteText: noteText, GroupName: groupItem})
        .catch(error => {
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