import { GroupContext } from "@/providers/GroupProvider";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import Dialog from "@/components/Dialog/Dialog";
import { MainContext } from "@/providers/MainProvider";

interface AddGroupInterface{
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const AddGroupModal = ({setShowModal} : AddGroupInterface) => {
    const {groups, addGroup, getGroups} = useContext(GroupContext)
    const {replaceHTML} = useContext(MainContext);
    const [input, setInput] = useState<string>('')
    const [charCount, setChartCount] = useState<number>(0);

    const addNewGroup = async () => {
        const inputValue = replaceHTML(input);
        setInput(inputValue);
        setShowModal(false);
        const lowercaseGroup = groups.map(item => item.toLowerCase());
        if(lowercaseGroup.includes(inputValue.toLowerCase())) return null
        if(inputValue.length == 0) return null
        addGroup(inputValue);
        groups.push(inputValue)
        await getGroups();
    }

    const handleInputChange = (event: any) => {
        if(event.target.value.length <= 20){
            setInput(replaceHTML(event.target.value))
            setChartCount(replaceHTML(event.target.value).length);
        }
    }

    return (
        <Dialog setShowModal={setShowModal} title={"New group"} maxWidth={500} description={"Fill in the input to add a new group"}
                onAccept={addNewGroup} canAccept={input !== ""}>
            <div className="flex justify-between">
                <p>Name</p>
                <p className="text-zinc-400">{charCount}/20</p>
            </div>
            <input type="text" id="addGroupInput" placeholder={"Enter new group name"} value={input} onChange={(e) => handleInputChange(e)}
                   className="rounded-lg h-[40px] p-3 bg-[#757575] text-white">
            </input>
            
        </Dialog>
    );
}
export default AddGroupModal