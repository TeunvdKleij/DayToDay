'use client'

import {useContext, useEffect, useState} from "react";
import {useTasks} from "@/providers/TaskProvider";
import {useGroup} from "@/providers/GroupProvider";
import Dropdown, {DropdownIconsEnum} from "@/components/Dropdown/Dropdown";
import AddGroupModal from "@/components/AddGroupModal";
import RemoveGroupModal from "@/components/RemoveGroupModal";
import {UserContext} from "@/providers/UserProvider";
import ArrowLeftIcon from "@/icons/Arrows/ArrowLeftIcon";
import ArrowRightIcon from "@/icons/Arrows/ArrowRightIcon";

const Menu = () => {
    const {tasksCount, checkedTasksCount, changedDate, selectedSortOption, getTasksForADay, getTasksForAGroup, setChangedDate, removeTasksByGroup, taskSortOptions, setSelectedSortOption, setCheckedTasksCount} = useTasks();
    const {groupItem, setGroupItem, groups, addGroup, setLastGroupItem, loading, lastGroupItem, getGroups, setToggleDropDown, toggleDropDown, setGroups, removeGroup} = useGroup();
    const [headerText, setHeaderText] = useState<string>('');
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [prevGroup, setPrevGroup] = useState<string>('');
    const [formattedDataDropdown, setFormattedDataDropdown] = useState<any[]>([]);
    const [formattedSelectedGroupDropdown, setFormattedSelectedGroupDropdown] = useState<any>([]);
    const [formattedSelectedTaskOptions, setFormattedSelectedTaskOptions] = useState<any>([]);
    const [optionsHover, setOptionsHover] = useState<boolean>(false)
    const {settings} = useContext(UserContext);

    const getDay = (changeDate: number) => {
        var date = new Date();
        date.setDate(date.getDate()+changeDate)
        var dutchDayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        return dutchDayNames[date.getDay()];
    }

    const getMonth = (changeDate: number) => {
        var date = new Date();
        date.setDate(date.getDate()+changeDate)
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return monthNames[date.getMonth()]
    }

    const getDayName = (changeDate: number) => {
        var date = new Date();
        date.setDate(date.getDate()+changeDate)
        return date.getDate();
    }

    useEffect(() => {
        if(selectedSortOption && selectedSortOption.value == "All tasks") setHeaderText("All tasks for " + groupItem);
        else if(changedDate == 0) setHeaderText("Today")
        else if(changedDate == 1) setHeaderText("Tomorrow")
        else if(changedDate == -1) setHeaderText("Yesteday")
        else setHeaderText(getDay(changedDate) + " " + getDayName(changedDate) + " " + getMonth(changedDate))
    }, [selectedSortOption, groupItem, changedDate]);

    useEffect(() => {
        if(changedDate < 0) setDisabled(true);
        else setDisabled(false);
    }, [changedDate])

    const changeDate = (num: number) => {
        var change = changedDate;
        // setShowNote(false)
        changeDateToDate(change+num);
    }

    const changeDateToDate = (number: number) => {
        setChangedDate(number);
        getTasksForADay(number, groupItem);
    }

    const handleItemClick = async (item: string) => {
        if(item == "+ Group"){
            toggleAdd();
            setGroupItem(groupItem);
        }
        else{
            setGroupItem(item)
            localStorage.setItem('groupSelection', item);
            setToggleDropDown(false)
        }
    }

    const showDelete = async (item: any) => {
        await setPrevGroup(item);
        setShowRemoveModal(true)
    }

    const toggleAdd = () => {
        const add = showAddModal;
        setShowAddModal(!add);
        setShowRemoveModal(false);
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

    useEffect(() => {
        if(taskSortOptions && taskSortOptions.length > 0) {
            const formattedData = taskSortOptions.map((item: string, index: number) => {
                let object = {
                    value: item,
                    actions: [
                        {
                            onClick: () => {},
                        }
                    ],
                    onClick: () => {},
                }
                object.onClick = () => setSelectedSortOption(object);
                return object;
            });
            setFormattedSelectedTaskOptions(formattedData)
        }
    }, [taskSortOptions]);
    
    return (
        <div className={"w-full mt-[25px] pt-[10px] pb-[10px] max-w-[768px] h-40px flex justify-between align-middle items-center gap-[10px] flex-row"}>
            <div className="flex gap-3">
                <h1 className={"text-2xl font-bold"}>{headerText}</h1>
                <div className="flex">
                    <button onClick={() => changeDate(-1)}><ArrowLeftIcon/></button>
                    <button onClick={() => changeDate(1)}><ArrowRightIcon/></button>
                </div>
            </div>
            <div className={"w-auto gap-[10px] flex flex-row justify-end items-center align-middle"}>
                <Dropdown showText={false} showArrow={false} className={`rounded-[50px] w-[30px] h-[30px] flex justify-center align-middle items-center`}
                    style={{backgroundColor: optionsHover ? settings.color : "#555" }}
                    onMouseEnter={() => setOptionsHover(true)}
                    onMouseLeave={() => setOptionsHover(false)}
                    data={formattedSelectedTaskOptions} icon={DropdownIconsEnum.FILTER} defaultItem={selectedSortOption}>
                </Dropdown>
                <Dropdown showText={true} data={formattedDataDropdown} defaultItem={formattedSelectedGroupDropdown} style={{backgroundColor: settings?.color}} className={"hover:bg-blue-600"}>
                    <button onClick={(e) => handleItemClick("+ Group")}  style={{backgroundColor: settings?.color}} className="p-1 text-sm font-semibold rounded-lg h-[40px]">+ Group</button>
                </Dropdown>
                {showAddModal && <AddGroupModal setShowModal={setShowAddModal}/>}
                {showRemoveModal &&
                    <RemoveGroupModal groupName={groupItem} prevGroup={prevGroup} setShowModal={setShowRemoveModal}/>}
            </div>
        </div>
    )
}

export default Menu;