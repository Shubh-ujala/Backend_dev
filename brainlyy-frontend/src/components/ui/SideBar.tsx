import { BrainIcon } from "../../icons/BrainIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";


export function SideBar(){
    return <div className="h-screen bg-white border-r-[#e6e9ed] w-60 fixed left-0 top-0">
        <div className="text-4xl  flex font-semibold pt-4 items-center pl-3">
            <BrainIcon/>
            Brainlyy
        </div>
        <div className="pt-4 mt-10">
            <SidebarItem icon={<TwitterIcon/>} text={"Twitter"}/>
            <SidebarItem icon={<YoutubeIcon/>} text={"Youtube"}/>
        </div>
    </div>
}