import React, { useEffect } from "react"
import { useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Users = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState([])
    const loggedInUserId = localStorage.getItem("userId")

    const filteredList = async() => {
        const token = localStorage.getItem("token")
        const response = await axios.get("https://paytm-backend-taupe.vercel.app/api/v1/user/bulk?filter=" + filter, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const users = response.data.user;
        const filteredUsers = users.filter(user=> user._id != loggedInUserId)
        setUsers(filteredUsers)
    }

    useEffect(()=> {
        filteredList()
    }, [filter])




    return (
        <div>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input onChange={e=> setFilter(e.target.value)}   type="text" placeholder="Search Users..." className=" border-2 border-black:active w-full px-2" />
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>

        </div>
    )
}

function User({ user }) {
    const navigate = useNavigate()

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-1">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0].toUpperCase()}
                </div>

            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button onClick={()=> navigate("/send?id=" + user._id + "&name=" + user.firstName)} label = {"Send money"} />
        </div>
        {/* user._id means the id of the receiver that we et from the get request not the sender */}

    </div>
}