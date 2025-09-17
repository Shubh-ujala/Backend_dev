import React from "react"

export default function banner({children} :{
    children: React.ReactNode
}){
    return <div>
        <div className="border-b text-center text-lg ">
            20% off for the next 3 days!
        </div>
        {children}
    </div>
}