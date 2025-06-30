// import { useState } from "react";
import arrow from "./assets/arrowicon.png"
export function About({items}){
    // const [initialState, setinitilState] = useState({})
    if (!Array.isArray(items)) return null; //by using this our app will not getting crashed!
    return <>
        <div style={{width:150,backgroundColor:"white",borderRadius:10,padding:20,fontSize:10}}>
            {items.map((item,index)=>{  
                return (   
                <div key = {index}style={{display:"flex", justifyContent:"space-between",color:"black",marginTop:10}}>
                    <div>{item}</div>
                    <div> <img src={arrow} alt="icon" style={{height:10,width:10}}/> </div>
                </div>
                )
            })}
        </div>
    
    </>
}
