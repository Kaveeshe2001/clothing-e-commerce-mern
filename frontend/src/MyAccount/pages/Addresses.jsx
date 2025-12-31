import { toast } from "react-toastify";
import Title from "../../components/Title"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

const Addresses = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [addresses, setAddresses] = useState([]);

  const listAddresses = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await axios.get(backendUrl + '/api/profile/update', {headers: {token}});
      console.log(response.data);

      if (response.data.success) {
        setAddresses(response.data.addresses || []);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    listAddresses();
  }, [token]);

  return (
    <div>
      <div className="text-2xl pt-5">
        <Title text1={'SHIPPING'} text2={'ADDRESSES'} />
      </div>

      <div className="border border-gray-300 bg-gray-100 pl-5 py-3 mt-6 rounded-sm">
        {addresses && addresses.length > 0 ? (
            addresses.map((address, index) => (
            <div key={index} className="mb-4 border-b pb-2 last:border-b-0">
                <p className="font-medium">{address.firstName || address.fullName}</p>
                <p>{address.street}, {address.city}</p>
                <p>{address.phone}</p>
            </div>
            ))
        ) : (
            <p className="text-gray-500">No addresses saved.</p>
        )}
      </div>
      
    </div>
  )
}

export default Addresses
