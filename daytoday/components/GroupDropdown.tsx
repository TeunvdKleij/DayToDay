import { TaskContext } from "@/providers/TaskProvider";
import { useContext, useEffect, useState } from "react";
import AddGroupModal from "./AddGroupModal";
import RemoveGroupModal from "./RemoveGroupModal";
import { GroupContext } from "@/providers/GroupProvider";
import Toggle from "./Toggle";
import { NoteContext } from "@/providers/NoteProvider";
import { MainContext } from "@/providers/MainProvider";
import ArrowRightIcon from "@/icons/arrowRightIcon";
import ArrowLeftIcon from "@/icons/arrowLeftIcon";
import Calendar from "./Calendar";
import Dropdown, {DropdownIconsEnum} from "@/components/Dropdown";

const GroupDropDown = () => {
    const {groupItem, setGroupItem, groups, toggleBool, setToggleBool} = useContext(GroupContext);
    const {screenWidth} = useContext(MainContext)
    const {getTasksForAGroup, getTasksForADay, changedDate, setChangedDate} = useContext(TaskContext)
    const {setShowNote, getNoteForADay} = useContext(NoteContext)
    const {removeNotesByGroup} = useContext(NoteContext);
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [prevGroup, setPrevGroup] = useState<string>('');
    const [formattedDataDropdown, setFormattedDataDropdown] = useState<any[]>([]);
    const [formattedSelectedGroupDropdown, setFormattedSelectedGroupDropdown] = useState<any>([]);

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
            setGroupItem(groupItem);
        }
        else{
            setGroupItem(item)
            localStorage.setItem('groupSelection', item);
            setToggleBool(false)
            setShowNote(false)
        }
    }

    const showDelete = (item: any) => {
        setShowRemoveModal(true)
        setPrevGroup(item);
    }

    const toggleAdd = () => {
        const add = showAddModal;
        setShowAddModal(!add);
        setShowRemoveModal(false);
    }

    const handleToggleChange = async () => {
        setToggleBool(!toggleBool);
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

    useEffect(() => {
        if(groups && groups.length > 0){
            const formattedData = groups.map((item: string, index: number) => {
                return {
                    value: item,
                    onClick: () => handleItemClick(item),
                    icon: DropdownIconsEnum.FOLDER,
                    actions: [
                        {
                            icon: DropdownIconsEnum.DELETE,
                            onClick: () => showDelete(item)
                        },
                    ]
                }
            })
            setFormattedDataDropdown(formattedData);
        }
    }, [groups]);

    useEffect(() => {
        if(groupItem){
            const formattedSelectedGroup = {
                value: groupItem,
                onClick: () => handleItemClick(groupItem),
                icon: DropdownIconsEnum.FOLDER
            }
            setFormattedSelectedGroupDropdown(formattedSelectedGroup);
        }
    }, [groupItem]);


    return (
        <div className="flex justify-between items-center w-full flex-wrap">
            <div className="flex gap-2 w-fit">
                <Dropdown icon={DropdownIconsEnum.FOLDER} data={formattedDataDropdown} defaultItem={formattedSelectedGroupDropdown}>
                   <button onClick={(e) => handleItemClick("+ New group")} className="bg-blue-500 p-1 text-sm font-semibold rounded-lg h-[40px]">+ New group</button>
                </Dropdown>
                <Toggle text={toggleBool ? "All tasks" : "Daily tasks"} onChange={handleToggleChange} checked={toggleBool}/>
                {showAddModal && <AddGroupModal setShowModal={setShowAddModal}/>}
                {showRemoveModal && <RemoveGroupModal groupName={prevGroup} prevGroup={prevGroup} setShowModal={setShowRemoveModal}/>}
            </div>
            <div className="flex items-center">
                {screenWidth && screenWidth >=768 && 
                <>
                    <Calendar task={false} onChange={changeDateWithDatepicker}/>
                    <button onClick={changeDateToToday}className="rounded-lg pt-1 pl-2 pr-2 pb-1 flex bg-blue-500 items-center mr-3 ml-3 hover:cursor-pointer md:text-base text-sm">Today</button>
                </>
                }
                <div className="hover:cursor-pointer" onClick={() => changeDate(-1)}><ArrowLeftIcon/></div>
                <div className="hover:cursor-pointer" onClick={() => changeDate(1)}><ArrowRightIcon/></div>
            </div>
        </div>
    );
}
export default GroupDropDown;




