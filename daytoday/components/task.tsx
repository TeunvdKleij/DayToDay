'use client'
import EditIcon from "@/icons/editIcon";
import TrashCanIcon from "@/icons/trashcanicon";
import { TaskContext } from "@/providers/TaskProvider";
import { useContext, useEffect, useState } from "react";

interface TaskProps {
    taskName: any; 
    index: any;
}

const Task: React.FC<TaskProps> = ({taskName, index}) => {
    const {checkedTasksCount, setCheckedTasksCount, checkedTasks, updateTaskStatusInDatabase, updateTaskValueInDatabase, deleteTask, tasksId, editTask} = useContext(TaskContext)
    const [taskDone, setTaskDone] = useState<boolean>(false);
    const [taskValue, setTaskValue] = useState<string>('')
    const [toggleDatepicker, setToggleDatepicker] = useState<boolean>(false)
    const [min, setMin] = useState<string>();

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
        if(event.target.innerText == "") deleteTask(tasksId[index])
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
        //make a toast alert of not being able to make a change to the past
        if(formattedDate < currentDateFormatted) return null
        editTask(id, formattedDate);
        event.target.value = '';

    }

    const toggleVisibilityDatepicker = () => {
        var editstate = toggleDatepicker;
        setToggleDatepicker(!editstate);
    }

    return (
        <div id={"taskDiv" + tasksId[index]} className="flex flex-row w-full gap-3 content-center items-start mt-2 mb-2 ">
            <input onChange={changeTaskState} checked={taskDone} type="checkbox" className="w-5 h-5 hover:cursor-pointer md:mt-1 bg-white border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out"></input>
            <div id="name" className="flex justify-center w-full">
                <p id={"task"+tasksId[index]} onBlur={changeTaskValue} onKeyDown={onKeyDown} suppressContentEditableWarning={true} contentEditable={true} className={`resize-none text-sm md:text-lg bg-transparent border-none w-full overflow-auto ${taskDone && "line-through opacity-50"}`}>
                    {taskValue}
                </p>
            </div>
            {/*{`text-black h-5 w-6 text-sm rounded-md ${toggleDatepicker ? "block" : "hidden"}`} */}
            <input type="date" id="datepicker" min={min} onChange={() => onChangeDate(event, tasksId[index])} className={`text-black h-5 w-6 text-sm rounded-md ${toggleDatepicker ? "block" : "hidden"}`}></input>
            <div className="cursor-pointer" id="editButton" onClick={toggleVisibilityDatepicker}><EditIcon/></div>
            <div className="cursor-pointer" onClick={() => deleteTask(tasksId[index])}><TrashCanIcon color={"#919191"}/></div>
        </div>
    );
}
export default Task;