import { useContext } from "react";
import GroupDropDown from "./GroupDropdown";
import Header from "./Header";
import List from "./List";

interface MainTasksInterface{
    done: boolean;
    headerText: string
    percentage: number
    toggleBlur: () => void
}

const MainTasks = ({done, headerText, percentage, toggleBlur} : MainTasksInterface) => {
    return (
        <div className="flex justify-center flex-col bg-eerie-black rounded-lg p-5 md:m-5 mt-5 md:w-2/3 w-4/5">
          <div className="flex justify-between mb-3 align-middle items-center">
            <div className="flex flex-col gap-5 mb-3 w-full">
              <Header done={done} headerText={headerText} percentage={percentage}/>
              <GroupDropDown toggleBlur={toggleBlur}/>
            </div>   
          </div>
          <List></List>
        </div>
    );
}
export default MainTasks;