import { useContext, useEffect, useState } from "react"
import Title from "../../components/Title"
import { ShopContext } from "../../context/ShopContext"
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  }

  const updatePassword = async () => {
    try {
      if (!token) {
        return null;
      } 

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("Confirm password does not match new password");
        return;
      }

      const response = await axios.post(
        backendUrl + '/api/profile/change-password', 
        {
          currentPassword: passwordData.currentPassword, 
          newPassword: passwordData.newPassword
        }, 
        {headers: {token}}
      );

      if (response.data.success) {
        toast.success("Password updated");
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div>
      <div className="text-2xl pt-5">
        <Title text1={'CHANGE'} text2={'PASSWORD'} />
      </div>
      <p className="text-m text-gray-500">For security reasons, please choose a strong password that you have not used before</p>
      <div className="mt-5 flex flex-col gap-3 w-full lg:w-1/2">
        <div>
            <label htmlFor="" className="font-medium text-lg">Current Password</label>
            <input onChange={onChangeHandler} value={passwordData.currentPassword} required name="currentPassword" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="password" placeholder="Enter Current Password" />
        </div>
        <div>
            <label htmlFor="" className="font-medium text-lg">New Password</label>
            <input onChange={onChangeHandler} value={passwordData.newPassword} required name="newPassword" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="password" placeholder="Enter New Password" />
        </div>
        <div>
            <label htmlFor="" className="font-medium text-lg">Confirm New Password</label>
            <input onChange={onChangeHandler} value={passwordData.confirmPassword} required name="confirmPassword" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="password" placeholder="Confirm New Password" />
        </div>

        <button onClick={updatePassword} className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">Update Password</button>
      </div>
    </div>
  )
}

export default ChangePassword
