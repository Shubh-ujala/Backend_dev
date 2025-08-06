import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export function Signin(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signin(){
        const username = usernameRef.current?.value;
        const Password = passwordRef.current?.value
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
                username: username,
                password: Password
            })
            const jwt = response.data.token;
            localStorage.setItem("token",jwt);
            navigate("/dashboard")
            //redirect user to the database
        } catch (error) {
            alert("Signin failed.");
        }
    }
    return <div className="h-screen w-screen bg-gray-400 flex justify-center items-center ">
        <div className="bg-white rounded-xl border-0 min-w-56 p-5">
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            <div className="flex justify-center mt-3">
                <Button vairent="primary" text="Signin" size="md" fullScreen={true} onClick={signin}/>
            </div>
        </div>

    </div>
}