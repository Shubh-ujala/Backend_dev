import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket,setsocket] = useState();
  function sendMsg(){
    if(!socket){
      return;
    }
    //@ts-ignore
    socket.send("ping")
  }
  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
    setsocket(ws)

    ws.onmessage = (e) => {
        alert(e.data);
    }
  },[])
  return (
    <>
      <div>
        <input type="text" placeholder='Enter message' />
        <button onClick={sendMsg}>Send</button>
      </div>
    </>
  )
}

export default App
