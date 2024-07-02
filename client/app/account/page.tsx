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

const Account = () => {
    const {updateSettings, changeSettings, settings} = useContext(UserContext);
    const [color, setColor] = useState<any>("#fff");
    const [newColor, setNewColor] = useState<any>(null);
    const [pickColor, setPickColor] = useState(false);
    const [leftComplete, setLeftComplete] = useState(settings.completeTaskLeft || false);
    const [passwords, setPasswords] = useState({currentPassword: "", newPassword: "", repeatNewPassword: ""})

    useEffect(() => {
        if (settings.completeTaskLeft != null) {
          setLeftComplete(settings.completeTaskLeft);
        }
      }, [settings.completeTaskLeft]);

    useEffect(() => {
        changeSettings({ completeTaskLeft: leftComplete });
    }, [leftComplete])

    const handleLogout = () => {
        cookies.erase("accessToken");
        localStorage.removeItem("groupSelection")
        localStorage.removeItem("gdpr")
        window.location.reload();
    }

    const handleSaveColor = (currentColor: string) => {
        setNewColor(currentColor);
        changeSettings({color: currentColor})
    };
    

    useEffect(() => {
        if(settings && newColor) {
            updateSettings();
        }
        setNewColor(null)
    }, [settings]);


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
                                <label className="inline-flex items-center cursor-pointer">
                                    <input id="toggleInput" type="checkbox" checked={leftComplete} onChange={() => setLeftComplete(!leftComplete)} value="" className="sr-only peer"/>
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>        
                                    <span className="ms-2 text-xs font-medium text-gray-300 md:ms-3 md:text-sm">{leftComplete ? "Left" : "Right"}</span>
                                </label>
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
