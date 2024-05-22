import DatePickerEditIcon from "@/icons/DatePickerEditIcon";
import DatePickerIcon from "@/icons/DatePickerIcon";
import { MainContext } from "@/providers/MainProvider";
import { useContext, useEffect, useState } from "react";

interface CalendarInterface{
    task: boolean
    onChange: (event: any) => void
}

const Calendar = ({task, onChange} : CalendarInterface) => {
    return (
        <div className="relative flex justify-end bottom-0 right-0 w-8 h-5 items-center hover:cursor-pointer">
            <input type="date" className="absolute rounded-lg text-black w-5 h-5 opacity-0 z-10 hover:cursor-pointer" onChange={onChange}></input>
            <div className="absolute flex items-center justify-center z-0">{task ? <DatePickerEditIcon/> : <DatePickerIcon/> }</div>
        </div>
    );
}
export default Calendar;