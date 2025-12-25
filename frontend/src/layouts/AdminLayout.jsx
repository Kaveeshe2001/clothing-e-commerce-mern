import { Outlet } from "react-router-dom";
import Navbar from "../admin/components/Navbar";
import Sidebar from "../admin/components/Sidebar";
import { useEffect, useState } from "react";
import AdminLogin from "../admin/pages/AdminLogin";
import { ToastContainer } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function AdminLayout() {
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <ToastContainer />
            { token === ""
            ? <AdminLogin setToken={setToken} />
            :
                <>
                    <Navbar setToken={setToken} />
                    <hr />
                    <div className="flex w-full">
                        <Sidebar />
                        <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
                            <Outlet token={token} />
                        </div>
                    </div>
                </>
            }
            
        </div>
    )
}