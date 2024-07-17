import { useEffect, useState } from "react"
import React from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import useAuth from "../components/useAuth"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const [balance, setBalance] = useState(0)
    const token = useAuth();
    const navigate = useNavigate()
    const [username, setUsername] = useState("") 


const getBalance = async() => {
        try {
            const response =await axios.post("https://paytm-backend-taupe.vercel.app/api/v1/account/balance", 
                {
                    userId: localStorage.getItem("userId")
                },{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
            })
            const roundedBalance = Number(response.data.balance).toFixed(2);
            setBalance(roundedBalance)
            const firstLetter = response.data.username[0].toUpperCase();
            setUsername(firstLetter)
            console.log(response.data.username)
        }
        catch(err) {
            console.log(err)
            if (err.response && err.response.status===403) {
                navigate("/signin")
            }
        }}
    
        useEffect(()=> {
                getBalance();
            }, [token, setBalance])
        
        

    return (
    <div className="p-10">
        <AppBar username={username} />
        <Balance value={balance} />
        <Users />
    </div>
    )
}