import { useState,useEffect } from "react";

function App(){
    const[show,setShow] = useState(false);
    console.log("inside App!");
    useEffect(()=>{
        setInterval(()=>{
            setShow(c => !c);
        },5000)
        console.log("inside");
    },[])
    return <div>
        hi there!
        {show ? <Counter></Counter> : null}
    </div>
}
function Counter(){
    const[count,setCount] = useState(0);
    console.log("inside Counter!");
    useEffect(function(){
        let clock = setInterval(()=>{
            setCount(count=>count+1);
        },1000)
        return function(){
            clearInterval(clock);
        }
    },[])
    return <div>
        <h2>{count}</h2>
    </div>
}


export default App;