import EditIcon from "@/icons/EditIcon";
import SettingsIcon from "@/icons/SettingsIcon";
import ShareIcon from "@/icons/ShareIcon";
import TaskIcon from "@/icons/TaskIcon";
import { useRouter } from "next/navigation";

const Header = () =>{
    const router = useRouter();
    return (
        <div className="fixed bottom-10 left-0 w-full flex justify-center">
            <div className="flex justify-between w-[125px] border-[#424242] border-2 bg-eerie-black p-5 box-border rounded-full">
                <div onClick={() => router.push("/")} className={"hover:cursor-pointer"} title="Tasks"><TaskIcon/></div>
                <div onClick={() => router.push("/settings")} className={"hover:cursor-pointer"} title="Settings"><SettingsIcon/></div>
            </div>
        </div>
    );
}
export default Header;