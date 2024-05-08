'use client'
import axios from 'axios';
import { get } from 'http';
import React, {createContext, ReactNode, useEffect, useState} from 'react';
interface TaskProps {
    children: ReactNode,
}
interface TaskContextProps {
    tasksCount: number,
    setTasksCount: (newValue: number) => void;
    tasks: string[];
    setTasks: (newValue: any) => void;
    checkedTasksCount: number;
    setCheckedTasksCount: (newValue: number) => void;
    checkedTasks: boolean[];
    setCheckedTasks: ([]: boolean[]) => void;
    addNewTask: (taskName: string, changedDate: number, groupItem: string) => void;
    updateTaskStatusInDatabase: (id: string, taskDone: boolean) => void;
    updateTaskValueInDatabase: (id: string, taskName: string) => void;
    deleteTask: (id: string) => void;
    tasksId: string[];
    changedDate: number;
    setChangedDate: (newValue: number) => void;
    getTasksForADay: (changedDate: number, group: string) => void;
    editTask: (id:string, changedDate: any) => void;
    noteText: string;
    setNoteText: (text: string) => void;
    getNoteForADay: (changed: any, groupItem: string) => void;
    updateNote: (changed: number, text: string, groupItem: string) => void;
    dropdownItems: string[];
    setDropdownItems: (value: string[]) => void;
    groupItem: string;
    setGroupItem: (value: string) => void;
}

export const TaskContext = createContext<TaskContextProps>({
    tasksCount: 0,
    setTasksCount: () => {},
    tasks: [],
    setTasks: () => {},
    checkedTasksCount: 0,
    setCheckedTasksCount: () => {},
    checkedTasks: [],
    setCheckedTasks: ([]: boolean[]) => {},
    addNewTask: () => {},
    updateTaskStatusInDatabase: () => {},
    updateTaskValueInDatabase: () => {},
    deleteTask: () => {},
    tasksId: [],
    changedDate: 0,
    setChangedDate: () => {},
    getTasksForADay: () => {},
    editTask: () => {},
    noteText: "",
    setNoteText: () => {},
    getNoteForADay: () => {},
    updateNote: () => {},
    dropdownItems: ["School", "Home", "Work"],
    setDropdownItems: () => {},
    groupItem: "School",
    setGroupItem: () => {},
});

const TaskProvider: React.FC<TaskProps> = ({children}) => {
    const [tasksCount, setTasksCount] = useState(0);
    const [tasks, setTasks] = useState<string[]>([]);
    const [checkedTasksCount, setCheckedTasksCount] = useState(0);
    const [checkedTasks, setCheckedTasks] = useState<boolean[]>([])
    const [tasksId, setTasksId] = useState<string[]>([]);
    const [changedDate, setChangedDate] = useState<number>(0)
    const [noteText, setNoteText] = useState<string>("")
    const [dropdownItems, setDropdownItems] = useState<string[]>(["School", "Home", "Work"])
    const [groupItem, setGroupItem] = useState<string>("School")
    let focusTask = false;

    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const addNewTask = async (taskName: string, changedDate: number, groupItem: string) => {
        const groupId = dropdownItems.indexOf(groupItem)+1
        let result = await axios.post("https://localhost:7267/api/Task/AddTask", {TaskName: taskName, ChangedDate: changedDate, GroupId: groupId})
        .then(async res => {
            await getTasksForADay(changedDate, groupItem);
            await getNoteForADay(changedDate, groupItem);
            const task = document.getElementById('task' + res.data.id)
            task?.focus();
            // if(taskList != null){
            //     const task = taskList.children[(tasks.length)]
            //     if(task != null){
            //         const input = task.children[1].children[0];
            //         console.log(input);
            //     }
            // }
            
        })
        .catch(err => {
            return err;
        })
        setTasksCount(tasks.length)
    }

    const updateTaskValueInDatabase = async (id: string, taskName: string) => {
        await axios.put('https://localhost:7267/api/Task/UpdateTaskValue', {Id: id, TaskName: taskName})
        .catch(error => {
            console.log('Error:', error);
        });
    }

    const updateTaskStatusInDatabase = async (id: string, taskDone: boolean) => {
        await axios.put('https://localhost:7267/api/Task/UpdateTaskStatus', {Id: id, Done: !taskDone})
        .catch(error => {
            console.log('Error:', error);
        });
    }

    const getTasksForADay = async (changedDate: number, groupItem: string) => {
        const groupId = dropdownItems.indexOf(groupItem)+1
        let result = await axios.post("https://localhost:7267/api/Task/TasksForADay", {ChangedDate: changedDate, GroupId: groupId})
            .then(res => {
                var taskList = [];
                var checkedlist = [];
                var taskIds = [];
                var checkedTasks = 0;
                for(let i = 0; i < res.data.tasks.length; i++){
                    taskList.push(res.data.tasks[i].taskName)
                    checkedlist.push(res.data.tasks[i].done)
                    taskIds.push(res.data.tasks[i].taskId)
                    if(res.data.tasks[i].done) checkedTasks++;
                }
                setTasks(taskList);
                setCheckedTasks(checkedlist);
                setTasksCount(taskList.length);
                setCheckedTasksCount(checkedTasks)
                setTasksId(taskIds);
                return taskList
            })
            .catch(error => {
                console.log('Error:', error);
            })
            return result
    }
    const getNoteForADay = async (changedDate: number, groupItem: string) => {
        const groupId = dropdownItems.indexOf(groupItem)+1
        let result = await axios.post("https://localhost:7267/api/Note/NoteForADay", {ChangedDate: changedDate, GroupId: groupId})
            .then(res => {
                setNoteText(res.data.note.noteText);
            })
            .catch(error => {
                console.log('Error:', error);
            })
    }
    const updateNote = async (changedDate: number, noteText: string, groupItem: string) => {
        const groupId = dropdownItems.indexOf(groupItem)+1
        await axios.post('https://localhost:7267/api/Note/UpdateNote', {ChangedDate: changedDate, NoteText: noteText, GroupId: groupId})
        .catch(error => {
            console.log('Error:', error);
        });
    }

    const deleteTask = async (id: string) => {
        await axios.post('https://localhost:7267/api/Task/DeleteTask', {Id: id})
        .then(() => {
          getTasksForADay(changedDate, groupItem);
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }
    const editTask = async (id: string, changeDate: any) => {
        await axios.put('https://localhost:7267/api/Task/UpdateTaskDate', {Id: id, date: changeDate})
        .then(res => {
            getTasksForADay(changedDate, groupItem)
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }

    useEffect(() => {
        getTasksForADay(changedDate, groupItem);
        getNoteForADay(changedDate, groupItem);
    }, [])

    return (
        <TaskContext.Provider value={{
            tasksCount, 
            setTasksCount,
            tasks,
            setTasks,
            checkedTasksCount,
            setCheckedTasksCount,
            checkedTasks,
            setCheckedTasks,
            addNewTask,
            updateTaskStatusInDatabase,
            updateTaskValueInDatabase,
            deleteTask,
            tasksId,
            changedDate,
            setChangedDate,
            getTasksForADay,
            editTask,
            noteText,
            setNoteText,
            getNoteForADay,
            updateNote,
            groupItem,
            setGroupItem,
            dropdownItems,
            setDropdownItems
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;