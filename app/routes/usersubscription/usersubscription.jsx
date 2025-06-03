import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import * as UTILITY from '../../utils/utility'
import * as CONSTANTS from '../../utils/constants'
import Header from '../../components/header/header'
import Menu from '../../components/menu/menu'
import { useSelector, useDispatch } from 'react-redux';
export default function AdminPlan() {
  let navigate = useNavigate();
  const selectedMenu = useSelector(state => state.selectedMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: 'SET_MENU',payload:{menu:[{title:"Dashboard"},{title:"Profile"}],selectedMenu:"Profile"} });
    // Load previously viewed items from Local Storage
    if(UTILITY.isUser()){
      dispatch({ type: 'SET_MENU',payload:{menu:CONSTANTS.USER_MENU,selectedMenu:CONSTANTS.User_MENU_SUBSCRIPTION} });
      const userSession = JSON.parse(localStorage.getItem("userSession")) || {};
      console.log("useEffect:userSession>>", userSession);
      UTILITY.fetchWithAutoRetry(`${CONSTANTS.BASE_URL}${CONSTANTS.ADMIN_GET_PLAN}`,
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
    }else if(UTILITY.isAdmin()){
      navigate("/admindashboard");
    }else{
      navigate("/");
    }

}, []);
return (
  <div className="min-h-screen bg-gray-100 p-4">
    <h1 className="text-2xl font-semibold mb-6">Subscription</h1>

    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col 2xl:flex-row items-start 2xl:items-center justify-start 2xl:justify-between ">
      {/* Subscription Details */}
      <div>
        <h2 className="font-semibold text-lg text-gray-800">You're on the Starter / Bronze Package</h2>
        <p className="text-gray-600 mt-1 text-sm">
          Good news! Your subscription is active. Your next billing date is <strong>18-Jun-2025</strong>.
        </p>
      </div>

      {/* Button */}
      <button className="mt-4 sm:mt-0 bg-blue-800 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-full transition-all duration-200">
        Manage Subscription
      </button>
    </div>
  </div>
);}