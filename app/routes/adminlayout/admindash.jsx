import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as UTILITY from "../../utils/utility";
import * as CONSTANTS from "../../utils/constants";
import Header from "../../components/header/header";
import Menu from "../../components/menu/menu";
import { useSelector, useDispatch } from "react-redux";
import { dashClients, dashUsers } from "../../assets/image";
export default function AdminPlan() {
  let navigate = useNavigate();
  const selectedMenu = useSelector((state) => state.selectedMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    if (UTILITY.isAdmin()) {
      dispatch({
        type: "SET_MENU",
        payload: { menu: CONSTANTS.ADMIN_MENU, selectedMenu: CONSTANTS.ADMIN_MENU_DASHBOARD },
      });
      const userSession = JSON.parse(localStorage.getItem("userSession")) || {};
      console.log("useEffect:userSession>>", userSession);
      UTILITY.fetchWithAutoRetry(`${CONSTANTS.BASE_URL}${CONSTANTS.ADMIN_GET_DASHBOARD}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userSession.token}`,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
        })
        .catch((err) => {
          console.error("API call failed:", err);
        });
    } else if (UTILITY.isUser()) {
      navigate("/admindashboard");
    } else {
      navigate("/");
    }
  }, []);
const stats = [
  {
    label: "Total Clients",
    value: 10030,
    icon: dashUsers,
  },
  {
    label: "Active Clients",
    value: 8632,
    icon: dashClients
    ,
  },
];
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center"
          >
            <img src={stat.icon} alt={`${stat.label} icon`} className="h-12 w-12" />

            <p className="mt-4 text-gray-700 font-medium">{stat.label}</p>
            <h2 className="text-3xl font-bold text-blue-800 mt-2">{stat.value.toLocaleString()}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
