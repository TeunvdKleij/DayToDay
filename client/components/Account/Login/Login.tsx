'use client'

import TaskIcon from "@/icons/TaskIcon";
import {useContext, useEffect, useState} from "react";
import Button from "@/components/Button/Button";
import {ColorEnum, MainContext} from "@/providers/MainProvider";
import {toast} from "react-toastify";
import {UserContext} from "@/providers/UserProvider";
import TrashCanIcon from "@/icons/Trashcanicon";
import PasswordHide from "@/icons/Password/PasswordHide";
import PasswordShow from "@/icons/Password/PasswordShow";
import { useRouter } from "next/navigation";
import cookies from 'browser-cookies'
import Cookies from "js-cookie"
import Dialog from "@/components/Dialog/Dialog";

const Login = () => {
    const {validateEmail, validatePassword, replaceHTML} = useContext(MainContext);
    const {login, register} = useContext(UserContext);

    const [loginSelected, setLoginSelected] = useState<boolean>(true)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [emailValue, setEmailValue] = useState<string>("")
    const [passwordValue, setPasswordValue] = useState<string>("")
    const [repeatPasswordValue, setRepeatPasswordValue] = useState<string>("")

    const [emailWrong, setEmailWrong] =  useState<boolean>(false)
    const [passwordWrong, setPasswordWrong] = useState<boolean>(false)
    const [repeaetedPasswordWrong, setRepeatPasswordWrong] = useState<boolean>(false)

    const router = useRouter();

    useEffect(() => {
        resetValues();
        setIsPasswordVisible(false);
    }, [loginSelected]);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        var accessToken = Cookies.get("accessToken")
        if(accessToken) router.push("/")
    }, []);

    const handleInputUpdate = (event: any) => {
        event.target.value = replaceHTML(event.target.value);
        if (event.target.id === "emailInput") {
            setEmailValue(event.target.value);
            setEmailWrong(false)
        } else if (event.target.id === "passwordInput") {
            setPasswordValue(event.target.value)
            setPasswordWrong(false)
        } else if (event.target.id === "repeatPasswordInput") {
            setRepeatPasswordValue(event.target.value)
            setRepeatPasswordWrong(false);
        }
    }

    const setAllWrong = (login: boolean) => {
        setEmailWrong(true);
        setPasswordWrong(true)
        if(!login) setRepeatPasswordWrong(true)
    }
    const validate = () => {
        setEmailWrong(!(validateEmail(emailValue)));
        setPasswordWrong(!(validatePassword(passwordValue)))
        setRepeatPasswordWrong(!(validatePassword(repeatPasswordValue)))
    }

    const loginOrRegister = () => {
        validate();
        if(emailWrong || passwordWrong || (!loginSelected && repeaetedPasswordWrong)) {
            toast.error("Try to fill in your details again")
            return null
        }
        if(loginSelected) {
            if(!login(emailValue, passwordValue)){
                setAllWrong(true);
            }
        }
        else if(passwordValue && repeatPasswordValue && (passwordValue === repeatPasswordValue)) {
            if(!register(emailValue, passwordValue, repeatPasswordValue)){
                setAllWrong(false);

            }
        }
        else{
            toast.error("Failed to register, try again")
            setAllWrong(false);
        }
    }

    const resetValues = () => {
        setPasswordValue("")
        setEmailValue("")
        setRepeatPasswordValue("")
        setPasswordWrong(false)
        setEmailWrong(false)
        setRepeatPasswordWrong(false)
    }

    return (
        <div className={`top-0 l-0 fixed bg-[#151515] w-full h-[100vh] z-[1000] flex justify-center items-center`}>
            <div className={`flex flex-col items-center gap-4 w-[225px]`}>
                <p><TaskIcon width={64}/></p>
                <div className="flex flex-col items-center">
                    <p className={"md:text-[50px] text-[35px] font-bold"}>Welcome</p>
                    <p>Please enter your details</p>
                </div>
                <div className="w-full flex justify-center">
                    <div className={`flex justify-between bg-eerie-black border-[#424242] border-2 rounded-xl pl-2 pr-2 pt-1 pb-1 gap-3`}>
                        <button className={`p-2 w-24 ${loginSelected ? "bg-white text-black rounded-lg" : ""}`}
                                onClick={() => setLoginSelected(true)}>Sign in
                        </button>
                        <button className={`p-2 w-24 ${!loginSelected ? "bg-white text-black rounded-lg" : ""}`}
                                onClick={() => setLoginSelected(false)}>Sign up
                        </button>
                    </div>
                </div>
                <div className={`w-full`}>
                    <p>Email</p>
                    <input type="email" onChange={handleInputUpdate} value={emailValue} id={"emailInput"} placeholder={"Enter your email"} className={`w-full rounded-lg h-10 text-black p-[5px] box-border ${emailWrong && "border-[3px] border-red-500" } `}/>
                </div>
                <div className="relative w-full">
                    <p>Password</p>
                    <input type={isPasswordVisible ? 'text' : 'password'} onChange={handleInputUpdate} value={passwordValue} id="passwordInput" placeholder="Enter your password" className={`w-full rounded-lg h-10 text-black p-[5px] box-border ${passwordWrong && "border-[3px] border-red-500" }`}/>
                    <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 top-[50%] focus:outline-none hover:cursor-pointer">
                        {isPasswordVisible ? <PasswordShow/> : <PasswordHide/>}
                    </span>
                </div>
                {!loginSelected &&
                <div className={`relative w-full`}>
                    <p>Repeat password</p>
                    <input type={isPasswordVisible ? 'text' : 'password'} onChange={handleInputUpdate} value={repeatPasswordValue} id={"repeatPasswordInput"} placeholder={"Repeat your password"} className={`w-[225px] rounded-lg h-10 text-black p-[5px] box-border ${repeaetedPasswordWrong && "border-[3px] border-red-500" }`}/>
                    <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 top-[50%] focus:outline-none hover:cursor-pointer">
                        {isPasswordVisible ? <PasswordShow/> : <PasswordHide/>}
                    </span>
                </div>
                }
                <button onClick={loginOrRegister} className="w-full mt-3 text-xl md:text-base rounded-lg pt-1 pl-2 pr-2 pb-1 flex items-center justify-center gap-2 hover:cursor-pointer hover:brightness-90 bg-blue-500">{loginSelected ? "Login" : "Register"}</button>
            </div>
        </div>
    );
}
export default Login;