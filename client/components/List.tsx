'use client'
import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "@/providers/TaskProvider";
import PlusIcon from "@/icons/PlusIcon";
import ArrowLeftIcon from "@/icons/Arrows/ArrowLeftIcon";
import ArrowRightIcon from "@/icons/Arrows/ArrowRightIcon";
import { GroupContext } from "@/providers/GroupProvider";
import { NoteContext } from "@/providers/NoteProvider";
import { ColorEnum, MainContext } from "@/providers/MainProvider";
import Task from "./Task";
import DotsIcon from "@/icons/DotsIcon";
import ShareIcon from "@/icons/ShareIcon";
import SortIcon from "@/icons/SortIcon";
import Button from "./Button/Button";


const List = () => {
    const {tasks, addNewTask, changedDate} = useContext(TaskContext);
    const {groupItem} = useContext(GroupContext);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [toggleOptions, setToggleOptions] = useState<boolean>(false)
    const [isMounted, setIsMounted] = useState(false); // New state to manage mounting

    useEffect(() => {
        if(changedDate < 0) setDisabled(true);
        else setDisabled(false);
    }, [changedDate])

    const handleToggleOptions = () => {
        if (toggleOptions) {
            setToggleOptions(false);
            setTimeout(() => setIsMounted(false), 300);
        } 
        else {
            setIsMounted(true);
            setTimeout(() => setToggleOptions(true), 10); 
        }
    }

    return (
        <div className="flex flex-col items-start">
            <div id="taskList" className="flex flex-col w-full">
                {tasks.map((taskName: any, index: any) => {
                    return <Task index={index} key={index} taskName={taskName}/>
                })}
            </div>
            <div className="flex gap-3 mt-6 w-full justify-between">
                <Button 
                    text={"Task"} 
                    disabled={changedDate < 0} 
                    onClick={() => addNewTask("", changedDate, groupItem)}
                    backgroundColor={ColorEnum.BLUE}
                >
                    <PlusIcon/>
                </Button>
            </div>
        </div>

    );
}
export default List;