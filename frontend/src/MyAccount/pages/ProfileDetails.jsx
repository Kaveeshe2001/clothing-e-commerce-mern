import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title"
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileDetails = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const listProfile = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.get(backendUrl + '/api/profile/list', {headers: {token}});

      if (response.data.success) {
        const user = response.data.user;
        setUserData(user);
        setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || ""
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const updateDetails = async () => {
    try {

      const response = await axios.put(backendUrl + '/api/profile/update', formData, {headers: {token}});

      if (response.data.success) {
        toast.success("Profile Updated Successfully");
        setUserData(response.data.user);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    listProfile();
  }, [token]);

  return (
    <div>
      <div className="text-2xl pt-5">
        <Title text1={'PROFILE'} text2={'DETAILS'} />
      </div>

      <div className="border border-gray-300 bg-gray-100 pl-5 py-3 mt-6 rounded-sm">
        {userData ? (
            <div className="mb-4 pb-2">
                <p className="font-medium">Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone || "No phone number saved"}</p>
            </div>
        ) : (
            <p className="text-gray-500">Loading...</p>
        )}
      </div>

      <div className="mt-10">
        <p className="font-medium text-lg">Update Details</p>
        <div className="flex gap-3 mt-5 max-w-100">
          <input value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
          <input value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
          <input value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
        </div>

        <button type="button" onClick={updateDetails} className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">Update Details</button>
      </div>
    </div>
  )
}

export default ProfileDetails
