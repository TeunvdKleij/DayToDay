'use client'
import axios, { AxiosResponse } from 'axios';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { NoteContext } from './NoteProvider';
import { GroupContext } from './GroupProvider';
import { toast } from 'react-toastify';
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
    getTasksForAGroup: (group: string) => void;
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
    removeTasksByGroup: () => {},
    getTasksForAGroup: () => {},

});

const TaskProvider: React.FC<TaskProps> = ({children}) => {
    const [tasksCount, setTasksCount] = useState(0);
    const [tasks, setTasks] = useState<string[]>([]);
    const [checkedTasksCount, setCheckedTasksCount] = useState(0);
    const [checkedTasks, setCheckedTasks] = useState<boolean[]>([])
    const [tasksId, setTasksId] = useState<string[]>([]);
    const [changedDate, setChangedDate] = useState<number>(0)
    const [newTaskAdded, setNewTaskAdded] = useState<boolean>(false);
    const {getNoteForADay} = useContext(NoteContext);
    const {setGroups, setGroupItem, groups, groupItem, getGroups, toggleBool} = useContext(GroupContext)
    const {noteText, setShowNote, showNote} = useContext(NoteContext)


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
        console.info(showNote);
    }, [showNote])

    useEffect(() => {
        getTasksForADay(changedDate, groupItem);
        getNoteForADay(changedDate, groupItem);
    }, [groupItem]);


    const addNewTask = async (taskName: string, changedDate: number, groupItem: string) => {
        if(changedDate < 0) {
            toast.error("Can't add task to the past")
            return null;
        }
        setNewTaskAdded(true);
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "Task/AddTask", {TaskName: taskName, ChangedDate: changedDate, GroupName: groupItem})
        .then(async res => {
            if(!toggleBool) await getTasksForADay(changedDate, groupItem);
            else await getTasksForAGroup(groupItem);
            await getNoteForADay(changedDate, groupItem);
            setNewTaskAdded(false);
        })
        .catch(err => {
            return err;
        })
    }


    useEffect(() => {
        const lastTask = document.getElementById('taskList')?.children[tasks.length-1];
        if(lastTask){
            const id = lastTask?.id.replace("Div", "");
            document.getElementById(id)?.focus();
        }
    }, [newTaskAdded])

    const updateTaskValueInDatabase = async (id: string, taskName: string) => {
        await axios.put(process.env.NEXT_PUBLIC_API_URL + "Task/UpdateTaskValue", {Id: id, TaskName: taskName})
        .catch(error => {
            console.log('Error:', error);
        });
    }

    const updateTaskStatusInDatabase = async (id: string, taskDone: boolean) => {
        await axios.put(process.env.NEXT_PUBLIC_API_URL + "Task/UpdateTaskStatus", {Id: id, Done: !taskDone})
        .catch(error => {
            console.log('Error:', error);
        });
    }

    const fillTasks = (res: AxiosResponse<any, any>) =>{
        var taskList: any[] = [];
        var checkedlist: any[] = [];
        var taskIds: any[] = [];
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
    }

    const getTasksForADay = async (changedDate: number, groupItem: string) => {
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "Task/TasksForADay", {ChangedDate: changedDate, GroupName: groupItem})
            .then(res => {
                return fillTasks(res);
            })
            .catch(error => {
                console.log('Error:', error);
            })
            return result
    }

    const getTasksForAGroup = async (groupItem: string) => {
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "Task/TasksForAGroup", {GroupName: groupItem})
            .then(res => {
                return fillTasks(res);
            })
            .catch(error => {
                console.log('Error:', error);
            })
            return result
    }

    const removeTasksByGroup = async (name: string) => {
        let result = await axios.post(process.env.NEXT_PUBLIC_API_URL + "Task/RemoveTasksByGroup", {GroupName: name})
        .then(res => {
            console.log(res)
             return res.data
        })
        .catch(err => {
             console.log('Error:', err);
        })
        return result
    }

    const deleteTask = async (id: string) => {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "Task/DeleteTask", {Id: id})
        .then(async () => {
            if(!toggleBool) await getTasksForADay(changedDate, groupItem);
            else await getTasksForAGroup(groupItem);
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }
    
    const editTask = async (id: string, changeDate: any) => {
        await axios.put(process.env.NEXT_PUBLIC_API_URL + "Task/UpdateTaskDate", {Id: id, date: changeDate})
        .then(async res => {
            if(!toggleBool) await getTasksForADay(changedDate, groupItem);
            else await getTasksForAGroup(groupItem);
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
            removeTasksByGroup,
            getTasksForAGroup,
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;