'use client'
import EditIcon from "@/icons/EditIcon";
import TrashCanIcon from "@/icons/TrashcanIcon";
import { TaskContext } from "@/providers/TaskProvider";
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import { MainContext } from "@/providers/MainProvider";
import DatePickerEditIcon from "@/icons/DatePickerEditIcon";
import Calendar from "./Calendar";
import DragIcon from "@/icons/DragIcon";

interface TaskProps {
    taskName: any; 
    index: any;
}

const Task: React.FC<TaskProps> = ({taskName, index}) => {
    const {checkedTasksCount, setCheckedTasksCount, checkedTasks, updateTaskStatusInDatabase, updateTaskValueInDatabase, removeTask, tasksId, editTask} = useContext(TaskContext)
    const {screenWidth} = useContext(MainContext);
    const [taskDone, setTaskDone] = useState<boolean>(false);
    const [taskValue, setTaskValue] = useState<string>('')
    const [toggleDatepicker, setToggleDatepicker] = useState<boolean>(false)
    const [min, setMin] = useState<string>();
    const [hovering, setHovering] = useState<boolean>(false);


    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setMin(formattedDate);
    }, [])

    useEffect(() => {
        setTaskValue(taskName);
        setTaskDone(checkedTasks[index])
    }, [taskName])

    const changeTaskState = () =>{
        const taskStatus = taskDone;
        setTaskDone(!taskStatus);
        if(taskStatus == true) setCheckedTasksCount(checkedTasksCount-1);
        else setCheckedTasksCount(checkedTasksCount+1)
        updateTaskStatusInDatabase(tasksId[index], taskDone);
    }

    const changeTaskValue = (event: any) => {
        if(event.target.innerText == "") removeTask(tasksId[index])
        else updateTaskValueInDatabase(tasksId[index], event.target.innerText)
    }

    const onKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.blur();
          }
    }

    const onChangeDate = (event: any, id: any) => {
        const date = new Date(event.target.value);
        const currentDate = new Date();
        const formattedDate = date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
        const currentDateFormatted = currentDate.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
        if(formattedDate < currentDateFormatted) {
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

    return (
        <div id={"taskDiv" + tasksId[index]} className="flex flex-row w-full h-fit gap-3 content-center items-start mt-2 mb-2 ">
            <div className="mt-1 hover-trigger" onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)}><DragIcon hovering={hovering}/></div>
            <input onChange={changeTaskState} checked={taskDone} type="checkbox" className="w-5 h-5 hover:cursor-pointer md:mt-1 bg-white border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out"></input>
            <div id="name" className="flex justify-center w-full">
                <p id={"task"+tasksId[index]} onBlur={changeTaskValue} onKeyDown={onKeyDown} suppressContentEditableWarning={true} contentEditable={true} className={`resize-none text-sm md:text-lg bg-transparent border-none w-full overflow-auto ${taskDone && "line-through opacity-50 z-0"}`}>
                    {taskValue}
                </p>
            </div>
            <Calendar task={true} onChange={() => onChangeDate(event, tasksId[index])}/>
            <div className="cursor-pointer" onClick={() => removeTask(tasksId[index])}><TrashCanIcon color={"#919191"}/></div>
            {/* <div className="mt-1 hover-trigger" onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>=</div> */}
        </div>
    );
}
export default Task;
