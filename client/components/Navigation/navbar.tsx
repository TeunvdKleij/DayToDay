'use client'


import Progressbar from "@/components/Navigation/Progressbar/progressbar";
import {useContext, useEffect, useState} from "react";
import {useTasks} from "@/providers/TaskProvider";
import {useMain} from "@/providers/MainProvider";
import {useGroup} from "@/providers/GroupProvider";
import {usePathname, useRouter} from "next/navigation";
import {UserContext} from "@/providers/UserProvider";
import CalendarIcon from "@/icons/CalendarIcon";
import AccountIcon from "@/icons/AccountIcon";

const Navbar = () => {
    const [percentage, setPercentage] = useState<number>(0);
    const [done, setDone] = useState<boolean>(false);
    const [calendarHover, setCalendarHover] = useState<boolean>(false)
    const [accountHover, setAccountHover] = useState<boolean>(false)
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
        const selectedPicked = new Date(event.target.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = getDate(selectedPicked)
        selectedDate.setHours(0,0,0,0)

        const differenceInTime = selectedDate.getTime() - today.getTime();
        const differenceInDays = (differenceInTime / (1000 * 3600 * 24)).toFixed(0)

        changeDateToDate(parseInt(differenceInDays));
        event.target.value = ""
    }

    const getDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return new Date(`${year}-${month}-${day}`);

    }


    const changeDateToDate = (number: number) => {
        setChangedDate(number);
        getTasksForADay(number, groupItem);
        // getNoteForADay(number, groupItem);
    }


    return (
        <nav className={"fixed shadow-xl z-40 left-0 top-0 w-full min-h-[60px] bg-[#252525] flex justify-start flex-col align-middle items-center"}>
            <div className="nav-wrapper box-border pl-[15px] pr-[15px] max-w-[1366px] w-full h-[60px] flex justify-between items-center align-middle gap-[10px] flex-row">
                <div className={"flex flex-auto w-full h-full justify-start items-center align-middle gap-[10px]  flex-row"}></div>
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
                    <button className={"rounded-full w-[40px] h-[40px] flex justify-center hover:cursor-pointer"}
                    style={{backgroundColor: calendarHover ? settings.color : "#555"}}
                    onMouseEnter={() => setCalendarHover(true)}
                    onMouseLeave={() => setCalendarHover(false)}>
                        <CalendarIcon classname="absolute top-[15px] hover:cursor-pointer"/>
                        <input onChange={(e) => changeDateWithDatepicker(e)} type={"date"}
                               className={"position:absolute w-full h-full text-3xl opacity-0 hover:cursor-pointer"}/>
                    </button>
                    <button onClick={() => router.push("/account")} onMouseEnter={() => setAccountHover(true)} onMouseLeave={() => setAccountHover(false)}
                        style={{backgroundColor: accountHover || pathname == "/account" ? settings.color : "#555"}}
                        className={`bg-neutral-600 rounded-full w-[40px] h-[40px] flex justify-center items-center`}>
                        <AccountIcon/>
                    </button>
                </div>
            </div>
            {screenWidth && screenWidth < 768 && <Progressbar percentage={percentage} done={done} />}
        </nav>
    )
}

export default Navbar;