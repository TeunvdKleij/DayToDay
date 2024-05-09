'use client'
import axios from 'axios';
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
    groupItem: string;
    setGroupItem: (value: string) => void;
    showNote: boolean;
    setShowNote: (toggle: boolean) => void;
    groups: string[];
    setGroups: (value: string[]) => void;
    addGroup: (name: string) => void;
    removeGroup: (name: string) => void;
    removeNotesByGroup: (name: string) => void
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
    noteText: "",
    setNoteText: () => {},
    getNoteForADay: () => {},
    updateNote: () => {},
    groupItem: "School",
    setGroupItem: () => {},
    showNote: false,
    setShowNote: () => {},
    groups: [],
    setGroups: () => {},
    addGroup: () => {},
    removeGroup: () => {},
    removeNotesByGroup: () => {},
    removeTasksByGroup: () => {}

});

const TaskProvider: React.FC<TaskProps> = ({children}) => {
    const [tasksCount, setTasksCount] = useState(0);
    const [tasks, setTasks] = useState<string[]>([]);
    const [checkedTasksCount, setCheckedTasksCount] = useState(0);
    const [checkedTasks, setCheckedTasks] = useState<boolean[]>([])
    const [tasksId, setTasksId] = useState<string[]>([]);
    const [changedDate, setChangedDate] = useState<number>(0)
    const [noteText, setNoteText] = useState<string>("")
    const [groupItem, setGroupItem] = useState<string>("")
    const [showNote, setShowNote] = useState<boolean>(false)
    const [groups, setGroups] = useState<string[]>([]);
    const connectionString = "http://192.168.1.241:7267/api/"
    const con = "https://localhost:7267/api/"

    const startUp = async () => {
        setGroups(await getGroups())
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
        // const groupId = groups.indexOf(groupItem)+1
        // console.log(groupId);
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
        // if(groups == null) return null;
        // const groupId = groups.indexOf(groupItem)+1
        let result = await axios.post(con + "Task/TasksForADay", {ChangedDate: changedDate, GroupName: groupItem})
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
    const getGroups = async () =>{
        let result = await axios.get('https://localhost:7267/api/Group/GetGroups')
        .then(res => {
            return res.data.groups
        })
        .catch(error => {
            console.log('Error:', error);
        });
        return result
    }
    
    const getNoteForADay = async (changedDate: number, groupItem: string) => {
        // if(groups == null) return null;
        // const groupId = groups.indexOf(groupItem)+1
        let result = await axios.post("https://localhost:7267/api/Note/NoteForADay", {ChangedDate: changedDate, GroupName: groupItem})
            .then(res => {
                if(res.data.status == 200){
                    if(res.data.note.noteText != null) setNoteText(res.data.note.noteText);
                }
                
                //setNoteText(res.data.note.noteText);
            })
            .catch(error => {
                console.log('Error:', error);
            })
    }
    const addGroup = (name: string) => {
       let result = axios.post("https://localhost:7267/api/Group/AddGroup", {Name: name})
       .then(res => {
            result = res.data
            setGroups(res.data.groups);
       })
       .catch(err => {
            console.log('Error:', err);
       })
       return result
    }
    const removeTasksByGroup = (name: string) => {
        let result = axios.post("https://localhost:7267/api/Task/RemoveTasksByGroup", {Name: name})
        .then(res => {
             result = res.data
             console.log(result);
        })
        .catch(err => {
             console.log('Error:', err);
        })
        return result
    }
    const removeNotesByGroup = (name: string) => {
        let result = axios.post("https://localhost:7267/api/Note/RemoveNotesByGroup", {Name: name})
        .then(res => {
             result = res.data
             console.log(result);
        })
        .catch(err => {
             console.log('Error:', err);
        })
        return result
    }
    const removeGroup = (name: string) => {
        let result = axios.post("https://localhost:7267/api/Group/RemoveGroup", {Name: name})
        .then(res => {
             result = res.data
             console.log(result);
        })
        .catch(err => {
             console.log('Error:', err);
        })
        return result
    }


    const updateNote = async (changedDate: number, noteText: string, groupItem: string) => {
        const groupId = groups.indexOf(groupItem)+1
        await axios.post('https://localhost:7267/api/Note/UpdateNote', {ChangedDate: changedDate, NoteText: noteText, GroupName: groupItem})
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
            showNote,
            setShowNote,
            groups,
            setGroups,
            addGroup,
            removeGroup,
            removeNotesByGroup,
            removeTasksByGroup
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;