import { useNavigate } from "react-router-dom";

export function AppBar({username}) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/signin")
    }

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex items-center"> {/* Ensure items are vertically centered */}
            <button onClick={handleLogout} className="text-white font-medium bg-black p-2 rounded-md active:bg-slate-700">Logout</button>
            <div className="flex flex-col justify-center h-full ml-4"> {/* Adjust margin for spacing */}
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center mt-1 ml-2"> {/* Adjust margin and ensure items are centered */}
                <div className="text-xl">
                    {username}
                </div>
            </div>
        </div>

    </div>
}