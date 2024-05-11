'use client'
import axios from 'axios';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { NoteContext } from './NoteProvider';
import { GroupContext } from './GroupProvider';
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
    removeTasksByGroup: (name: string) => void
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
    removeTasksByGroup: () => {}

});

const TaskProvider: React.FC<TaskProps> = ({children}) => {
    const [tasksCount, setTasksCount] = useState(0);
    const [tasks, setTasks] = useState<string[]>([]);
    const [checkedTasksCount, setCheckedTasksCount] = useState(0);
    const [checkedTasks, setCheckedTasks] = useState<boolean[]>([])
    const [tasksId, setTasksId] = useState<string[]>([]);
    const [changedDate, setChangedDate] = useState<number>(0)
    const {getNoteForADay} = useContext(NoteContext);
    const {setGroups, setGroupItem, groups, groupItem, getGroups} = useContext(GroupContext)

    const startUp = async () => {
        setGroups(await getGroups());
        const groupName = localStorage.getItem('groupSelection')
        if(groupName != null) setGroupItem(groupName);
        else {setGroupItem(groups[0])}
    }

    useEffect(() => {
       startUp()
    }, [])

    useEffect(() => {
        getTasksForADay(changedDate, groupItem);
        getNoteForADay(changedDate, groupItem);
    }, [groups])

    useEffect(() => {
        getTasksForADay(changedDate, groupItem);
        getNoteForADay(changedDate, groupItem);
    }, [groupItem])

    const addNewTask = async (taskName: string, changedDate: number, groupItem: string) => {
        if(changedDate < 0) {
            console.log("Can't add task, you're in the past!")
            //make a toast
            return null;
        }
        let result = await axios.post("https://localhost:7267/api/Task/AddTask", {TaskName: taskName, ChangedDate: changedDate, GroupName: groupItem})
        .then(async res => {
            await getTasksForADay(changedDate, groupItem);
            await getNoteForADay(changedDate, groupItem);
            const task = document.getElementById('task' + res.data.id)
            task?.focus();   
        })
        .catch(err => {
            return err;
        })
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
        let result = await axios.post("https://localhost:7267/api/Task/TasksForADay", {ChangedDate: changedDate, GroupName: groupItem})
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

    const removeTasksByGroup = (name: string) => {
        let result = axios.post("https://localhost:7267/api/Task/RemoveTasksByGroup", {Name: name})
        .then(res => {
             result = res.data
        })
        .catch(err => {
             console.log('Error:', err);
        })
        return result
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
            removeTasksByGroup
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;