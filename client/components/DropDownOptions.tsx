import ArrowWithoutStickIcon, { directionEnum } from "@/icons/Arrows/ArrowWithoutStickIcon";
import { GroupContext } from "@/providers/GroupProvider";
import { TaskContext } from "@/providers/TaskProvider";
import { useContext, useEffect, useState } from "react";
import Dropdown, { DropdownIconsEnum } from "./Dropdown/Dropdown";


const DropDownOptions = () => {
    const {taskSortOptions, setSelectedSortOption, selectedSortOption} = useContext(TaskContext)
    const {toggleDropDown, setToggleDropDown} = useContext(GroupContext);
    const [formattedTaskOptions, setFormattedTaskOptions] = useState<any[]>([]);
    const [formattedSelectedTaskOptions, setFormattedSelectedTaskOptions] = useState<any>([]);

    const handleClick = (value: string) => {
        setSelectedSortOption(value);
        setToggleDropDown(!toggleDropDown);
    }

    useEffect(() => {
        const formattedData = taskSortOptions.map((item: string, index: number) => {
            return {
                value: item,
                onClick: () => handleClick(item),
            }
        })
        setFormattedTaskOptions(formattedData)
    }, [taskSortOptions]);

    // useEffect(() => {
    //     if(selectedSortOption){
    //         const formattedSelectedOption = selectedSortOption
    //         setFormattedSelectedTaskOptions(formattedSelectedOption);
    //     }
    // }, [selectedSortOption])

    return (
        // <Dropdown data={formattedTaskOptions} defaultItem={formattedSelectedTaskOptions}/>
        <div className="bg-zinc-800 border-[1px] border-neutral-600 z-10 flex absolute top-[128px] left-[280px] rounded-lg shadow-md shadow-zinc-900 blur-none">
            <ul id="sortList" className="p-3">
                {taskSortOptions.map((value: string, index: number) => {
                    if(value == selectedSortOption.value) return <li key={index} onClick={() => handleClick(value)} className="flex justify-between min-w-40">{value}<ArrowWithoutStickIcon direction={directionEnum.RIGHT} width={20} className={"fill-white"} /> </li>
                    return <li key={index} onClick={() => handleClick(value)}>{value}</li>
                })}
            </ul>
        </div>
    )
}
export default DropDownOptions;