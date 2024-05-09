import { TaskContext } from "@/providers/TaskProvider";
import { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import RichTextEditor from "./richTextEditor";


const Note = () => {
    const {setNoteText, noteText, updateNote, changedDate, groupItem} = useContext(TaskContext);
    const [text, setText] = useState(noteText);
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

    const changeTextArea = (event: any) => {
        setText(event.target.value);
    }
    const onBlurChanges = (event: any) => {
        setNoteText(event.target.value);
        updateNote(changedDate, event.target.value, groupItem)
    }

    return (
        <div>
            {/* <RichTextEditor/> */}
            <textarea onChange={changeTextArea} onBlur={onBlurChanges} className="bg-eerie-black w-full min-h-60" value={text} style={{height: height}}></textarea>
        </div> 
    );
}
export default Note;

