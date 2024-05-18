'use client'
import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "@/providers/TaskProvider";
import PlusIcon from "@/icons/plusicon";
import ArrowLeftIcon from "@/icons/arrowLeftIcon";
import ArrowRightIcon from "@/icons/arrowRightIcon";
import { GroupContext } from "@/providers/GroupProvider";
import { NoteContext } from "@/providers/NoteProvider";
import { MainContext } from "@/providers/MainProvider";
import Task from "./Task";

const List = () => {
    const {tasks, addNewTask, changedDate, setChangedDate, getTasksForADay} = useContext(TaskContext);
    const {groupItem} = useContext(GroupContext);
    const {getNoteForADay, showNote, setShowNote} = useContext(NoteContext)
    const [disabled, setDisabled] = useState<boolean>(false);
    const {screenWidth} = useContext(MainContext)

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

    const changeDateWithDatepicker = (event: any) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();
        const differenceMs = selectedDate.getTime() - today.getTime();
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
        changeDateToDate(differenceDays);
        event.target.value = ""
    }

    return (
        <div className="flex flex-col items-start">
            <div id="taskList" className="flex flex-col w-full">
                {tasks.map((taskName: any, index: any) => {
                    return <Task index={index} key={index} taskName={taskName}/>
                })}
            </div>
            <div className="flex gap-3 mt-6 w-full justify-between">
                <button disabled={disabled} onClick={() => addNewTask("", changedDate, groupItem)} className={`md:text-md text-sm w-fit rounded-lg pt-1 pl-2 pr-2 pb-1 flex items-center gap-2 hover:cursor-pointer ${changedDate < 0 ? "bg-grey" : "bg-blue-500" } `}><PlusIcon/>New Task</button>
                <div className="flex items-center">
                    {screenWidth && screenWidth >= 768 && <input type="date" className="rounded-lg text-black" onChange={changeDateWithDatepicker}></input>}
                    <button onClick={changeDateToToday}className={`rounded-lg pt-1 pl-2 pr-2 pb-1 flex bg-blue-500 items-center mr-3 ml-3 hover:cursor-pointer md:text-md text-sm `}>Today</button>
                    <div onClick={() => changeDate(-1)}><ArrowLeftIcon/></div>
                    <div onClick={() => changeDate(1)}><ArrowRightIcon/></div>
                </div>
            </div>
        </div>

    );
}
export default List;
