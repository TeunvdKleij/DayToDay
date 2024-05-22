import { GroupContext } from "@/providers/GroupProvider";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface AddGroupInterface{
    setShowModal: Dispatch<SetStateAction<boolean>>
    groupName: string
    prevGroup: string
}

const AddGroupModal = ({setShowModal, groupName, prevGroup} : AddGroupInterface) => {
    const {groups, addGroup, getGroups} = useContext(GroupContext)
    const [input, setInput] = useState<string>('')

    const addNewGroup = async () => {
        setShowModal(false);
        const lowercaseGroup = groups.map(item => item.toLowerCase());
        if(lowercaseGroup.includes(input.toLowerCase())) return null
        if(input.length == 0) return null
        addGroup(input);
        groups.push(input)
        await getGroups();
    }

    const onChange = (event: any) => {
        setInput(event.target.value)
    }

    const cancelAdding = () => {
        setShowModal(false);
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
                    <button onClick={cancelAdding} className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 rounded-lg w-fit hover:cursor-pointer">Annuleren</button>
                </div>
            </div>
        </div>
    );
}
export default AddGroupModal