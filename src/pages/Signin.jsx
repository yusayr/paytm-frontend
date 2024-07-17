import React, { useState } from "react"
import { Header } from "../components/Header.jsx"
import { SubHeader } from "../components/SubHeader.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { Password } from "../components/Password.jsx"
import { Button } from "../components/Button.jsx"
import { BottomWarning } from "../components/BottomWarning.jsx"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Signin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignin = async() => {
    try {
      const response = await axios.post("https://paytm-backend-taupe.vercel.app/api/v1/user/signin",{
        username,
        password
      })
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId)
        // localStorage.setItem("username", response.data.username)
        navigate("/dashboard")
      }
    }
    catch(err) {
      console.log("Sign in Failed", err)
    }
  }

  return (
    
    <div className="bg-slate-300 flex justify-center h-screen items-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 flex-col">
        <Header label={"Sign in"} />
        <SubHeader label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onChange={(e => setUsername(e.target.value))} />
        <Password onChange={(e=> setPassword(e.target.value))}  placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={handleSignin} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>

  )
}