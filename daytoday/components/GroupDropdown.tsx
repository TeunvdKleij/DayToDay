import PlusIcon from "@/icons/plusicon";
import TrashCanIcon from "@/icons/trashcanicon";
import { TaskContext } from "@/providers/TaskProvider";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button, DropdownSection } from "@nextui-org/react"
import { group } from "console";
import { useContext, useEffect, useState } from "react";
import AddGroupModal from "./AddGroupModal";
import RemoveGroupModal from "./RemoveGroupModal";
import { GroupContext } from "@/providers/GroupProvider";
import Toggle from "./Toggle";
import { toast } from "react-toastify";
import { NoteContext } from "@/providers/NoteProvider";
import ArrowWithoutStickIcon from "@/icons/ArrowWithoutStickIcon";
interface DropdownInterface {
    toggleBlur: () => void

}
const GroupDropDown: React.FC<DropdownInterface> = ({toggleBlur}) => {
    const {groupItem, setGroupItem, groups, toggleBool, setToggleBool, removeGroup, lastGroupItem, setLastGroupItem} = useContext(GroupContext);
    const {removeTasksByGroup, getTasksForAGroup, getTasksForADay, changedDate} = useContext(TaskContext)
    const {setShowNote} = useContext(NoteContext)
    const {removeNotesByGroup} = useContext(NoteContext);
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [prevGroup, setPrevGroup] = useState<string>('')

    const handleItemClick = async (item: string) => {
        if(item == "+ New group"){
            toggleAdd();
        }
        else{
            setGroupItem(item)
            localStorage.setItem('groupSelection', item);
            setToggleBool(false)
            setShowNote(false)
        }
        toggleBlur();
    }

    const showDelete = () => {
        setShowRemoveModal(true)
        setPrevGroup(groupItem);
    }

    const toggleAdd = () => {
        const add = showAddModal;
        setShowAddModal(!add);
        setShowRemoveModal(false);
    }

    const handleToggleChange = async () => {
        const toggle = toggleBool;
        setToggleBool(!toggle);
        if(toggleBool) await getTasksForADay(changedDate, groupItem);
        else await getTasksForAGroup(groupItem);
    }


    return (
        <div className="flex gap-2">
        <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered" onClick={toggleBlur} className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 h-fit rounded-lg w-fit md:text-md ">{groupItem}<ArrowWithoutStickIcon width={20}/></Button>
                </DropdownTrigger>
                {groups && groups.length > 0 &&
                <DropdownMenu aria-label="Dynamic Actions" items={groups} onAction={(key) => handleItemClick(key.toString())} className="flex flex-col rounded-lg pl-2 pt-2 pb-2 pr-2" style={{backgroundColor : '#333333'}}>
                    <DropdownSection showDivider>  
                    {groups.map((item: string, index: number) => {
                        const disabled = item == groupItem;
                        return <DropdownItem key={item} textValue={item} color="default" className="p-1">
                            <div className="flex justify-between">
                            {item}
                            {!disabled && <button onClick={showDelete}><TrashCanIcon color={"#ffffff"}/></button>}
                            </div>
                        </DropdownItem>
                    })}
                    </DropdownSection>
                    <DropdownSection>
                        <DropdownItem color="default" className="p-1" textValue="+ New group" key="+ New group">+ New group</DropdownItem>
                        </DropdownSection>
                </DropdownMenu>
                }
        </Dropdown>
        <Toggle text={toggleBool ? "All tasks" : "Daily tasks"} onChange={handleToggleChange} checked={toggleBool}/>
        {showAddModal && <AddGroupModal groupName={groupItem} prevGroup={prevGroup}  setShowModal={setShowAddModal}/>}
        {showRemoveModal && <RemoveGroupModal groupName={groupItem} prevGroup={prevGroup}  showModal={showRemoveModal} setShowModal={setShowRemoveModal}/>}
        </div>
      );
}
export default GroupDropDown;



