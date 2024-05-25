'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import ArrowWithoutStickIcon, { directionEnum } from "@/icons/ArrowWithoutStickIcon";
import FolderIcon from "@/icons/Dropdown/folderIcon";
import FilterIcon from "@/icons/Dropdown/filterIcon";
import DeleteIcon from "@/icons/Dropdown/deleteIcon";

export enum DropdownIconsEnum {
    FOLDER = "folder",
    FILTER = "filter",
    DELETE = "delete",
}

interface DropdownProps {
    children?: ReactNode,
    icon?: DropdownIconsEnum,
    data?: DataProps[],
    defaultItem?: DataProps,
    visible?: boolean,
    setVisible?: (value: boolean) => void,
}

interface DataProps {
    value: string,
    onClick: () => void,
    icon?: DropdownIconsEnum,
    actions?: DataActionProps[],
}

interface DataActionProps {
    icon: DropdownIconsEnum,
    onClick?: () => void,
}

const Dropdown = ({ children, icon, data, defaultItem, visible, setVisible }: DropdownProps) => {
    const [internalVisible, setInternalVisible] = useState<boolean>(false);
    const [animate, setAnimate] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>(defaultItem);

    visible = visible !== undefined ? visible : internalVisible;
    setVisible = setVisible || setInternalVisible;

    useEffect(() => {
        if(defaultItem) setSelectedItem(defaultItem);
        else if(data && data.length > 0) setSelectedItem(data[0]);
    }, [data]);

    const handleItemClick = (e: any, item: any) => {
        if(item.value === selectedItem.value) handleToggleDropdown();
        else {
            if(!e.target.classList.contains("dropdown-btn")) return;
            item.onClick();
            setSelectedItem(item);
            handleToggleDropdown();
        }
    };

    const handleToggleDropdown = () => {
        if (visible) {
            setAnimate(true);
            setTimeout(() => {
                setVisible(false);
                setAnimate(false);
            }, 190);
        } else setVisible(true);
    };

    return (
        <div className="relative">
            <button onClick={() => handleToggleDropdown()}
                    className="text-zinc-700 h-[40px] w-fit font-semibold text-xs flex align-center justify-between items-center bg-zinc-300 pl-2 pr-2 pb-1 pt-1 gap-2 rounded-lg hover:bg-zinc-400">
                {icon === DropdownIconsEnum.FOLDER &&
                    <FolderIcon className="fill-none w-[20px] h-[20px] stroke-zinc-700" />}
                {icon === DropdownIconsEnum.FILTER &&
                    <FilterIcon className="fill-none w-[20px] h-[20px] stroke-zinc-700" />}
                {selectedItem ? selectedItem.value : "Select item ..."}
                <ArrowWithoutStickIcon className="fill-zinc-700" width={25} direction={directionEnum.DOWN} />
            </button>

            {(visible || animate) && (
                <>
                    <div onClick={() => handleToggleDropdown()}
                         className={`inset-0 backdrop-blur-sm fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[100] ${animate ? "dropdown-animated-blur-out" : "dropdown-animated-blur-in"}`} />
                    <div
                        className={`absolute w-auto top-full flex-col justify-center gap-1 flex bg-[#252525] z-[101] rounded-lg p-1 border-[1px]  border-[#454545] min-w-[200px] ${animate ? "dropdown-pop-out" : "dropdown-pop-in"}`}>
                        <div className="flex flex-col gap-1 mb-3">
                            {data && data.length > 0 && data.map((item, index) => (
                                <button key={item.value + index} onClick={(e) => handleItemClick(e, item)}
                                        className={`${item.value === selectedItem.value ? "bg-[#555]" : ""} dropdown-btn text-zinc-300 w-full text-nowrap h-[40px] font-semibold text-sm flex align-center justify-start items-center bg-none pl-2 pr-2 pb-1 pt-1 gap-2 rounded-lg hover:bg-[#666]`}>
                                    {item.icon === DropdownIconsEnum.FOLDER &&
                                        <FolderIcon className="fill-none w-[20px] h-[20px] stroke-zinc-300" />}
                                    {item.icon === DropdownIconsEnum.FILTER &&
                                        <FilterIcon className="fill-none w-[20px] h-[20px] stroke-zinc-300" />}
                                    {item.value}
                                    {item.actions && item.actions.length > 0 && (
                                        <div className="ml-auto flex gap-1">
                                            {item.actions.map((action, actionIndex) => (
                                                item.value === selectedItem.value ?
                                                    <div key={action.icon + actionIndex} onClick={(e) => handleItemClick(e, item)}
                                                         className="dropdown-btn text-zinc-300 w-[30px] h-[30px] font-semibold text-sm flex align-center justify-center items-center bg-none rounded-lg hover:bg-[#444]">
                                                        <ArrowWithoutStickIcon direction={directionEnum.RIGHT} width={20} className="fill-zinc-300" />
                                                    </div>
                                                    :
                                                    <div key={action.icon + actionIndex} onClick={action?.onClick && action.onClick}
                                                         className="text-zinc-300 w-[30px] h-[30px] font-semibold text-sm flex align-center justify-center items-center bg-none rounded-lg hover:bg-[#444]">
                                                        {action.icon === DropdownIconsEnum.FOLDER &&
                                                            <FolderIcon className="fill-none w-[20px] h-[20px] stroke-zinc-300" />}
                                                        {action.icon === DropdownIconsEnum.FILTER &&
                                                            <FilterIcon className="fill-none w-[20px] h-[20px] stroke-zinc-300" />}
                                                        {action.icon === DropdownIconsEnum.DELETE &&
                                                            <DeleteIcon className={"fill-zinc-300 w-[20px] h-[20px] stroke-zinc-300"} />}
                                                    </div>
                                            ))}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                        {children}
                    </div>
                </>
            )}
        </div>
    );
}

export default Dropdown;
