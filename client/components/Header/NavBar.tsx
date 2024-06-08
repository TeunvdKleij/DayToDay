import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const NavBar = () =>{
    const router = useRouter();
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState<string>('')

    useEffect(() => {
        if(pathname.includes("settings")) setCurrentPage("settings")
        else setCurrentPage("tasks")
    }, []);
    return (
        <div className="w-full flex justify-center">
            <div className=" flex bg-eerie-black border-[#424242] border-2  rounded-full pl-3 pr-3 pt-2 pb-2 gap-2">
                <div className={`${currentPage == "tasks" && "bg-white text-black"} hover:cursor-pointer rounded-full pl-6 pr-6 pt-2 pb-2`} onClick={() => router.push("/")}  title="Tasks">Tasks</div>
                <div className={`${currentPage == "settings" && "bg-white text-black"} hover:cursor-pointer rounded-full pl-6 pr-6 pt-2 pb-2`} onClick={() => router.push("/settings")} title="Settings">Settings</div>
            </div>
        </div>
    );
}
export default NavBar;