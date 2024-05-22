import TrashCanIcon from "@/icons/trashcanicon";
import { TaskContext } from "@/providers/TaskProvider";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button, DropdownSection } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react";
import AddGroupModal from "./AddGroupModal";
import RemoveGroupModal from "./RemoveGroupModal";
import { GroupContext } from "@/providers/GroupProvider";
import Toggle from "./Toggle";
import { NoteContext } from "@/providers/NoteProvider";
import ArrowWithoutStickIcon, { directionEnum } from "@/icons/ArrowWithoutStickIcon";
import { MainContext } from "@/providers/MainProvider";
import ArrowRightIcon from "@/icons/arrowRightIcon";
import ArrowLeftIcon from "@/icons/arrowLeftIcon";
interface DropdownInterface {
    toggleBlur: () => void
}

const GroupDropDown: React.FC<DropdownInterface> = ({toggleBlur}) => {
    const {groupItem, setGroupItem, groups, toggleBool, setToggleBool} = useContext(GroupContext);
    const {screenWidth} = useContext(MainContext)
    const {getTasksForAGroup, getTasksForADay, changedDate, setChangedDate} = useContext(TaskContext)
    const {setShowNote, getNoteForADay} = useContext(NoteContext)
    const {removeNotesByGroup} = useContext(NoteContext);
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [prevGroup, setPrevGroup] = useState<string>('')

    useEffect(() => {
        if(changedDate < 0) setDisabled(true);
        else setDisabled(false);
    }, [changedDate])

    const changeDate = (num: number) => {
        var change = changedDate;
        setShowNote(false)
        changeDateToDate(change+num);
    }

    const changeDateToToday = () =>{
        changeDateToDate(0);
    }

    const changeDateToDate = (number: number) => {
        setChangedDate(number);
        getTasksForADay(number, groupItem);
        getNoteForADay(number, groupItem);
    }

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

    const changeDateWithDatepicker = (event: any) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();
        const differenceMs = selectedDate.getTime() - today.getTime();
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
        changeDateToDate(differenceDays);
        event.target.value = ""
    }


    return (
        <div className="flex justify-between w-full flex-wrap">
            <div className="flex gap-2 w-fit">
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered" onClick={toggleBlur} className="bg-blue-500 pt-1 pb-1 pr-2 pl-2 h-fit rounded-lg w-fit text-md ">{groupItem}<ArrowWithoutStickIcon direction={directionEnum.DOWN} width={screenWidth && screenWidth >= 768 ? 20 : 18}/></Button>
                    </DropdownTrigger>
                    {groups && groups.length > 0 &&
                        <DropdownMenu aria-label="Dynamic Actions" items={groups} onAction={(key) => handleItemClick(key.toString())} className="flex flex-col rounded-lg p-1 bg-eerie-black border-[1px] border-neutral-700">
                            <DropdownSection showDivider>
                                {groups.map((item: string, index: number) => {
                                    const disabled = item == groupItem;
                                    return (
                                        <DropdownItem key={item} textValue={item} color="default" className="p-0.5">
                                            <div className={`flex gap-10 min-w-36 p-2 rounded-lg outline-none justify-between align-middle items-center hover:bg-zinc-500 ${!disabled ? "bg-eerie-black" : " bg-zinc-600 border-1 border-zinc-400"}`}>
                                                {item}
                                                {!disabled ? <button className={"w-[20px] h-[20px] justify-center align-middle items-center hover:bg-zinc-400 p-1 box-content rounded-lg"} onClick={showDelete}><TrashCanIcon color={"#ffffff"}/></button> : <button className={"w-[20px] h-[20px] justify-center align-middle items-center hover:bg-zinc-400 p-1 box-content rounded-lg"}><ArrowWithoutStickIcon direction={directionEnum.RIGHT} width={20} /></button> }
                                            </div>
                                        </DropdownItem>
                                    )
                                })}
                            </DropdownSection>
                            <DropdownItem color="default" className="bg-blue-500 mb-2 pt-2 pb-1.5 pr-1.5 pl-2 rounded-lg w-auto ml-1 mr-1 text-center hover:cursor-pointer" textValue="+ New group" key="+ New group">+ New group</DropdownItem>
                        </DropdownMenu>
                    }
                </Dropdown>
                <Toggle text={toggleBool ? "All tasks" : "Daily tasks"} onChange={handleToggleChange} checked={toggleBool}/>
                {showAddModal && <AddGroupModal groupName={groupItem} prevGroup={prevGroup}  setShowModal={setShowAddModal}/>}
                {showRemoveModal && <RemoveGroupModal groupName={groupItem} prevGroup={prevGroup} setShowModal={setShowRemoveModal}/>}
        </div>
        <div className="flex items-center">
            {screenWidth && screenWidth >= 768 && <input type="date" className="rounded-lg text-black" onChange={changeDateWithDatepicker}></input>}
            <button onClick={changeDateToToday}className={`rounded-lg pt-1 pl-2 pr-2 pb-1 flex bg-blue-500 items-center mr-3 ml-3 hover:cursor-pointer md:text-md text-sm `}>Today</button>
            <div className="hover:cursor-pointer" onClick={() => changeDate(-1)}><ArrowLeftIcon/></div>
            <div className="hover:cursor-pointer" onClick={() => changeDate(1)}><ArrowRightIcon/></div>
        </div>
        </div>
    );
}
export default GroupDropDown;




