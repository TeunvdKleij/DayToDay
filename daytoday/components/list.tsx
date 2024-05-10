'use client'
import { useContext, useEffect, useRef, useState } from "react";
import NewTask from "./newTask";
import Task from "./task"
import { TaskContext } from "@/providers/TaskProvider";
import PlusIcon from "@/icons/plusicon";
import ArrowLeftIcon from "@/icons/arrowLeftIcon";
import ArrowRightIcon from "@/icons/arrowRightIcon";

const List = () => {
    const {tasks, addNewTask, changedDate, setChangedDate, getTasksForADay, getNoteForADay, groupItem, showNote, setShowNote} = useContext(TaskContext);
    const changeDate = (num: number) => {
        var change = changedDate;
        setShowNote(false)
        setChangedDate(change + num);
        getTasksForADay(change+num, groupItem);
        getNoteForADay(change+num, groupItem);
    }

    const changeDateToToday = () => {
        setChangedDate(0);
        getTasksForADay(0, groupItem);
        getNoteForADay(0, groupItem);
    }

    return (
        <div className="flex flex-col items-start">
            <div id="taskList" className="flex flex-col w-full">
            {tasks.map((taskName: any, index: any) => {
                return <Task index={index} key={index} taskName={taskName}
            />
            })}
            </div>
            <div className="flex gap-3 mt-6 w-full justify-between">
                <button onClick={() => addNewTask("", changedDate, groupItem)} className="rounded-lg bg-blue-500 pt-1 pl-2 pr-2 pb-1 flex items-center gap-2 hover:cursor-pointer"><PlusIcon/>New Task</button>
                <div className="flex items-center">
                    <button onClick={changeDateToToday}className="rounded-lg bg-blue-500 pt-1 pl-2 pr-2 pb-1 flex items-center mr-3 hover:cursor-pointer">Today</button>
                    <div onClick={() => changeDate(-1)}><ArrowLeftIcon/></div>
                    <div onClick={() => changeDate(1)}><ArrowRightIcon/></div>
                </div>
            </div>
        </div>

    );
}
export default List;
