import { Dispatch, SetStateAction } from "react";
import Dialog from "./Dialog/Dialog";

interface ChangePasswordModalProps{
    setShowModal: Dispatch<SetStateAction<boolean>>
    passwords: {currentPassword: string, newPassword: string, repeatNewPassword: string}
    handleInputChange: (value: any) => void
}

const ChangePasswordModal = ({setShowModal, passwords, handleInputChange} : ChangePasswordModalProps) => {
    return (
        <Dialog setShowModal={setShowModal} title={"New group"} maxWidth={800} description={"Enter details to update your password"}
                onAccept={() => alert("hi")}>
            <p>Current password</p>
            <input type="text" id="currentPasswordInput" placeholder={"Enter your current password"} value={passwords.currentPassword} onChange={(e) => handleInputChange({currentPassword: e.target.value})}
                className="rounded-lg h-[40px] p-3 bg-[#757575] text-white">
            </input>
            <p>New password</p>
            <input type="password" id="newPasswordInput" placeholder={"Enter your new password"} value={passwords.newPassword} onChange={(e) => handleInputChange({newPassword: e.target.value})}
                className="rounded-lg h-[40px] p-3 bg-[#757575] text-white">
            </input>
            <p>Repeat new password</p>
            <input type="password" id="repeatNewPasswordInput" placeholder={"Repeat your new password"} value={passwords.repeatNewPassword} onChange={(e) => handleInputChange({repeatNewPassword: e.target.value})}
                className="rounded-lg h-[40px] p-3 bg-[#757575] text-white">
            </input>
        </Dialog>
    );
}
export default ChangePasswordModal