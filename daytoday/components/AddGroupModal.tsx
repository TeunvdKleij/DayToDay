import { GroupContext } from "@/providers/GroupProvider";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface AddGroupInterface{
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const AddGroupModal = ({showModal, setShowModal} : AddGroupInterface) => {
    const {groups, addGroup} = useContext(GroupContext)
    const [input, setInput] = useState<string>('')

    const addNewGroup = (event: any) => {
        setShowModal(false);
        const lowercaseGroup = groups.map(item => item.toLowerCase());
        if(lowercaseGroup.includes(input.toLowerCase())) return null
        addGroup(input);
        window.location.reload();
    }
    const onChange = (event: any) => {
        setInput(event.target.value)
    }
    
    return (
        <div className="absolute flex justify-center items-center content-center w-full h-full top-0 left-0 bg-black bg-opacity-40 z-50">
            <div className="bg-eerie-black p-10 rounded-xl flex flex-col">
                <div className="flex gap-10 p-6">
                    <p>Name</p>
                    <input type="text" id="addGroupInput" value={input} onChange={onChange} className="rounded-lg text-black"></input>
                </div>
                <div className="flex w-full gap-2 p-3 justify-around">
                    <button onClick={addNewGroup} className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 rounded-lg w-fit hover:cursor-pointer">Bevestigen</button>
                    <button onClick={() => setShowModal(false)} className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 rounded-lg w-fit hover:cursor-pointer">Annuleren</button>
                </div>
            </div>
        </div>
    );
}
export default AddGroupModal