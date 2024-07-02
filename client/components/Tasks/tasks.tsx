'use client'

import {useTasks} from "@/providers/TaskProvider";
import Task from "@/components/Tasks/Task/task";
import Button from "@/components/Button/Button";
import {ColorEnum} from "@/providers/MainProvider";
import PlusIcon from "@/icons/PlusIcon";
import {useContext, useEffect, useState} from "react";
import {useGroup} from "@/providers/GroupProvider";
import {UserContext} from "@/providers/UserProvider";

const Tasks = () => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const {tasks, addNewTask, changedDate, setChangedDate, newTaskAdded} = useTasks();
    const {groupItem} = useGroup();
    const {settings} = useContext(UserContext);
    const [addTaskHover, setAddTaskHover] = useState<boolean>(false)


    useEffect(() => {
        if(changedDate < 0) setDisabled(true);
        else setDisabled(false);
    }, [changedDate])

    return (
        <>
            <div
                className={"w-full max-w-[768px] box-border h-auto bg-[#151515] flex align-middle items-center flex-col gap-[1px]"}>
                {tasks && tasks.map((task, index) => {
                    return (
                        <Task key={"task-" + index} taskName={task} index={index}/>
                    )
                })}

                {tasks && tasks.length === 0 && (
                    <div className={"h-[50px] w-full bg-[#222] rounded-[8px] flex flex-row align-middle justify-start items-center gap-[10px] p-[10px]"}>
                        <h1 className={"w-[35px] h-[35px] rounded-[50px] flex text-xl font-bold items-center align-middle justify-center"}
                        style={{backgroundColor: settings.color}}
                        >i</h1>
                        <p>No tasks found. Try adding one.</p>
                    </div>
                )}
            </div>

            <button
                style={{backgroundColor: settings.color}}
                disabled={changedDate < 0}
                onClick={() => addNewTask("", changedDate, groupItem)}
                onMouseEnter={() => setAddTaskHover(true)}
                onMouseLeave={() => setAddTaskHover(false)}
                className={`md:relative md:mr-auto mt-[10px] mb-[10px] hover:brightness-90 md:bottom-0 md:rounded-[8px] md:max-h-[40px] md:right-0 fixed md:min-w-[100px] bottom-[50px] ${settings && settings.addTaskLeft ? "left-[25px]" : "right-[25px]"} pt-1 pb-1 pr-2 pl-2 h-[60px] min-w-[60px] rounded-[50px] align-middle justify-center items-center flex gap-2`}>
                <div className={"md:hidden flex"}>
                    <PlusIcon lineThickness={"4"} className={"w-[30px] h-[30px]"}/>
                </div>
                {/*Desktop*/}
                <div className={"md:flex hidden"}>
                    <PlusIcon lineThickness={"3"} className={"w-[25px] h-[25px]"}/>
                </div>
                <p className={"md:flex hidden"}>Task</p>
            </button>
        </>
    )
}

export default Tasks;