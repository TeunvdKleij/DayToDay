'use client'
import { useContext, useEffect, useState } from "react";
import '../globals.css'
import Login from "@/components/Account/Login/Login";
import { UserContext } from "@/providers/UserProvider";
import Wrapper from "@/components/Wrapper/wrapper";
import Link from "next/link";
import ArrowLeftIcon from "@/icons/Arrows/ArrowLeftIcon";
import ColorPicker from "@/components/ColorPicker/ColorPicker";
import cookies, { set } from 'browser-cookies'
import { getTokenEmail } from "@/hooks/useToken";
import Dialog from "@/components/Dialog/Dialog";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import Toggle from "@/components/Toggle";

const Account = () => {
    const {updateSettings, changeSettings, settings} = useContext(UserContext);
    const [color, setColor] = useState<any>("#fff");
    const [newColor, setNewColor] = useState<any>(null);
    const [pickColor, setPickColor] = useState(false);
    const [leftComplete, setLeftComplete] = useState(settings.completeTaskLeft || false);
    const [leftAdd, setLeftAdd] = useState(settings.addTaskLeft || false);
    const [passwords, setPasswords] = useState({currentPassword: "", newPassword: "", repeatNewPassword: ""})

    useEffect(() => {
        if (settings.completeTaskLeft != null) {
          setLeftComplete(settings.completeTaskLeft);
        }
    }, [settings.completeTaskLeft]);

    useEffect(() => {
        if (settings.addTaskLeft != null) {
          setLeftAdd(settings.addTaskLeft);
        }
    }, [settings.addTaskLeft]);

    useEffect(() => {
        changeSettings({ completeTaskLeft: leftComplete });
    }, [leftComplete])

    useEffect(() => {
        changeSettings({ addTaskLeft: leftAdd });
    }, [leftAdd])

    const handleLogout = () => {
        cookies.erase("accessToken");
        localStorage.removeItem("groupSelection")
        localStorage.removeItem("gdpr")
        window.location.reload();
    }

    const handleSaveColor = (currentColor: string) => {
        setNewColor(currentColor);
        changeSettings({color: currentColor})
        updateSettings({Color: currentColor})
    };


    const handleInputChange = (newSettings: any) => {
        setPasswords((prevPasswords) => ({
          ...prevPasswords,
          ...newSettings
        }));
    };

    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        cookies.get("accessToken") ? (
            <Wrapper>
                <div className="flex flex-row gap-[10px] justify-start items-center w-full align-middle pt-[10px] pb-[10px]">
                    <Link href="/" className="flex flex-row gap-[5px] justify-start items-center align-middle"><ArrowLeftIcon /> Back</Link>
                </div>
                <div className="w-full flex flex-col gap-[10px] justify-start items-start">
                    <h1 className="md:text-2xl text-xl text-white font-bold w-full">Account</h1>
                    <div className="flex flex-col gap-[10px] justify-start items-start bg-[#252525] box-border pr-[20px] pl-[20px] pt-[10px] pb-[10px] w-full rounded-xl">
                        {getTokenEmail() && <h1 className="md:text-xl text-base text-white font-bold w-full">{getTokenEmail()}</h1>}
                        <p className="text-zinc-300">This is your e-mail of your account.</p>
                        <div className="flex w-full justify-between align-middle">
                            <p className="flex align-middle content-center items-center">Reset password</p>
                            <button className="pl-2 pr-2 pt-1 pb-1 rounded-lg" style={{backgroundColor: settings.color}} onClick={() => setShowModal(true)}>Reset password</button>
                        </div>
                        {showModal && <ChangePasswordModal setShowModal={setShowModal} passwords={passwords} handleInputChange={handleInputChange}/>}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[10px] justify-start items-start">
                    <h1 className="md:text-2xl text-xl text-white font-bold w-full">Settings</h1>
                    {settings && (
                        <div className="flex flex-col gap-[10px] justify-start items-start bg-[#252525] box-border pr-[20px] pl-[20px] pt-[10px] pb-[10px] w-full rounded-xl">
                            <div className="flex w-full gap-[10px] flex-row justify-between items-center align-middle">
                                <p>Theme color</p>
                                <div className="w-auto gap-[10px] flex flex-row align-middle justify-between items-center hover:cursor-pointer" onClick={() => setPickColor(true)}>
                                    <p>{settings?.color}</p>
                                    <div style={{ backgroundColor: settings?.color }} className={`${settings.color ? settings.color : "bg-black"} w-[30px] h-[30px] rounded-[8px] border-2 border-white outline-[2px] outline-black`}>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full gap-[10px] flex-row justify-between items-center align-middle">
                                <p>Complete task direction (Only for mobile)</p>
                                <Toggle text={leftComplete ? "Left" : "Right"} checked={leftComplete} onChange={() => setLeftComplete(!leftComplete)}/>
                            </div>
                            <div className="flex w-full gap-[10px] flex-row justify-between items-center align-middle">
                                <p>Add task button (Only for mobile)</p>
                                <Toggle text={leftAdd ? "Left" : "Right"} checked={leftAdd} onChange={() => setLeftAdd(!leftAdd)}/>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full mt-[25px] flex flex-col gap-[10px] justify-start items-start">
                    <div className="flex flex-col gap-[10px] justify-center items-center align-middle bg-[#252525] box-border pr-[20px] pl-[20px] pt-[10px] pb-[10px] w-full rounded-xl">
                        <p className="cursor-pointer" style={{ color: "#f15146" }} onClick={handleLogout}>Logout</p>
                    </div>
                </div>

                <ColorPicker
                    message={"Theme color"}
                    visible={pickColor}
                    setVisible={setPickColor}
                    color={color}
                    setColor={setColor}
                    handleSaveColor={handleSaveColor}
                />
            </Wrapper>
        ) : (
            <Login />
        )
    );
}
export default Account;
