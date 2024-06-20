'use client'

import { TaskContext, useTasks } from "@/providers/TaskProvider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useContext, useEffect, useState } from "react";
import {MainContext, useMain} from "@/providers/MainProvider";
import Calendar from "@/components/Calendar";
import TrashCanIcon from "@/icons/Trashcanicon";
import useMousetrap from "@/hooks/useShortcut";
import { GroupContext, useGroup } from "@/providers/GroupProvider";

interface TaskProps {
    taskName: any;
    index: any;
}

const Task: React.FC<TaskProps> = ({ taskName, index }) => {
    const { checkedTasksCount, addNewTask, setCheckedTasksCount, checkedTasks, changedDate, updateTaskStatusInDatabase, updateTaskValueInDatabase, removeTask, tasksId, editTask } = useContext(TaskContext)
    const { replaceHTML } = useContext(MainContext);
    const { groupItem } = useGroup();
    const { newTaskAdded, setNewTaskAdded } = useTasks();
    const [taskDone, setTaskDone] = useState<boolean>(false);
    const [taskValue, setTaskValue] = useState<string>('')
    const [toggleDatepicker, setToggleDatepicker] = useState<boolean>(false)
    const [min, setMin] = useState<string>();
    const [contextMenu, setContextMenu] = useState<boolean>(false);
    const [mouseDownTimestamp, setMouseDownTimestamp] = useState<number>(0);
    const [timer, setTimer] = useState<any>();
    const [interval, setIntervalTime] = useState<any>();
    const [letEditTask, setLetEditTask] = useState<boolean>(true);
    const {screenWidth} = useMain();

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setMin(formattedDate);
    }, [])

    useEffect(() => {
        setTaskValue(taskName);
        setTaskDone(checkedTasks[index])
    }, [taskName])

    const changeTaskState = () => {
        const taskStatus = taskDone;
        setTaskDone(!taskStatus);
        if (taskStatus == true) setCheckedTasksCount(checkedTasksCount - 1);
        else setCheckedTasksCount(checkedTasksCount + 1)
        updateTaskStatusInDatabase(tasksId[index], taskDone);
    }

    const changeTaskValue = (event: any) => {
        const newValue = replaceHTML(event.target.value);
        if (taskName !== newValue || newValue === "") {
            if (newValue === "") {
                removeTask(tasksId[index]);
            } else {
                updateTaskValueInDatabase(tasksId[index], newValue);
                setTaskValue(newValue);
            }
        }
        setNewTaskAdded(false);
    };

    const onKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.blur();
        }
    }

    const onChangeDate = (event: any, id: any) => {
        const date = new Date(event.target.value);
        const currentDate = new Date();
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const currentDateFormatted = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        if (formattedDate < currentDateFormatted) {
            toast.error("Date is in the past")
            return null
        }
        toggleVisibilityDatepicker();
        editTask(id, formattedDate);
        event.target.value = '';
    }

    const toggleVisibilityDatepicker = () => {
        var editstate = toggleDatepicker;
        setToggleDatepicker(!editstate);
    }

    const myFunction = useCallback(() => {
        addNewTask('', changedDate, groupItem);
    }, []);

    useMousetrap('meta+h', myFunction);

    useEffect(() => {
        if (newTaskAdded) {
            const taskDiv = document.getElementById("taskDiv" + tasksId[index]);
            const task = document.getElementById("task" + tasksId[index]);
            if (taskDiv && task) {
                taskDiv.scrollIntoView({ behavior: "smooth", block: "center" });
                task.focus();

                if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                    task.focus();
                }
            }
        }
    }, [newTaskAdded]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        const timestamp = Date.now();
        setMouseDownTimestamp(timestamp);
        setLetEditTask(false);

        const timerId = setTimeout(() => {
            setContextMenu(true);
        }, 350);

        setTimer(timerId);

        const handleClickOutside = (event: MouseEvent) => {
            setContextMenu(false);
            setMouseDownTimestamp(0);
            setLetEditTask(true);
            document.removeEventListener('click', handleClickOutside);
        };

        document.addEventListener('click', handleClickOutside);
    };

    const handleMouseUp = () => {
        clearTimeout(timer);
        setTimer(null);
        const pressDuration = Date.now() - mouseDownTimestamp;
        if (pressDuration > 0 && pressDuration < 150) {
            setLetEditTask(true);
        }
        setMouseDownTimestamp(0);
    };

    return (
        <div id={"taskDiv" + tasksId[index]}
             onTouchStart={(e: any) => handleMouseDown(e)}
             onTouchEnd={() => handleMouseUp()}
             className={`relative no-select w-full min-h-[60px] max-h-[100px] h-full bg-[#252525] pt-[10px] pb-[10px] pl-[20px] pr-[20px] box-border flex flex-row align-middle items-center justify-between gap-[10px] hover:focus:bg-[#333]
                ${index === 0 ? 'rounded-tl-[12px] rounded-tr-[12px]' : ''} 
                ${index === tasksId.length - 1 ? 'rounded-bl-[12px] rounded-br-[12px]' : ''}`}>
            <div id={"name" + tasksId[index]}
                 className="flex justify-between flex-auto h-full align-middle items-center gap-[20px] md:flex-row-reverse">
                <input id={"task" + tasksId[index]} onBlur={(e: any) => changeTaskValue(e)} onKeyDown={(e: any) => onKeyDown(e)} value={taskValue} onChange={(e) => setTaskValue(e.target.value)}
                       className={`resize-none text-[16px] bg-transparent border-none w-full h-full overflow-auto ${taskDone && "line-through opacity-50 z-0"}`}>
                </input>

                    <button onClick={() => changeTaskState()}
                            className={`md:w-[25px] md:h-[25px] md:rounded-[8px] md:min-w-[25px] md:min-h-[25px] bg-[#555] rounded-[8px] min-w-[30px] min-h-[30px] w-[30px] h-[30px] flex justify-center align-middle items-center hover:bg-blue-500 ${taskDone && "bg-blue-500"}`}>
                        {taskDone && (
                            <svg className={`w-[15px] h-[15px] fill-[#c5c5c5] hover:hover-fill-white`} width="22"
                                 height="17" viewBox="0 0 22 17" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.2262 1.25543L7.64364 12.836L3.09237 8.28474C2.97176 8.16412 2.82857 8.06845 2.67098 8.00317C2.51339 7.93789 2.34448 7.9043 2.17391 7.9043C2.00333 7.9043 1.83443 7.93789 1.67684 8.00317C1.51925 8.06845 1.37606 8.16412 1.25544 8.28474C1.13483 8.40535 1.03915 8.54854 0.973873 8.70613C0.908597 8.86373 0.875 9.03263 0.875 9.20321C0.875 9.37378 0.908597 9.54268 0.973873 9.70028C1.03915 9.85787 1.13483 10.0011 1.25544 10.1217L6.72404 15.5903C6.72409 15.5903 6.72413 15.5904 6.72418 15.5904C6.84464 15.7112 6.98775 15.8071 7.14533 15.8726C7.30296 15.938 7.47197 15.9717 7.64266 15.9717C7.81335 15.9717 7.98235 15.938 8.13999 15.8726C8.29756 15.8071 8.44067 15.7113 8.56112 15.5904C8.56118 15.5904 8.56123 15.5903 8.56128 15.5903L20.9727 3.17882L20.9747 3.18077L21.0631 3.09237C21.3067 2.84878 21.4435 2.5184 21.4435 2.17391C21.4435 1.82942 21.3067 1.49903 21.0631 1.25544C20.8195 1.01185 20.4891 0.875 20.1446 0.875C19.8001 0.875 19.4697 1.01185 19.2262 1.25543Z"
                                    stroke={taskDone ? "#fff" : "#999"} strokeWidth="0.25"/>
                            </svg>
                        )}
                    </button>
                </div>
                <div className={"flex flex-row items-center h-full w-auto justify-center align-middle gap-[10px]"}>
                    <Calendar task={true} onChange={() => onChangeDate(event, tasksId[index])}/>
                    <div className="md:flex hidden cursor-pointer" onClick={() => removeTask(tasksId[index])}>
                        <TrashCanIcon
                            color={"#919191"}/></div>
                </div>

                {contextMenu && screenWidth && screenWidth < 768 && (
                    <div
                        className={"z-30 absolute flex flex-col gap-[2px] shadow-context shadow-black min-w-[150px] top-full right-0 bg-[#151515] rounded-[8px] overflow-hidden"}>
                        <div onClick={() => changeTaskState()}
                            className={"h-[50px] w-full bg-[#252525] flex flex-row justify-between align-middle items-center gap-[10px] p-[10px]"}>
                            <p className={"text-[16px]"}>Finish</p>
                            <svg className={`w-[15px] h-[15px] fill-[#fff]`} width="22"
                                 height="17" viewBox="0 0 22 17" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.2262 1.25543L7.64364 12.836L3.09237 8.28474C2.97176 8.16412 2.82857 8.06845 2.67098 8.00317C2.51339 7.93789 2.34448 7.9043 2.17391 7.9043C2.00333 7.9043 1.83443 7.93789 1.67684 8.00317C1.51925 8.06845 1.37606 8.16412 1.25544 8.28474C1.13483 8.40535 1.03915 8.54854 0.973873 8.70613C0.908597 8.86373 0.875 9.03263 0.875 9.20321C0.875 9.37378 0.908597 9.54268 0.973873 9.70028C1.03915 9.85787 1.13483 10.0011 1.25544 10.1217L6.72404 15.5903C6.72409 15.5903 6.72413 15.5904 6.72418 15.5904C6.84464 15.7112 6.98775 15.8071 7.14533 15.8726C7.30296 15.938 7.47197 15.9717 7.64266 15.9717C7.81335 15.9717 7.98235 15.938 8.13999 15.8726C8.29756 15.8071 8.44067 15.7113 8.56112 15.5904C8.56118 15.5904 8.56123 15.5903 8.56128 15.5903L20.9727 3.17882L20.9747 3.18077L21.0631 3.09237C21.3067 2.84878 21.4435 2.5184 21.4435 2.17391C21.4435 1.82942 21.3067 1.49903 21.0631 1.25544C20.8195 1.01185 20.4891 0.875 20.1446 0.875C19.8001 0.875 19.4697 1.01185 19.2262 1.25543Z"
                                    stroke={"#fff"} strokeWidth="0.25"/>
                            </svg>
                        </div>
                        <div onClick={() => removeTask(tasksId[index - 1])}
                            className={"h-[50px] w-full bg-[#252525] flex flex-row justify-between align-middle items-center gap-[10px] p-[10px]"}>
                            <p className={"text-[16px] text-red-400"}>Delete</p>
                            <TrashCanIcon
                                color={"rgb(248 113 113)"}/>
                        </div>
                    </div>
                )}
            </div>
    );
}
export default Task;
