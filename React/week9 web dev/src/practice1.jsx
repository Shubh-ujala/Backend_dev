
import { useEffect,useState } from "react";

function App(){
    const[currentTab,setCurrentTab] = useState(0);
    const[details,setdetails] = useState(null);
    const[loader,setloader] = useState(false)
    useEffect(()=>{
        if(currentTab!= 0){
            setloader(true)
            fetch(`https://jsonplaceholder.typicode.com/todos/${currentTab}`)
            .then(async res=>{
                const json = await res.json();
                setdetails(json.title);
                setloader(false)
            }
        )  
    }      
},[currentTab])

    const stylediv = {height:20,padding:3,borderRadius:10,cursor:"pointer"}

    const getTabStyle = (currTabNum)=>{
        return {
            ...stylediv,
            color: currentTab == currTabNum ? "green":"black",
            textDecoration:currentTab == currTabNum? "underline":"none"
        }
    }

    return <div style={{backgroundColor: "#b2bec3" , height:"100vh"}}>
        <div style={{display:"flex",gap:10,padding:20}}>
            <div onClick={()=>{
                setCurrentTab(1)
            }} style={getTabStyle(1)} >todo1</div>
            <div onClick={()=>{
                setCurrentTab(2)
            }} style={getTabStyle(2)}>todo2</div>
            <div onClick={()=>{
                setCurrentTab(3)
            }} style={getTabStyle(3)}>todo3</div>
            <div onClick={()=>{
                setCurrentTab(4)
            }} style={getTabStyle(4)}>todo4</div>
        </div>
        <br />
        <div style={{paddingLeft:20}}>
            {loader ? <span style={{color:"green"}}>Loading...</span> : details}
        </div>
    </div>
}


export default App
