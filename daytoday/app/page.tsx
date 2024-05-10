'use client'
import Footer from "@/components/Footer";
import GroupDropDown from "@/components/GroupDropdown";
import List from "@/components/list";
import Note from "@/components/note";
import SkeletonLoader from "@/components/skeletonLoader";
import ArrowWithoutStickIcon from "@/icons/ArrowWithoutStickIcon";
import { TaskContext } from "@/providers/TaskProvider";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-date-picker";

export default function Home() {
  const [percentage, setPercentage] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);
  const {tasksCount, checkedTasksCount, changedDate, showNote, setShowNote, groups } = useContext(TaskContext);
  const [blur, setBlur] = useState<boolean>(false);

  const toggleBlur = () => {
    const blurred = blur
    setBlur(!blurred);
  };
  const toggleBlurMain = () => {
    const blurred = blur
    if(blurred == true) setBlur(false);
  }

  useEffect(() => {
    if(checkedTasksCount == 0 && tasksCount == 0) setPercentage(0);
    else setPercentage((checkedTasksCount/tasksCount)*100);
    if(checkedTasksCount/tasksCount == 1) setDone(true);
    else setDone(false);
  }, [checkedTasksCount])

  useEffect(() => {
    if(checkedTasksCount == 0 && tasksCount == 0) setPercentage(0);
    else setPercentage((checkedTasksCount/tasksCount)*100);
    if(checkedTasksCount/tasksCount == 1) setDone(true);
    else setDone(false);
  }, [tasksCount])

  useEffect(() => {
    const textarea = document.getElementById('noteTextarea');
    if(textarea != null) {
      textarea.focus();
    }
  }, [showNote])

  const toggleNote = () => {
    const toggle = showNote
    setShowNote(!toggle);
  }




  const getDay = (changeDate: number) => {
    var date = new Date();
    date.setDate(date.getDate()+changeDate) 
    var dutchDayNames = ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'];
    return dutchDayNames[date.getDay()];
  }
  const getMonth = (changeDate: number) => {
    var date = new Date();
    date.setDate(date.getDate()+changeDate)
    var dutchMonthNames = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "october", "november", "december"]
    return dutchMonthNames[date.getMonth()]
  }
  const getDayName = (changeDate: number) => {
    var date = new Date();
    date.setDate(date.getDate()+changeDate)
    return date.getDate();
  }
  return (
    <div className="flex flex-col min-h-screen m-0">
      <div id="main" className={`flex flex-1 items-center flex-col ${blur ? " blur-sm" : ""}`} onClick={toggleBlurMain}>
        {groups && groups.length > 0
        ?
        <div className="flex justify-center flex-col bg-eerie-black rounded-lg p-5 md:m-5 mt-5 md:w-2/3 w-4/5">
          <div className="flex justify-between mb-3 align-middle items-center">
            <div className="flex flex-col gap-5 mb-3 w-full">
              <div className="flex justify-between w-full items-center">
                <h1 id="title" className="flex justify-center md:text-3xl text-xl font-bold">Taken voor {getDay(changedDate)} {getDayName(changedDate)} {getMonth(changedDate)}</h1>
                <div className={`w-1/5 rounded-full h-2.5 ${done ? "bg-green-800" :"bg-gray-700"}`}>
                  <div className={`${done ? "bg-green-600" :"bg-blue-600"} h-2.5 rounded-full w-5/5`} style={{ width: `${percentage}%`, transition: 'width 0.5s ease' }}></div>
                </div>
              </div>
              <GroupDropDown toggleBlur={toggleBlur}/>
            </div>  
          </div>
          <List></List>
        </div>
        : 
        <SkeletonLoader/>
        }
        <div className="flex justify-center flex-col bg-eerie-black rounded-lg p-5 m-5 md:w-2/3 w-4/5">
          <div className="flex justify-between mb-3 align-middle items-center">
            <h1 id="title" className="flex justify-center md:text-3xl text-xl font-bold">Notitie</h1>
            <div onClick={toggleNote} className={`hover:cursor-pointer ${showNote && "mirror"}`}><ArrowWithoutStickIcon/></div>
          </div>
          {showNote && <div className="fadeIn"><Note/></div>}

        </div>
      </div>
      <div className="p-1 text-center m-0"><Footer/></div>
    </div>
  );
}
