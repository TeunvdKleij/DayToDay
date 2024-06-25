'use client'


import Progressbar from "@/components/Navigation/Progressbar/progressbar";
import {useContext, useEffect, useState} from "react";
import {useTasks} from "@/providers/TaskProvider";
import {useMain} from "@/providers/MainProvider";
import {useGroup} from "@/providers/GroupProvider";
import {usePathname, useRouter} from "next/navigation";
import {UserContext} from "@/providers/UserProvider";

const Navbar = () => {
    const [percentage, setPercentage] = useState<number>(0);
    const [done, setDone] = useState<boolean>(false);
    const {tasksCount, checkedTasksCount, getTasksForADay, setChangedDate} = useTasks();
    const {groupItem} = useGroup();
    const {screenWidth} = useMain();
    const router = useRouter();
    const pathname = usePathname();
    const {settings} = useContext(UserContext);

    useEffect(() => {
        if(checkedTasksCount == 0 && tasksCount == 0) setPercentage(0);
        else setPercentage((checkedTasksCount/tasksCount)*100);
        if(checkedTasksCount/tasksCount == 1) setDone(true);
        else setDone(false);
    }, [checkedTasksCount, tasksCount]);

    const changeDateWithDatepicker = (event: any) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();
        const differenceMs = selectedDate.getTime() - today.getTime();
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
        changeDateToDate(differenceDays);
        event.target.value = ""
    }

    const changeDateToDate = (number: number) => {
        setChangedDate(number);
        getTasksForADay(number, groupItem);
        // getNoteForADay(number, groupItem);
    }


    return (
        <nav className={"fixed shadow-xl z-40 left-0 top-0 w-full min-h-[60px] bg-[#252525] flex justify-start flex-col align-middle items-center"}>
            <div className="nav-wrapper box-border pl-[15px] pr-[15px] max-w-[1366px] w-full h-[60px] flex justify-between items-center align-middle gap-[10px] flex-row">
                <div className={"flex flex-auto w-full h-full justify-start items-center align-middle gap-[10px]  flex-row"}>
                    <button className={"bg-[#555] rounded-[50px] w-[40px] h-[40px] flex justify-center align-middle items-center hover:bg-blue-500"}>
                        <svg className={"w-[25px] h-[25px] fill-[#c5c5c5] hover:hover-fill-white"} width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">                            <path
                                d="M4 5.00002C4 4.77901 4.0878 4.56705 4.24408 4.41076C4.40036 4.25448 4.61232 4.16669 4.83333 4.16669H13.1667C13.3877 4.16669 13.5996 4.25448 13.7559 4.41076C13.9122 4.56705 14 4.77901 14 5.00002C14 5.22103 13.9122 5.433 13.7559 5.58928C13.5996 5.74556 13.3877 5.83335 13.1667 5.83335H4.83333C4.61232 5.83335 4.40036 5.74556 4.24408 5.58928C4.0878 5.433 4 5.22103 4 5.00002ZM4 8.33335C4 8.11234 4.0878 7.90038 4.24408 7.7441C4.40036 7.58782 4.61232 7.50002 4.83333 7.50002H13.1667C13.3877 7.50002 13.5996 7.58782 13.7559 7.7441C13.9122 7.90038 14 8.11234 14 8.33335C14 8.55437 13.9122 8.76633 13.7559 8.92261C13.5996 9.07889 13.3877 9.16669 13.1667 9.16669H4.83333C4.61232 9.16669 4.40036 9.07889 4.24408 8.92261C4.0878 8.76633 4 8.55437 4 8.33335ZM4.83333 10.8334C4.61232 10.8334 4.40036 10.9212 4.24408 11.0774C4.0878 11.2337 4 11.4457 4 11.6667C4 11.8877 4.0878 12.0997 4.24408 12.2559C4.40036 12.4122 4.61232 12.5 4.83333 12.5H13.1667C13.3877 12.5 13.5996 12.4122 13.7559 12.2559C13.9122 12.0997 14 11.8877 14 11.6667C14 11.4457 13.9122 11.2337 13.7559 11.0774C13.5996 10.9212 13.3877 10.8334 13.1667 10.8334H4.83333ZM4 15C4 14.779 4.0878 14.567 4.24408 14.4108C4.40036 14.2545 4.61232 14.1667 4.83333 14.1667H8.16667C8.38768 14.1667 8.59964 14.2545 8.75592 14.4108C8.9122 14.567 9 14.779 9 15C9 15.221 8.9122 15.433 8.75592 15.5893C8.59964 15.7456 8.38768 15.8334 8.16667 15.8334H4.83333C4.61232 15.8334 4.40036 15.7456 4.24408 15.5893C4.0878 15.433 4 15.221 4 15Z"
                                />
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0.666626 3.33334C0.666626 2.6703 0.930018 2.03442 1.39886 1.56558C1.8677 1.09674 2.50358 0.833344 3.16663 0.833344H14.8333C15.4963 0.833344 16.1322 1.09674 16.6011 1.56558C17.0699 2.03442 17.3333 2.6703 17.3333 3.33334V16.6667C17.3333 17.3297 17.0699 17.9656 16.6011 18.4344C16.1322 18.9033 15.4963 19.1667 14.8333 19.1667H3.16663C2.50358 19.1667 1.8677 18.9033 1.39886 18.4344C0.930018 17.9656 0.666626 17.3297 0.666626 16.6667V3.33334ZM3.16663 2.50001H14.8333C15.0543 2.50001 15.2663 2.58781 15.4225 2.74409C15.5788 2.90037 15.6666 3.11233 15.6666 3.33334V16.6667C15.6666 16.8877 15.5788 17.0997 15.4225 17.2559C15.2663 17.4122 15.0543 17.5 14.8333 17.5H3.16663C2.94561 17.5 2.73365 17.4122 2.57737 17.2559C2.42109 17.0997 2.33329 16.8877 2.33329 16.6667V3.33334C2.33329 3.11233 2.42109 2.90037 2.57737 2.74409C2.73365 2.58781 2.94561 2.50001 3.16663 2.50001Z"
                                  />
                        </svg>
                    </button>
                </div>
                <div
                    className={"flex flex-auto w-full h-full justify-center items-center align-middle gap-[10px] flex-row"}>
                    <h1 className={"text-xl"}>DayToDay</h1>
                </div>
                <div
                    className={"flex flex-auto w-full h-full justify-end items-center align-middle gap-[10px] flex-row"}>

                    {screenWidth && screenWidth >= 768 &&
                        <div className={"relative pr-[10px] pl-[10px] flex justify-center items-center align-middle flex-row gap-[10px] h-auto w-auto"}>
                            <div className={"w-[150px] w-min-[150px] flex justify-center items-center align-middle h-auto rounded-[50px] overflow-hidden"}>
                                <Progressbar percentage={percentage} done={done}/>
                            </div>
                            <div className={"w-auto h-full flex justify-between items-center align-middle gap-[10px] flex-row"}>
                                <p className={"text-sm text-[#959595]"}>{checkedTasksCount}/{tasksCount}</p>
                            </div>
                        </div>
                    }
                    <button
                        className={"bg-[#555] rounded-[50px] w-[40px] h-[40px] flex justify-center align-middle items-center hover:bg-blue-500"}>
                        <svg className={"absolute w-[22px] h-[22px] fill-[#c5c5c5] hover:hover-fill-white"} width="18"
                             height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.666626 6.49999C0.666626 4.92832 0.666626 4.14332 1.15496 3.65499C1.64329 3.16666 2.42829 3.16666 3.99996 3.16666H14C15.5716 3.16666 16.3566 3.16666 16.845 3.65499C17.3333 4.14332 17.3333 4.92832 17.3333 6.49999C17.3333 6.89249 17.3333 7.08916 17.2116 7.21166C17.0891 7.33332 16.8916 7.33332 16.5 7.33332H1.49996C1.10746 7.33332 0.910793 7.33332 0.788293 7.21166C0.666626 7.08916 0.666626 6.89166 0.666626 6.49999Z"
                            />
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0.666626 14C0.666626 15.5717 0.666626 16.3567 1.15496 16.845C1.64329 17.3333 2.42829 17.3333 3.99996 17.3333H14C15.5716 17.3333 16.3566 17.3333 16.845 16.845C17.3333 16.3567 17.3333 15.5717 17.3333 14V9.83333C17.3333 9.44083 17.3333 9.24417 17.2116 9.12167C17.0891 9 16.8916 9 16.5 9H1.49996C1.10746 9 0.910793 9 0.788293 9.12167C0.666626 9.24417 0.666626 9.44167 0.666626 9.83333V14ZM4.83329 11.5C4.83329 11.1075 4.83329 10.9108 4.95496 10.7883C5.07746 10.6667 5.27496 10.6667 5.66663 10.6667H7.33329C7.72579 10.6667 7.92246 10.6667 8.04496 10.7883C8.16663 10.9108 8.16663 11.1075 8.16663 11.5C8.16663 11.8925 8.16663 12.0892 8.04496 12.2117C7.92246 12.3333 7.72496 12.3333 7.33329 12.3333H5.66663C5.27413 12.3333 5.07746 12.3333 4.95496 12.2117C4.83329 12.0892 4.83329 11.8917 4.83329 11.5ZM4.95496 14.1217C4.83329 14.2442 4.83329 14.4417 4.83329 14.8333C4.83329 15.225 4.83329 15.4225 4.95496 15.545C5.07746 15.6667 5.27496 15.6667 5.66663 15.6667H7.33329C7.72579 15.6667 7.92246 15.6667 8.04496 15.545C8.16663 15.4225 8.16663 15.225 8.16663 14.8333C8.16663 14.4417 8.16663 14.2442 8.04496 14.1217C7.92246 14 7.72496 14 7.33329 14H5.66663C5.27413 14 5.07746 14 4.95496 14.1217ZM9.83329 11.5C9.83329 11.1075 9.83329 10.9108 9.95496 10.7883C10.0775 10.6667 10.275 10.6667 10.6666 10.6667H12.3333C12.7258 10.6667 12.9225 10.6667 13.045 10.7883C13.1666 10.9108 13.1666 11.1075 13.1666 11.5C13.1666 11.8925 13.1666 12.0892 13.045 12.2117C12.9225 12.3333 12.725 12.3333 12.3333 12.3333H10.6666C10.2741 12.3333 10.0775 12.3333 9.95496 12.2117C9.83329 12.0892 9.83329 11.8917 9.83329 11.5ZM9.95496 14.1217C9.83329 14.2442 9.83329 14.4417 9.83329 14.8333C9.83329 15.225 9.83329 15.4225 9.95496 15.545C10.0775 15.6667 10.2741 15.6667 10.6666 15.6667H12.3333C12.7258 15.6667 12.9225 15.6667 13.045 15.545C13.1666 15.4225 13.1666 15.225 13.1666 14.8333C13.1666 14.4417 13.1666 14.2442 13.045 14.1217C12.9225 14 12.725 14 12.3333 14H10.6666C10.2741 14 10.0775 14 9.95496 14.1217Z"
                            />
                            <path d="M4.83325 1.5V4M13.1666 1.5V4" stroke="#c5c5c5" strokeWidth="2"
                                  strokeLinecap="round"/>
                        </svg>
                        <input onChange={(e) => changeDateWithDatepicker(e)} type={"date"}
                               className={"position:absolute w-full h-full opacity-0"}/>
                    </button>
                    <button onClick={() => router.push("/account")}
                            style={{backgroundColor: pathname === "/account" && settings?.color}}
                        className={`bg-[#555] rounded-[50px] w-[40px] h-[40px] flex justify-center align-middle items-center`}>
                        <svg className={"w-[20px] h-[20px] fill-[#c5c5c5] hover:hover-fill-white"} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 10C12.42 10 16 11.79 16 14V16H0V14C0 11.79 3.58 10 8 10Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {screenWidth && screenWidth < 768 && <Progressbar percentage={percentage} done={done} />}
        </nav>
    )
}

export default Navbar;