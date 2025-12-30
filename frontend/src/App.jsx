import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Add from './admin/pages/Add';
import List from './admin/pages/List';
import ProductOrders from './admin/pages/ProductOrders';
import AdminLogin from './admin/pages/AdminLogin';
import Verify from './pages/Verify';
import ProfileLayout from './layouts/ProfileLayout';
import ProfileDetails from './MyAccount/pages/ProfileDetails';
import Addresses from './MyAccount/pages/Addresses';
import ChangePassword from './MyAccount/pages/ChangePassword';

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />
        </Route>


        {/* Admin routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Add />} />
          <Route path='add' element={<Add />} />
          <Route path='list' element={<List />} />
          <Route path='product-orders' element={<ProductOrders />} />
        </Route>

        {/* My Profile routes */}
        <Route path='/profile' element={<ProfileLayout />}>
          <Route index element={<ProfileDetails />} />
          <Route path='profile-details' element={<ProfileDetails />} />
          <Route path='address' element={<Addresses />} />
          <Route path='cpassword' element={<ChangePassword />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;
