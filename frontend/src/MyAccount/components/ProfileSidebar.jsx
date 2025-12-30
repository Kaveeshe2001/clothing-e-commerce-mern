import { NavLink } from "react-router-dom"
import { assets } from "../../admin/assets/assets"

const ProfileSidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg' to="profile-details">
            <img className="w-5 h-5" src={assets.add_icon} alt="" />
            <p className="hidden md:block">Profile Details</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg' to="address">
            <img className="w-5 h-5" src={assets.order_icon} alt="" />
            <p className="hidden md:block">Addresses</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg' to="cpassword">
            <img className="w-5 h-5" src={assets.order_icon} alt="" />
            <p className="hidden md:block">Change Password</p>
        </NavLink>

      </div>
    </div>
  )
}

export default ProfileSidebar
