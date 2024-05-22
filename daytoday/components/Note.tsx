import ArrowWithoutStickIcon, { directionEnum } from "@/icons/ArrowWithoutStickIcon";
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
          <div className="flex justify-between mb-3 align-middle items-center">
            <h1 id="title" className="flex justify-center md:text-3xl text-xl font-bold">Notitie</h1>
            <div onClick={toggleNote} className={`hover:cursor-pointer ${showNote && "mirror"}`}><ArrowWithoutStickIcon direction={directionEnum.DOWN} width={40}/></div>
          </div>
          {showNote && <div className="fadeIn"><NoteTextArea/></div>}
        </div>
    );
}
export default Note;
