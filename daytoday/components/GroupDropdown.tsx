import TrashCanIcon from "@/icons/TrashcanIcon";
import { TaskContext } from "@/providers/TaskProvider";
import { useContext, useEffect, useState } from "react";
import AddGroupModal from "./AddGroupModal";
import RemoveGroupModal from "./RemoveGroupModal";
import { GroupContext } from "@/providers/GroupProvider";
import Toggle from "./Toggle";
import { NoteContext } from "@/providers/NoteProvider";
import ArrowWithoutStickIcon, { directionEnum } from "@/icons/Arrows/ArrowWithoutStickIcon";
import ArrowRightIcon from "@/icons/Arrows/ArrowRightIcon";
import ArrowLeftIcon from "@/icons/Arrows/ArrowLeftIcon";
import Calendar from "./Calendar";
import DotsIcon from "@/icons/DotsIcon";
import { MainContext } from "@/providers/MainProvider";
import Dropdown, { DropdownIconsEnum } from "./Dropdown";
import DropDownOptions from "./DropDownOptions";

const GroupDropDown = () => {
    const {groupItem, setGroupItem, groups, toggleDropDown, setToggleDropDown} = useContext(GroupContext);
    const {screenWidth} = useContext(MainContext)
    const {getTasksForAGroup, getTasksForADay, changedDate, setChangedDate, selectedSortOption} = useContext(TaskContext)
    const {setShowNote, getNoteForADay} = useContext(NoteContext)
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
            setToggleDropDown(false)
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

    // const handleToggleChange = async () => {
    //     const toggle = toggleDropDown;
    //     setToggleDropDown(!toggle);
    //     if(selectedSortOption != "All tasks") await getTasksForADay(changedDate, groupItem);
    //     else await getTasksForAGroup(groupItem);
    // }

    const changeDateWithDatepicker = (event: any) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();
        const differenceMs = selectedDate.getTime() - today.getTime();
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
        changeDateToDate(differenceDays);
        event.target.value = ""
    }
    const toggleOptionMenu = () => {
        setToggleDropDown(!toggleDropDown);
    }

    useEffect(() => {
        if(groups && groups.length > 0){
            const formattedData = groups.map((item: string, index: number) => {
                return {
                    value: item,
                    onClick: () => handleItemClick(item),
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
            }
            setFormattedSelectedGroupDropdown(formattedSelectedGroup);
        }
    }, [groupItem]);


    return (
        <div className="flex justify-between items-center w-full flex-wrap">
            <div className="flex gap-2 w-fit">
                <Dropdown data={formattedDataDropdown} defaultItem={formattedSelectedGroupDropdown}>
                   <button onClick={(e) => handleItemClick("+ New group")} className="bg-blue-500 p-1 text-sm font-semibold rounded-lg h-[40px]">+ New group</button>
                </Dropdown>
                <DotsIcon onClick={toggleOptionMenu}/>
                {toggleDropDown &&  <DropDownOptions/>}
                {/* <DropDownOptions/> */}
                {showAddModal && <AddGroupModal setShowModal={setShowAddModal}/>}
                {showRemoveModal && <RemoveGroupModal groupName={groupItem} prevGroup={prevGroup} setShowModal={setShowRemoveModal}/>}
            </div>
            <div className="flex items-center">
                {screenWidth && screenWidth >=768 && <Calendar task={false} onChange={changeDateWithDatepicker}/>}
                <div className="hover:cursor-pointer" onClick={() => changeDate(-1)}><ArrowLeftIcon/></div>
                <div className="hover:cursor-pointer" onClick={() => changeDate(1)}><ArrowRightIcon/></div>
            </div>
        </div>
    );
}
export default GroupDropDown;




