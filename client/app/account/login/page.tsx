'use client'
import Dialog from "@/components/Dialog/Dialog";
import { GroupContext } from "@/providers/GroupProvider";
import { useContext, useState } from "react";

const Login = () => {
    const [showModal, setShowModal] = useState<boolean>();
    const [charCount, setCharCount] = useState<string>();
    const [input, setInput] = useState<string>();

    const addNewGroup = () => {
    }
    const handleInputChange = (event: any) => {

    }
    return (
        <Dialog setShowModal={setShowModal} title={"Login"} onAccept={addNewGroup} canAccept={input !== ""} maxWidth={800}>
            <div className="flex flex-col mb-5">
                <div className="flex justify-between">
                    <p>Email</p>
                </div>
                <input type="text" id="addGroupInput" placeholder={"Enter new group name"} value={input} onChange={(e) => handleInputChange(e)}
                    className="rounded-lg h-[40px] p-3 bg-[#757575] text-white">
                </input>
            </div> 
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <p>Password</p>
                </div>
                <input type="text" id="addGroupInput" placeholder={"Enter new group name"} value={input} onChange={(e) => handleInputChange(e)}
                    className="rounded-lg h-[40px] p-3 bg-[#757575] text-white">
                </input>
            </div> 
        </Dialog>
    );
}
export default Login;