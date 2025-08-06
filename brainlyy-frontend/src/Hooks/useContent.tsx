// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../config";

// export  function useContent(){
//     const [contents,setcontents] = useState([]);
//     useEffect(()=>{
//         axios.get(`${BACKEND_URL}/api/v1/content`,{
//             headers:{
//                 "Authorization":`${localStorage.getItem("token")}`
//             }
//         })
//             .then((response)=>{
//                 setcontents(response.data.content)
//             })
//     },[])
//     return contents;
// }   
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent(shareLink?: string) {
    const [contents, setcontents] = useState([]);

    useEffect(() => {
        if (shareLink) {
            axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
                .then((response) => {
                    console.log(response.data);
                    
                    setcontents(response.data.content);
                });
        } else {
            axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    "Authorization": `${localStorage.getItem("token")}`
                }
            })
                .then((response) => {
                    setcontents(response.data.content);
                });
        }
    }, [shareLink]);

    return contents;
}