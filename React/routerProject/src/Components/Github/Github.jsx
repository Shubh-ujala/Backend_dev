import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
export default function Github(){
    const data = useLoaderData()
    // const [data,setdata] = useState([]);
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/Shubh-ujala')
    //     .then((res)=> res.json())
    //     .then((res) => setdata(res))
    // },[])
    return <>
        <div className="flex justify-evenly">
            <img src={data.avatar_url} alt="github profile pic" className="border-2 rounded-full h-50 w-50 m-4"/>
            <div>
                <div className="text-center m-4 bg-gray-600 p-4 text-xl">Github Followers: {data.followers}</div>
            </div>
        </div>
    </>
}

export const githubinfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/Shubh-ujala')
    return response.json();
}