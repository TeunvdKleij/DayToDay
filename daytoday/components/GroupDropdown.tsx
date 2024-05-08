import { TaskContext } from "@/providers/TaskProvider";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button } from "@nextui-org/react"
import { group } from "console";
import { useContext, useEffect, useState } from "react";

interface DropdownInterface {
    toggleBlur: () => void
}
const GroupDropDown: React.FC<DropdownInterface> = ({toggleBlur}) => {
    const {dropdownItems, groupItem, setGroupItem, changedDate, getTasksForADay, getNoteForADay} = useContext(TaskContext);
    useEffect(() => {
        //roep tasks/notes aan
    }, [groupItem])

    const handleItemClick = (item: string) => {
        setGroupItem(item)
        getTasksForADay(changedDate, item);
        getNoteForADay(changedDate, item);
        toggleBlur()
    }


    return (
        <Dropdown className="">
                <DropdownTrigger>
                    <Button variant="bordered" onClick={toggleBlur} className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 rounded-lg w-fit">{groupItem}</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={dropdownItems} onAction={(key) => handleItemClick(key.toString())} className="flex flex-col rounded-lg pl-2 pt-2 pb-2 pr-2" style={{backgroundColor : '#333333'}}>
                    {dropdownItems.map((item: string, index: number) => {
                        return <DropdownItem key={item} color="default" className="p-1">
                            {item}
                        </DropdownItem>
                    })}
                </DropdownMenu>
        </Dropdown>
      );
}
export default GroupDropDown;



