import { GroupContext } from "@/providers/GroupProvider";
import { Dispatch, SetStateAction, useContext, useState, ReactNode } from "react";
import Dialog from "@/components/Dialog";

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
        addGroup(input);
        groups.push(input)
        await getGroups();
    }

    const handleInputChange = (event: any) => {
        setInput(event.target.value)
    }

    return (
        <Dialog setShowModal={setShowModal} title={"New group"} description={"Fill in the input to add a new group"}
                onAccept={addNewGroup} canAccept={input !== ""}>
            <p>Name</p>
            <input type="text" id="addGroupInput" value={input} onChange={(e) => handleInputChange(e)}
                   className="rounded-lg h-[40px] p-3 bg-[#757575] text-white"></input>
        </Dialog>
    );
}
export default AddGroupModal