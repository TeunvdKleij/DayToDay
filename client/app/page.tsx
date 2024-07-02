'use client'
import GDPRNotice from "@/components/GDPRNotice";
import { GroupContext } from "@/providers/GroupProvider";
import { NoteContext } from "@/providers/NoteProvider";
import { TaskContext } from "@/providers/TaskProvider";
import { useContext, useEffect, useState } from "react";
import Tasks from "@/components/Tasks/tasks";
import Wrapper from "@/components/Wrapper/wrapper";
import Menu from "@/components/Tasks/Menu/menu";

export default function Home() {
  const [percentage, setPercentage] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);
  const {tasksCount, checkedTasksCount, changedDate, selectedSortOption} = useContext(TaskContext);
  const {showNote, setShowNote, getNoteForADay} = useContext(NoteContext);
  const {groupItem, loading} = useContext(GroupContext);
  const [headerText, setHeaderText] = useState<string>()
  const [gdpr, setGdpr] = useState<any>();
  const [gdprDialog, setGdprDialog] = useState<boolean>(false);

  useEffect(() => {
    if(checkedTasksCount == 0 && tasksCount == 0) setPercentage(0);
    else setPercentage((checkedTasksCount/tasksCount)*100);
    if(checkedTasksCount/tasksCount == 1) setDone(true);
    else setDone(false);
  }, [checkedTasksCount, tasksCount])

  useEffect(() => {
    var gdprMessage = localStorage.getItem('gdpr')
    if(!gdprMessage || gdprMessage.includes("denied")) setGdpr(true);
  }, [])

  useEffect(() => {
    var gdprMessage = localStorage.getItem('gdpr')
    if(!gdprMessage || gdprMessage.includes("denied")) setGdprDialog(true);
    else setGdprDialog(false);
  }, [gdpr]);

  //useEffect to set the focus on the note when it becomes visible
  useEffect(() => {
    const textarea = document.getElementById('noteTextarea');
    if(textarea != null) textarea.focus();
  }, [showNote])

  //useEffect to set the header text based on if all tasks are selected or not
  useEffect(() => {
      if(selectedSortOption && selectedSortOption.value == "All tasks") setHeaderText("All tasks for " + groupItem);
      else if(changedDate == 0) setHeaderText("Today")
      else if(changedDate == 1) setHeaderText("Tomorrow")
      else if(changedDate == -1) setHeaderText("Yesteday")
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
    var dutchDayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return dutchDayNames[date.getDay()];
  }

  const getMonth = (changeDate: number) => {
    var date = new Date();
    date.setDate(date.getDate()+changeDate)
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return monthNames[date.getMonth()]
  }

  const getDayName = (changeDate: number) => {
    var date = new Date();
    date.setDate(date.getDate()+changeDate)
    return date.getDate();
  }
  
  return (
      <>
          <Wrapper>
              <Menu/>
              <Tasks/>
          </Wrapper>
          {(gdprDialog) && <GDPRNotice setGdpr={setGdpr}/>}
      </>
  );
}
