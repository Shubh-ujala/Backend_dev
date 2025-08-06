import { ShareIcon } from "../../icons/ShareIcon";

export interface CardProps{
    title: string,
    link : string,
    type : "twitter" | "youtube"
}


export function Card({title,link,type} : CardProps){
    return <div >
        <div className="bg-white rounded-md p-4  max-w-80 border-gray-200 border-2 min-h-48">
           <div className="flex justify-between font-medium text-lg">
                <div className="flex gap-2 items-center">
                    <div className=" text-gray-500">
                        <ShareIcon size="md"/>
                    </div>
                    {title}
                </div>
                <div className="flex gap-2 items-center text-gray-500">
                    <a href={link} target="_blank">
                        <ShareIcon size="md"/>
                    </a>
                    <ShareIcon size="md"/>
                </div>
                
           </div>
           <div className="pt-3" >
                {type === "youtube" && <iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                
                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com","twitter.com")}></a>
                </blockquote>}
                
               
           </div>
        </div>
    </div>
}