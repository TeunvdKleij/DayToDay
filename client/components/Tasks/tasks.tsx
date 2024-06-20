'use client'

import {useTasks} from "@/providers/TaskProvider";
import Task from "@/components/Tasks/Task/task";
import Button from "@/components/Button/Button";
import {ColorEnum} from "@/providers/MainProvider";
import PlusIcon from "@/icons/PlusIcon";
import {useEffect, useState} from "react";
import {useGroup} from "@/providers/GroupProvider";

const Tasks = () => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const {tasks, addNewTask, changedDate, setChangedDate, newTaskAdded} = useTasks();
    const {groupItem} = useGroup();


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
                        <h1 className={"bg-blue-500 text-white w-[35px] h-[35px] rounded-[50px] flex text-xl font-bold items-center align-middle justify-center"}>i</h1>
                        <p>No tasks found. Try adding one.</p>
                    </div>
                )}
            </div>

            <button
                disabled={changedDate < 0}
                onClick={() => addNewTask("", changedDate, groupItem)}
                className={"md:relative md:mr-auto mt-[10px] mb-[10px] md:bottom-0 md:rounded-[8px] md:max-h-[40px] md:right-0 fixed md:min-w-[100px bg-blue-500 bottom-[50px] right-[25px] hover:bg-blue-600 pt-1 pb-1 pr-2 pl-2 h-[60px] min-w-[60px] rounded-[50px] align-middle justify-center items-center flex gap-2"}
            >
                <div className={"md:hidden flex"}>
                    <PlusIcon lineThickness={"4"} className={"w-[30px] h-[30px]"}/>
                </div>
                {/*Desktop*/}
                <div className={"md:flex hidden"}>
                    <PlusIcon lineThickness={"3"} className={"w-[25px] h-[25px]"}/>
                </div>
                <p className={"md:flex hidden"}>Tasks</p>
            </button>
        </>
    )
}

export default Tasks;