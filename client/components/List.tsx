// 'use client'
// import { useContext, useEffect, useRef, useState } from "react";
// import { TaskContext } from "@/providers/TaskProvider";
// import PlusIcon from "@/icons/PlusIcon";
// import { GroupContext } from "@/providers/GroupProvider";
// import { ColorEnum } from "@/providers/MainProvider";
// import Task from "./Task";
// import Button from "./Button/Button";


// const List = () => {
//     const {tasks, addNewTask, changedDate} = useContext(TaskContext);
//     const {groupItem} = useContext(GroupContext);
//     const [disabled, setDisabled] = useState<boolean>(false);
//     const [toggleOptions, setToggleOptions] = useState<boolean>(false)
//     const [isMounted, setIsMounted] = useState(false); // New state to manage mounting
//     const [dateChangedTask, setDateChangedTask] = useState<boolean>(false);

//     useEffect(() => {
//         if(changedDate < 0) setDisabled(true);
//         else setDisabled(false);
//     }, [changedDate])

//     const handleToggleOptions = () => {
//         if (toggleOptions) {
//             setToggleOptions(false);
//             setTimeout(() => setIsMounted(false), 300);
//         } 
//         else {
//             setIsMounted(true);
//             setTimeout(() => setToggleOptions(true), 10); 
//         }
//     }

//     return (
//         <div className="flex flex-col items-start">
//             <div id="taskList" className="flex flex-col w-full">
//                 {tasks.map((taskName: any, index: any) => {
//                     return <Task index={index} key={index} taskName={taskName} dateChangedTask={dateChangedTask} setDateChangedTask={setDateChangedTask}/>
//                 })}
//             </div>
//             <div className="flex gap-3 mt-6 w-full justify-between">
//                 <Button 
//                     text={"Task"} 
//                     disabled={changedDate < 0} 
//                     onClick={() => addNewTask("", changedDate, groupItem)}
//                     backgroundColor={ColorEnum.BLUE}
//                     className={"hover:bg-blue-600"}
//                 >
//                     <PlusIcon/>
//                 </Button>
//             </div>
//         </div>

//     );
// }
// export default List;
