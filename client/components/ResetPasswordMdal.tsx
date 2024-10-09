import { Dispatch, SetStateAction, useContext, useState } from "react";
import Dialog from "./Dialog/Dialog";
import { MainContext } from "@/providers/MainProvider";

interface ResetPasswordModalProps{
    setShowModal: Dispatch<SetStateAction<boolean>>
    email: string
    setEmail: (value: any) => void
}

const ResetPasswordModal = ({setShowModal, email, setEmail} : ResetPasswordModalProps) => {

    const {validateEmail} = useContext(MainContext)
    const [borderColor, setBorderColor] = useState(false);

    const handleInputChange = (email: string) => {
        console.log(borderColor);
        if(!validateEmail(email)) setBorderColor(true)
        else setBorderColor(false);
        setEmail(email)
    }

    return (
        <Dialog setShowModal={setShowModal} title={"Reset password"} maxWidth={1600} minWidth={500} description={"Enter email below"}
                onAccept={() => alert("hi")} onlyNotice={false}>
            <p>Email</p>
            <input type="text" id="resetPasswordEmail" placeholder={"Enter your email"} value={email} onChange={(e) => handleInputChange(e.target.value)}
                className={`rounded-lg h-[40px] p-3 bg-[#757575] text-white outline-none ${borderColor && "border-2 border-red-500"}`}>
            </input>
        </Dialog>
    );
}
export default ResetPasswordModal