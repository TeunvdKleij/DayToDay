'use client'
import { useContext, useEffect, useState } from "react";
import '../globals.css'
import Login from "@/components/Account/Login/Login";
import { UserContext } from "@/providers/UserProvider";
import Wrapper from "@/components/Wrapper/wrapper";
import Link from "next/link";
import ArrowLeftIcon from "@/icons/Arrows/ArrowLeftIcon";
import { setCookie } from "@/hooks/useCookie";
import ColorPicker from "@/components/ColorPicker/ColorPicker";

const Account = () => {
    const { user, settings, setSettings, updateSettings } = useContext(UserContext);
    const [color, setColor] = useState<any>("#fff");
    const [newColor, setNewColor] = useState<any>(null);
    const [pickColor, setPickColor] = useState(false);

    const handleLogout = () => {
        setCookie("accessToken", null, 0);
        window.location.reload();
    }

    const handleSaveColor = (currentColor: string) => {
        setNewColor(currentColor);
        let newSettings = settings;
        newSettings.color = currentColor;
        setSettings(newSettings);
        setNewColor(null);
    }

    useEffect(() => {
        if(settings && newColor) {
            updateSettings();
        }
    }, [settings]);

    return (
        user ? (
            <Wrapper>
                <div className="flex flex-row gap-[10px] justify-start items-center w-full align-middle pt-[10px] pb-[10px]">
                    <Link href="/" className="flex flex-row gap-[5px] justify-start items-center align-middle"><ArrowLeftIcon /> Back</Link>
                </div>
                <div className="w-full flex flex-col gap-[10px] justify-start items-start">
                    <h1 className="md:text-2xl text-xl text-white font-bold w-full">Account</h1>
                    <div className="flex flex-col gap-[10px] justify-start items-start bg-[#252525] box-border pr-[20px] pl-[20px] pt-[10px] pb-[10px] w-full rounded-xl">
                        <h1 className="md:text-xl text-base text-white font-bold w-full">{user && user.email ? user.email : "email@email.com"}</h1>
                        <p className="text-[#c5c5c5]">This is your e-mail of your account.</p>
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
                                <p>Add task button</p>
                                <select>
                                    <option>Left</option>
                                    <option>Right</option>
                                </select>
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
