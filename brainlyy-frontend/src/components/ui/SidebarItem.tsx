import type { ReactElement } from "react"


export function SidebarItem({text,icon}:{
    text:string,
    icon:ReactElement
}){
    return <div className="flex gap-4 pl-4 text-gray-700 mt-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 ml-3">
        {icon} {text}
    </div>
}