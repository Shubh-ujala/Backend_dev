import { useState ,useEffect} from 'react'
import './App.css'
//we want that whenever we click on the button the interval gets started
function App(){
    return <div>
        <Counter></Counter>
    </div>
}
function Counter(){
    const[count,setCount] = useState(0);

    //hooking into the lifecycle events of react(mounting)
    //whatever we have written inside the useEffect will run only once even through the Counter calls again and again but it will run once
    useEffect(function(){
        setInterval(()=>{
            setCount(count=>count+1);
        },1000)
    },[])
    return ( 
        <div>
            <h1>{count}</h1>
        </div>
    )
}


export default App
