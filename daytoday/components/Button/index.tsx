'use client';
import React, { Children, MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import FolderIcon from "@/icons/Dropdown/folderIcon";
import FilterIcon from "@/icons/Dropdown/filterIcon";
import DeleteIcon from "@/icons/Dropdown/deleteIcon";
import ArrowWithoutStickIcon, { directionEnum } from '@/icons/Arrows/ArrowWithoutStickIcon';

// Mogelijkheid tot icoon
// text

export enum ColorEnum {
    BLUE = "bg-blue-500",
    RED = "bg-red-500",
    LIGHTGREY = "bg-light-grey",
    GREY = "bg-grey",
    GREEN = "bg-green-500",
    NONE = ""
}


interface ButtonProps {
    text: string
    children?: ReactNode,
    disabled?: boolean
    backgroundColor?: string,
    className?: string,
    onClick: (() => void) | ((e: any) => void);

}

const Button = ({text, children, disabled, backgroundColor, className, onClick}: ButtonProps) => {  
        return (
            <button disabled={disabled} onClick={onClick} className={` ${className} md:text-base text-sm w-fit rounded-lg pt-1 pl-2 pr-2 pb-1 flex items-center gap-2 hover:cursor-pointer  ${disabled ? "bg-grey hover:cursor-not-allowed" : backgroundColor } `}>
                {children}
                {text}
            </button>
        );
    }
export default Button;