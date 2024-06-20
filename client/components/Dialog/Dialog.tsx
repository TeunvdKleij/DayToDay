'use client'
import React from 'react';
import Button from '../Button/Button';
import { ColorEnum } from '@/providers/MainProvider';

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
}

const Dialog = ({setShowModal, children, description, title, onCancel, onAccept, canAccept, maxWidth} : DialogProps) => {

    const handleHideModal = (e : any) => {
        if(e.target.classList.contains("fixed")) setShowModal(false);
    }

    const handleAcceptModal = (e: any) => {
        if(onAccept) onAccept();
        setShowModal(false);
    }

    const handleCancelModal = (e: any) => {
        if(onCancel) onCancel();
        setShowModal(false);
    }

    return (
        <div
            className="fixed flex justify-center items-center content-center w-full h-full top-0 left-0 bg-black bg-opacity-40 z-[1000]"
            onClick={(e) => handleHideModal(e)}>
            <div className={`bg-eerie-black rounded-xl flex flex-col gap-3 min-w-[calc(100vw - 20px)] max-w-[400px] max-w-[${maxWidth}px] m-3`}>
                <div className="w-full flex-col gap-1 pt-5 pr-5 pl-5">
                    <h1 className={"flex text-xl w-full align-middle justify-center"}>{title}</h1>
                    {description && <p className={"flex w-full align-middle text-sm justify-center text-zinc-300"} dangerouslySetInnerHTML={{__html: '' + description +''}} />}
                </div>
                {children && (
                    <div className="flex flex-col gap-1 border-b-2 border-t-2 border-[#353535] pt-5 pb-5 pr-5 pl-5">
                        {children}
                    </div>
                )}
                <div className="flex flex-row w-full gap-2 mt-3 justify-end pr-5 pb-5 pl-5">
                    <Button text={"Annuleren"} backgroundColor={ColorEnum.LIGHTGREY} onClick={(e) => handleCancelModal(e)}/>
                    <Button text={"Bevestigen"}  backgroundColor={ColorEnum.BLUE}  onClick={(e: any) => handleAcceptModal(e)} disabled={!canAccept}/>
                </div>
            </div>
        </div>
    )
}

export default Dialog;