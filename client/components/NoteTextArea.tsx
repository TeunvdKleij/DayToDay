import { TaskContext } from "@/providers/TaskProvider";
import { useContext, useEffect, useState } from "react";
import { NoteContext } from "@/providers/NoteProvider";
import { GroupContext } from "@/providers/GroupProvider";

const NoteTextArea = () => {
    const {changedDate} = useContext(TaskContext);
    const {setNoteText, noteText, updateNote} = useContext(NoteContext);
    const {groupItem} = useContext(GroupContext)
    const [text, setText] = useState("noteText");
    const [height, setHeight] = useState(240);


    useEffect(() => {
        const lines = calcLines(text);
        setHeight(26*lines);
    }, [text])

    useEffect(() => {
        setText(noteText);
    }, [noteText])
    
    const calcLines = (text: string) => {
        return (text.match(/\n/g) || []).length;
    }

    const onBlurChanges = (event: any) => {
        setNoteText(event.target.value);
        updateNote(changedDate, event.target.value, groupItem)
    }
    const changeTextArea = (event: any) => {
        setText(event.target.value);
      }

    return (
        <div>
            <textarea id="noteTextarea" onChange={changeTextArea} onBlur={onBlurChanges} className="bg-eerie-black w-full min-h-60" value={text} style={{height: height}}></textarea>
        </div> 
    );
}
export default NoteTextArea;

