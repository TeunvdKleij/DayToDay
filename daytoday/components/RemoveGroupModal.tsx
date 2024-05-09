import { TaskContext } from "@/providers/TaskProvider";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface RemoveGroupInterface{
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const RemoveGroupModal = ({showModal, setShowModal} : RemoveGroupInterface) => {
    const {groups, removeNotesByGroup, removeTasksByGroup, removeGroup, groupItem} = useContext(TaskContext);
    const [selectedGroup, setSelectedGroup] = useState('');
    const removeGroupOnAction = () => {
        //setShowModal(false);
        setShowModal(false);
        if(selectedGroup== '') return null
        console.log(selectedGroup);
        removeNotesByGroup(selectedGroup);
        removeTasksByGroup(selectedGroup);
        removeGroup(selectedGroup);
        window.location.reload();

    }
    const handleRadioChange = (event: any) => {
        setSelectedGroup(event.target.value);
    };

    return (
        <div className="absolute flex justify-center items-center content-center w-full h-full top-0 left-0 bg-black bg-opacity-40 z-40">
            <div className="bg-eerie-black p-6 rounded-xl flex flex-col">
                <div className="flex flex-col gap-2 p-3 pl-4">
                    {groups.map((name: string, index: number)=> {
                        return <div className="flex gap-5" key={index}><input disabled={groupItem == name ? true : false} name="groups" type="radio" className={`${groupItem == name && "bg-black"}`} value={name} checked={selectedGroup === name} onChange={handleRadioChange}/><p className={`text-xl ${groupItem == name && "line-through opacity-50"}`}>{name}</p></div>
                    })}
                </div>
                <div className="flex w-full gap-2 p-3 justify-around">
                    <button onClick={removeGroupOnAction} className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 rounded-lg w-fit hover:cursor-pointer">Bevestigen</button>
                    <button onClick={() =>  setShowModal(false)} className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 rounded-lg w-fit hover:cursor-pointer">Annuleren</button>
                </div>
            </div>
        </div>
    );
}
export default RemoveGroupModal