import type { ReactElement } from "react";

export interface ButtonProps{
    vairent : "primary" |  "secondary"
    size : "sm" | "md" | "lg"
    text : string;
    startIcon? : ReactElement;
    endIcon?: ReactElement;
    onClick? : ()=> void;
    fullScreen ? : boolean;
}
const buttonSizeType = {
    "sm" : "px-4 py-1 text-sm",
    "md" : "px-6 py-2 text-md",
    "lg" : "px-8 py-4 text-lg"
}
const buttonVarient = {
    "primary":"bg-[#7164c0] text-white",
    "secondary":"bg-[#d9ddee] text-[#7164c0]"
}

const defaultStyles = "rounded-md font-normal flex items-center gap-2 cursor-pointer"

export const Button = (props : ButtonProps) => {
    return <button onClick={props.onClick} className={`${buttonSizeType[props.size]} ${buttonVarient[props.vairent]} ${defaultStyles} ${props.fullScreen? "w-full flex justify-center":""} `} >
       
            {props.startIcon}
            {props.text}
       
    </button>
}

// all these things we have defined in the interface 
// <Button variant = "primary" size= "md"  onClick = {} text={} startIcon={}/>