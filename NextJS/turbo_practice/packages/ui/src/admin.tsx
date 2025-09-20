import { ReactNode } from "react";

interface props{
    children : ReactNode
}
export  function AdminPageComponent({children}:props){
    return <div>
        {children}
    </div>
}