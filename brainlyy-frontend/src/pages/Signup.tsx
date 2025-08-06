import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export  function Signup(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    
    async function signUp(){
        const username = usernameRef.current?.value;
        const Password = passwordRef.current?.value;
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
                username: username,
                password: Password
            })
            alert("You have signed up!")
            navigate("/signin")
        } catch (error) {
            alert("Signup failed.");
        }
    }
    return <div className="h-screen w-screen bg-gray-400 flex justify-center items-center ">
        <div className="bg-white rounded-xl border-0 min-w-56 p-5">
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            <div className="flex justify-center mt-3">
                <Button vairent="primary" text="Signup" size="md" fullScreen={true} onClick={signUp}/>
            </div>
        </div>

    </div>
}