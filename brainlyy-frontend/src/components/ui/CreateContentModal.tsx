import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

//controlled component
export  function CreateContentModal({open,onClose}:any){
    const titleRef = useRef<HTMLInputElement>();
    const LinkRef = useRef<HTMLInputElement>();
    const [type,settype] = useState(ContentType.Youtube)
    async function addContent(){
        const title = titleRef.current?.value;
        const link = LinkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,type,title
        },{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();
    }
    return <div >
        {open && <div className="w-screen h-screen fixed top-0 left-0 backdrop-blur-[2px] flex justify-center">
            <div className="flex flex-col justify-center ">
                <span className="bg-white p-4 rounded-md shadow-lg">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>
                        
                    </div>
                    <div>
                        <Input ref={titleRef} placeholder={"Title"} />
                        <Input ref={LinkRef} placeholder={"Link"} />
                    </div>
                    <div>
                        <h1 className="font-semibold w-full pl-3">Type</h1>
                        <div className="flex gap-2 mt-3 mb-3 ml-2">
                            <Button text="youtube" size="md" vairent={type === ContentType.Youtube ? "primary" : "secondary"} onClick={()=>{
                            settype(ContentType.Youtube)
                            }}/> 
                            <Button text="twitter" size="md" vairent={type === ContentType.Twitter ? "primary" : "secondary"} onClick={()=>{
                            settype(ContentType.Twitter)
                        }}/> 
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button vairent="primary" text="Submit" size="md" onClick={addContent}/>
                    </div>
                </span>    
            </div>            
        </div>}
    </div>
}

