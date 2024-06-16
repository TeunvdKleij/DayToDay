'use client';
import React, { ReactNode } from 'react';

// Mogelijkheid tot icoon
// text



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
            <button disabled={disabled} onClick={onClick} className={` ${className} md:text-base text-sm w-fit rounded-lg pt-1 pl-2 pr-2 pb-1 flex items-center justify-center gap-2 hover:cursor-pointer ${disabled ? "bg-grey hover:cursor-not-allowed" : backgroundColor } `}>
                {children}
                {text}
            </button>
        );
    }
export default Button;