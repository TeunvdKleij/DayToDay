'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { TaskContext } from './TaskProvider';
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
        let result = await axios.post("https://localhost:7267/api/Note/NoteForADay", {ChangedDate: changedDate, GroupName: groupItem})
            .then(res => {
                if(res.data.status == 200) {if(res.data.note.noteText != null) setNoteText(res.data.note.noteText);}
                if(res.data.status == 204) setNoteText("");
            })
            .catch(error => {
                setNoteText("")
                console.log('Error:', error);
            })

    }

    const removeNotesByGroup = async (name: string) => {
        let result = await axios.post("https://localhost:7267/api/Note/RemoveNotesByGroup", {GroupName: name})
        .then(res => {
            return res.data
        })
        .catch(err => { 
            console.log('Error:', err);
        })
        return result
    }


    const updateNote = async (changedDate: number, noteText: string, groupItem: string) => {
        await axios.post('https://localhost:7267/api/Note/UpdateNote', {ChangedDate: changedDate, NoteText: noteText, GroupName: groupItem})
        .catch(error => {
            console.log('Error:', error);
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