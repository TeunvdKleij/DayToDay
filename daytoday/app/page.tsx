'use client'
import MainTasks from "@/components/MainTasks";
import Note from "@/components/Note";
import SkeletonLoader from "@/components/SkeletonLoader";
import ShareIcon from "@/icons/ShareIcon";
import { GroupContext } from "@/providers/GroupProvider";
import { NoteContext } from "@/providers/NoteProvider";
import { TaskContext } from "@/providers/TaskProvider";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [percentage, setPercentage] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);
  const {tasksCount, checkedTasksCount, changedDate, selectedSortOption} = useContext(TaskContext);
  const {showNote, setShowNote, getNoteForADay} = useContext(NoteContext);
  const {groups, groupItem, toggleDropDown, loading} = useContext(GroupContext);
  const [headerText, setHeaderText] = useState<string>('')

  useEffect(() => {
    if(checkedTasksCount == 0 && tasksCount == 0) setPercentage(0);
    else setPercentage((checkedTasksCount/tasksCount)*100);
    if(checkedTasksCount/tasksCount == 1) setDone(true);
    else setDone(false);
  }, [checkedTasksCount, tasksCount])
  

  //useEffect to set the focus on the note when it becomes visible
  useEffect(() => {
    const textarea = document.getElementById('noteTextarea');
    if(textarea != null) textarea.focus();
  }, [showNote])

  //useEffect to set the header text based on if all tasks are selected or not
  useEffect(() => {
      if(selectedSortOption && selectedSortOption.value == "All tasks") setHeaderText("Alle taken voor " + groupItem);
      else if(changedDate == 0) setHeaderText("Vandaag")
      else if(changedDate == 1) setHeaderText("Morgen")
      else if(changedDate == -1) setHeaderText("Gisteren")
      else setHeaderText(getDay(changedDate) + " " + getDayName(changedDate) + " " + getMonth(changedDate))
  }, [selectedSortOption, groupItem, changedDate])


  const toggleNote = () => {
    const toggle = showNote
    setShowNote(!toggle);
    getNoteForADay(changedDate, groupItem);
  }

  const getDay = (changeDate: number) => {
    var date = new Date();
    date.setDate(date.getDate()+changeDate) 
    var dutchDayNames = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];
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
    <>
    {/* <a href="https://192.168.1.241:7267/swagger/index.html">Druk</a> */}
    <div id="main" className="flex flex-col min-h-screen m-0 bg-dark-mode">
      <div id="main" className={`flex flex-1 items-center flex-col`}>
        {!loading
          ?
          <MainTasks done={done} headerText={headerText} percentage={percentage}/>
          :
          <SkeletonLoader/>
        }
        <Note toggleNote={toggleNote}/>
        <div onClick={() => window.open('https://www.linkedin.com/in/teun-van-der-kleij-9b805a258/', '_blank')} className="hover:cursor-pointer m-5">© Teun van der Kleij, 2024</div>
      </div>
    </div>
    </>
  );
}
