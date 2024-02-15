import { useState } from "react"
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { useNavigate } from "react-router-dom"
import axios from "axios";

export function Signin(){

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#e7ebee]">

            <div className="bg-green-700 h-2 mb-4 rounded-lg w-1/5"></div>
            <div className="border rounded-lg p-4 bg-white w-1/5">

                <div className="flex flex-col justify-center">
                    <div className="flex justify-center text-2xl pb-4 font-medium">{"Sign In"}</div>
                </div>

                <Input label={"Username"} placeholder="johndoe" onChange={(e) => setUserName(e.target.value)}/>
                <Input label={"Password"} placeholder="******" onChange={(e) => setPassword(e.target.value)}/>

                <div className="flex justify-center py-2">
                    <SubmitButton label={"Sign In"} onClick={() => {

                        axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        })
                        .then(res => {
                            localStorage.setItem("token", res.data.token);
                            localStorage.setItem("userId", res.data.userId);
                            navigate("/dashboard");
                        });
                        
                    }}/>
                </div>

                <div className="flex font-medium my-2 text-slate-700">
                    <div className="mr-2">{"Don't have an account?"}</div>
                    <div className="underline cursor-pointer hover:font-semibold" onClick={() => {
                        navigate("/signup");
                    }}>{"Signup"}</div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}




