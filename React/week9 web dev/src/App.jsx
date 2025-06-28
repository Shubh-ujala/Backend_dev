import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return( 
  <div>
    <b>
      hi there
    </b>
    <Counter></Counter>
  </div>
  )
}
function Counter(){
  // let count = 0;
  // function increaseCount(){
  //   count = count+1;
  // } -> it will not work because we cann't define the raw variables in the react

  const[count,setCount] = useState(0);
  function increaseCount(){
    setCount(count+1);
  }
  function decreaseCount(){
    setCount(count-1);
  }
  function resetCount(){
    setCount(0);
  }
  return <div>
    <h1>{count}</h1>
    <button onClick={increaseCount}>Increase count</button>
    <button onClick={decreaseCount}>Decrease Count</button>
    <button onClick={resetCount}>Reset Count</button>
  </div>
}

export default App
