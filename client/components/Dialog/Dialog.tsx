'use client'
import React, {useContext, useEffect} from 'react';
import Button from '../Button/Button';
import { ColorEnum } from '@/providers/MainProvider';
import {UserContext} from "@/providers/UserProvider";
import PlusIcon from '@/icons/PlusIcon';
import CrossIcon from '@/icons/CrossIcon';

interface DialogProps {
    setShowModal: (show: boolean) => void,
    children?: React.ReactNode,
    description?: string,
    title?: string,
    canAccept?: boolean,
    onCancel?: () => void,
    onAccept?: () => void,
    onChange?: (e: any) => void
    maxWidth: number
    minWidth?: number
    onlyNotice: boolean
    onlyAccept?: boolean
    acceptMessage?: string
}

const Dialog = ({setShowModal, children, description, title, onCancel, onAccept, canAccept, maxWidth, onlyNotice, minWidth, onlyAccept, acceptMessage} : DialogProps) => {
    const {settings} = useContext(UserContext);
    const handleHideModal = (e : any) => {
        if(e.target.classList.contains("fixed")) setShowModal(false);
    }

    const handleAcceptModal = (e: any) => {
        if(onAccept) onAccept();
        setShowModal(false);
    }

    const handleCancelModal = (e: any) => {
        if(onCancel) onCancel();
        console.log("CANCELED")
        setShowModal(false);
    }

    return (
        <div
            className="fixed flex justify-center items-center content-center w-full h-full top-0 left-0 bg-black bg-opacity-40 z-[1000]"
            onClick={(e) => handleHideModal(e)}>
            <div style={{maxWidth: maxWidth+"px", minWidth: minWidth && minWidth+"px"}}
            className={`bg-eerie-black rounded-xl flex flex-col gap-3 min-w-[calc(100vw - 20px)] max-w-[400px] ${onlyNotice && "max-h-[400px] overflow-y-auto"} m-3`}>
                <div className="w-full flex-col gap-1 pt-3 pr-5 pl-5 relative">
                    {onlyNotice && <div className='absolute top-3 right-2 hover:cursor-pointer' onClick={(e) => handleCancelModal(e)}><CrossIcon/></div>}
                    <h1 className={"flex text-xl w-full align-middle justify-center font-bold"}>{title}</h1>
                    {description && <p className='flex align-middle justify-center'>{description}</p>}
                </div>
                {children && (
                    <div className={`flex flex-col gap-1 ${!onlyNotice && "border-b-2"} border-t-2 border-[#353535] pt-5 pb-5 pr-5 pl-5`}>
                        {children}
                    </div>
                )}
                <div className={`flex flex-row w-full gap-2 ${!onlyNotice && "mt-3"} justify-end pr-5 pb-5 pl-5`}>
                    {(!onlyAccept || onlyAccept == null || onlyAccept == undefined) && <Button text={"Cancel"} backgroundColor={ColorEnum.LIGHTGREY} onClick={(e) => handleCancelModal(e)}/>}
                    <Button text={acceptMessage ? acceptMessage : "Confirm"}  backgroundColor={settings?.color ? settings?.color : "#3b82f6"}  onClick={(e: any) => handleAcceptModal(e)} disabled={!canAccept}/>
                </div>
            </div>
        </div>
    )
}

export default Dialog;