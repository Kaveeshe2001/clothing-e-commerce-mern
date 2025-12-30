import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import ProfileSidebar from "../MyAccount/components/ProfileSidebar";

export default function ProfileLayout() {
    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <ToastContainer />
            <Navbar />
            <hr />
            <div className="flex w-full">
                <ProfileSidebar />
                <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}