import axios from "axios";
import { backendUrl } from "../../layouts/AdminLayout";
import { toast } from "react-toastify";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminLogin = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
        e.preventDefault();
        const response = await axios.post(backendUrl + '/api/user/admin', {email, password});

        if (response.data.success) {
            setToken(response.data.token);
        } else {
            toast.error(response.data.message);
        }

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">Admin Login</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email" required/>
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required/>

        <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">Login</button>

        <div className="w-full border border-gray-300" />
        <NavLink to='/login'>
          <p className="cursor-pointer">User Login</p>
        </NavLink>
      </form>

    </div>
  )
}

export default AdminLogin
