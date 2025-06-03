import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import * as UTILITY from '../../utils/utility'
import * as CONSTANTS from '../../utils/constants'
import Header from '../../components/header/header'
import Menu from '../../components/menu/menu'
import { useSelector, useDispatch } from 'react-redux';
import { user, userdash, users } from '../../assets/image';
export default function AdminPlan() {
  let navigate = useNavigate();
  const selectedMenu = useSelector(state => state.selectedMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: 'SET_MENU',payload:{menu:[{title:"Dashboard"},{title:"Profile"}],selectedMenu:"Profile"} });
    // Load previously viewed items from Local Storage
    if(UTILITY.isAdmin() || UTILITY.isUser()){
      const menus = UTILITY.isAdmin() == true ? CONSTANTS.ADMIN_MENU: CONSTANTS.USER_MENU;
      dispatch({ type: 'SET_MENU',payload:{menu:menus,selectedMenu:CONSTANTS.ADMIN_MENU_PROFILE} });
        const userSession = JSON.parse(localStorage.getItem("userSession")) || {};
            console.log("useEffect:userSession>>", userSession);
            UTILITY.fetchWithAutoRetry(`${CONSTANTS.BASE_URL}${CONSTANTS.GET_PROFILE}`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${userSession.token}`
                }
              }
            )
            .then(async res => {
              const data = await res.json();
              console.log(data);
            })
            .catch(err => {
              console.error('API call failed:', err);
            });
    }else{
      navigate("/");
    }

}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
       <Menu onMenuSelect={(selectedMenu)=>{
        //dispatch({ type: 'SELECT_MENU',payload:selectedMenu.title });
        navigate(`/${selectedMenu.route}`);
      }}/>
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>
     
      {/* Banner */}
      <div className="relative">
        <img
          src={userdash}
          alt="Banner"
          className="w-full h-48 object-cover rounded-xl"
        />

        {/* Avatar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
          <img
            src={user}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Name & Email */}
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold">John Smith</h2>
        <p className="text-gray-500">john@gmail.com</p>
      </div>

      {/* User Form */}
      <div className="mt-10 max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              value="John"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              value="Smith"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              value="john@gmail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Mobile Number</label>
            <input
              type="text"
              value="+91 89821 - 12524"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

