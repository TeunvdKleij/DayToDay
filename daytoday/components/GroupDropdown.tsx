import PlusIcon from "@/icons/plusicon";
import TrashCanIcon from "@/icons/trashcanicon";
import { TaskContext } from "@/providers/TaskProvider";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button, DropdownSection } from "@nextui-org/react"
import { group } from "console";
import { useContext, useEffect, useState } from "react";
import AddGroupModal from "./AddGroupModal";
import RemoveGroupModal from "./RemoveGroupModal";
import { GroupContext } from "@/providers/GroupProvider";
interface DropdownInterface {
    toggleBlur: () => void
}
const GroupDropDown: React.FC<DropdownInterface> = ({toggleBlur}) => {
    const {groupItem, setGroupItem, groups} = useContext(GroupContext);
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);

    const handleItemClick = (item: string) => {
        setGroupItem(item)
        localStorage.setItem('groupSelection', item);
        toggleBlur();
    }

    const toggleAdd = () => {
        const add = showAddModal;
        setShowAddModal(!add);
        setShowRemoveModal(false);
    }
    const toggleRemove = () => {
        const remove = showRemoveModal;
        setShowRemoveModal(!remove);
        setShowAddModal(false);
    }

    return (
        <div className="flex gap-2">
        <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered" onClick={toggleBlur} className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 h-fit rounded-lg w-fit">{groupItem}</Button>
                </DropdownTrigger>
                {groups && groups.length > 0 &&
                <DropdownMenu aria-label="Dynamic Actions" items={groups} onAction={(key) => handleItemClick(key.toString())} className="flex flex-col rounded-lg pl-2 pt-2 pb-2 pr-2" style={{backgroundColor : '#333333'}}>
                    {groups.map((item: string, index: number) => {
                        return <DropdownItem key={item} color="default" className="p-1">
                            {item}
                        </DropdownItem>
                    })}
                </DropdownMenu>
                }
        </Dropdown>
        <button className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 rounded-lg w-fit hover:cursor-pointer" onClick={toggleAdd}><PlusIcon/></button>
        <button className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 rounded-lg w-fit hover:cursor-pointer" onClick={toggleRemove}><TrashCanIcon color={"#ffffff"}/></button>
        {showAddModal && <AddGroupModal showModal={showAddModal} setShowModal={setShowAddModal}/>}
        {showRemoveModal && <RemoveGroupModal showModal={showRemoveModal} setShowModal={setShowRemoveModal}/>}
        </div>
      );
}
export default GroupDropDown;



