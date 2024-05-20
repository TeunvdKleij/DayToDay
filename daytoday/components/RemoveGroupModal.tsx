import { GroupContext } from "@/providers/GroupProvider";
import { NoteContext } from "@/providers/NoteProvider";
import { TaskContext } from "@/providers/TaskProvider";
import { Dispatch, SetStateAction, useContext } from "react";

interface RemoveGroupInterface{
    setShowModal: Dispatch<SetStateAction<boolean>>
    groupName: string
    prevGroup: string
}

const RemoveGroupModal = ({setShowModal, groupName, prevGroup} : RemoveGroupInterface) => {
    const {removeTasksByGroup} = useContext(TaskContext);
    const {removeGroup, setGroupItem} = useContext(GroupContext);
    const {removeNotesByGroup} = useContext(NoteContext);

    const removeClick = async (item: string) => {
        await removeNotesByGroup(item);
        await removeTasksByGroup(item);
        await removeGroup(item);
        setGroupItem(prevGroup)
        localStorage.setItem('groupSelection', prevGroup);
        window.location.reload();
        setShowModal(false)
    }


    return (
        <div className="absolute flex justify-center items-center content-center w-full h-full top-0 left-0 bg-black bg-opacity-40 z-40">
            <div className="bg-eerie-black p-6 rounded-xl flex flex-col">
                <p className="">Weet je zeker dat je {groupName} wil verwijderen?</p>
                <div className="flex gap-1">
                    <p className="font-bold">Dit proces is </p>
                    <p className="font-bold underline">niet</p>
                    <p className="font-bold"> terug te draaien</p>
                    </div>
                <div className="flex w-full gap-2 p-3 justify-around">
                    <button onClick={async () => removeClick(groupName)} className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 rounded-lg w-fit hover:cursor-pointer">Bevestigen</button>
                    <button onClick={() =>  setShowModal(false)} className="bg-zinc-500 pt-1 pb-1 pr-2 pl-2 rounded-lg w-fit hover:cursor-pointer">Annuleren</button>
                </div>
            </div>
        </div>
    );
}
export default RemoveGroupModal