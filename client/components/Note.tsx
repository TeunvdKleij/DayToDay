import ArrowWithoutStickIcon, { directionEnum } from "@/icons/Arrows/ArrowWithoutStickIcon";
import NoteTextArea from "./NoteTextArea";
import { useContext } from "react";
import { NoteContext } from "@/providers/NoteProvider";

interface NoteInterface {
    toggleNote: () => void
}
const Note = ({toggleNote} : NoteInterface) => {
    const {showNote} = useContext(NoteContext);
    return(
        <div className="flex justify-center flex-col bg-eerie-black rounded-lg p-5 m-5 md:w-2/3 w-11/12">
          <div className="flex justify-between mb-3 align-middle items-center" onClick={toggleNote}>
            <h1 id="title" className="flex justify-center md:text-3xl text-xl font-bold">Note</h1>
            <ArrowWithoutStickIcon direction={showNote ? directionEnum.UP : directionEnum.DOWN} className={"fill-white"} width={40}/>
          </div>
          {showNote && <div className="fadeIn"><NoteTextArea/></div>}
        </div>
    );
}
export default Note;
