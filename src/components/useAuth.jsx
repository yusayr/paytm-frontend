import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const useAuth = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()


    useEffect(()=> {
        if (!token) {
            navigate("/signin")
        }
    },[token, navigate])

    return token
}

export default useAuth;