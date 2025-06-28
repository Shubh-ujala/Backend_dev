import { BrowserRouter,Routes,Route,Link,useNavigate, Outlet } from "react-router-dom";

import { useEffect } from "react";
function App(){



    return <div>
        {/* //with the help of link we will able to make our webpage Single page application but notice one thing we have to wrap this inside the BrowserRouter */}
        <BrowserRouter>
            
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/neet/online-coaching-class-11" element ={<Class11program/>}/>
                    <Route path="/neet/online-coaching-class-12" element ={<Class12program/>}/>
                    <Route path="/" element={<Landing/>}></Route>
                    <Route path="*" element={<Error/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
}
function Layout(){
    return <>
        <Link to="/">Allen</Link>|
        <Link to="/neet/online-coaching-class-11">Class 11</Link>|
        <Link to="/neet/online-coaching-class-12">Class 12</Link>
        <div style={{height:"90vh"}}>
            <Outlet/>
        </div>
        Footer | <Link to="https://x.com/shubhXc0de">X</Link>
    </>
}
function Error(){
    return <div>
        Sorry! Page not found
    </div>
}
function Landing(){
    return <div style={{backgroundColor:"red",height:"90vh"}}>
        Welcome to Allen!
    </div>
}
function Class11program(){
    return <div style={{backgroundColor:"green",height:"90vh",color:"white"}}>
        this is the program for class 11th
    </div>
}
function Class12program(){
    const navigate = useNavigate();
    useEffect(()=>{
        const task = setInterval(()=>{
            navigate("/")
        },5000)
        //unmounting the setInterval so that it is properly used
        return ()=>{
            clearInterval(task)
        }
    },[])
    return <div style={{backgroundColor:"yellow",height:"90vh"}}>
        this is the program for class 12th
    </div>
}
export default App;