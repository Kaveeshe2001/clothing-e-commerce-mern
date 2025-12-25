import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { ToastContainer } from "react-toastify";

export default function MainLayout() {
    return (
        <>
            <ToastContainer />
            <Navbar />
            <SearchBar />
            <Outlet />
            <Footer />
        </>
    );
}