'use client'
import React from 'react';

interface DialogProps {
    setShowModal: (show: boolean) => void,
    children?: React.ReactNode,
    description?: string,
    title?: string,
    canAccept?: boolean,
    onCancel?: () => void,
    onAccept?: () => void,
    onChange?: (e: any) => void
}

const Dialog = ({setShowModal, children, description, title, onCancel, onAccept, onChange, canAccept} : DialogProps) => {

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
        <div className="fixed flex justify-center items-center content-center w-full h-full top-0 left-0 bg-black bg-opacity-40 z-50"
            onClick={(e) => handleHideModal(e)}>
            <div className="bg-eerie-black rounded-xl flex flex-col gap-3 min-w-[300px] max-w-[500px] m-3">
                <div className="w-full flex-col gap-1 pt-5 pr-5 pl-5">
                    <h1 className={"flex text-xl w-full align-middle justify-center"}>{title}</h1>
                    <p className={"flex w-full align-middle text-sm justify-center text-zinc-300"} dangerouslySetInnerHTML={{__html: '' + description +''}} />
                </div>
                {children && (
                    <div className="flex flex-col gap-1 border-b-2 border-t-2 border-[#353535] pt-5 pb-5 pr-5 pl-5">
                        {children}
                    </div>
                )}
                <div className="flex flex-row w-full gap-2 mt-3 justify-end pr-5 pb-5 pl-5">

                    <button onClick={(e) => handleCancelModal(e)}
                            className="bg-zinc-600 text-sm text-zinc-300 pt-2 pb-2 pr-3 pl-3 rounded-lg w-full hover:cursor-pointer">Annuleren
                    </button>

                    <button onClick={(e) => handleAcceptModal(e)}
                            className={`${canAccept ? "bg-blue-500" : "bg-zinc-500"} text-sm pt-2 pb-2 pr-3 pl-3 rounded-lg w-full hover:cursor-pointer`}>Bevestigen
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Dialog;