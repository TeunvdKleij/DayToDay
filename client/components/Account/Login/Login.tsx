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
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

const Login = () => {
    const {validateEmail, validatePassword, replaceHTML} = useContext(MainContext);
    const {login, register} = useContext(UserContext);

    const [loginSelected, setLoginSelected] = useState<boolean>(true)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [emailValue, setEmailValue] = useState<string>("")
    const [passwordValue, setPasswordValue] = useState<string>("")
    const [repeatPasswordValue, setRepeatPasswordValue] = useState<string>("")

    const [emailClass, setEmailClass] =  useState<string>("border-none")
    const [passwordClass, setPasswordClass] = useState<string>("border-none")
    const [repeatPasswordClass, setRepeatPasswordClass] = useState<string>("border-none")

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
        } else if (event.target.id === "passwordInput") {
            setPasswordValue(event.target.value)
        } else if (event.target.id === "repeatPasswordInput") {
            setRepeatPasswordValue(event.target.value)
        }
    }
    const validate = () => {
        if(validateEmail(emailValue)) setEmailClass("border-green-500");
        else setEmailClass("border-red-500");
        if(validatePassword(passwordValue)) setPasswordClass("border-green-500");
        else setPasswordClass("border-red-500");
        if(validatePassword(repeatPasswordValue) && repeatPasswordValue == passwordValue) setRepeatPasswordClass("border-green-500");
        else setRepeatPasswordClass("border-red-500");
    }

    const loginOrRegister = () => {
        validate();
        if(passwordValue && repeatPasswordValue && passwordValue === repeatPasswordValue) {
            if(emailClass.includes("border-red-500") || passwordClass.includes("border-red-500") || repeatPasswordClass.includes("border-red-500")) {
                toast.error("Try to fill in your details again")
                return null
            }
            if(loginSelected) {
                login(emailValue, passwordValue)
            }
            else{
                register(emailValue, passwordValue, repeatPasswordValue);
            }
        }
    }

    const resetValues = () => {
        setPasswordValue("")
        setEmailValue("")
        setRepeatPasswordValue("")
        setPasswordClass("border-none")
        setEmailClass("border-none")
        setRepeatPasswordClass("border-none")
    }

    return (
        <div className={`h-full flex justify-center items-center`}>
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
                    <input type="email" onChange={handleInputUpdate} value={emailValue} id={"emailInput"} placeholder={"Enter your email"} className={`w-full rounded-lg h-10 text-black p-[5px] box-border border-[3px] ${emailClass}`}/>
                </div>
                <div className="relative w-full">
                    <p>Password</p>
                    <input type={isPasswordVisible ? 'text' : 'password'} onChange={handleInputUpdate} value={passwordValue} id="passwordInput" placeholder="Enter your password" className={`w-full rounded-lg h-10 text-black p-[5px] box-border border-[3px] ${passwordClass}`}/>
                    <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 top-[40%] focus:outline-none">
                        {isPasswordVisible ? <PasswordShow/> : <PasswordHide/>}
                    </button>
                </div>
                {!loginSelected &&
                <div className={`relative w-full`}>
                    <p>Repeat password</p>
                    <input type={isPasswordVisible ? 'text' : 'password'} onChange={handleInputUpdate} value={repeatPasswordValue} id={"repeatPasswordInput"} placeholder={"Repeat your password"} className={`w-[225px] rounded-lg h-10 text-black p-[5px] box-border border-[3px] ${repeatPasswordClass}`}/>
                    <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 top-[40%] focus:outline-none">
                        {isPasswordVisible ? <PasswordShow/> : <PasswordHide/>}
                    </button>
                </div>
                }
                <Button text={loginSelected ? "Login" : "Register"} onClick={loginOrRegister} backgroundColor={ColorEnum.BLUE} className={`w-full mt-3 text-xl`}/>
            </div>
        </div>
    );
}
export default Login;