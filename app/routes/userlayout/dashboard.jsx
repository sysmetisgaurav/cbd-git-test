import { useEffect } from "react";
import { useNavigate } from "react-router";
import * as UTILITY from "../../utils/utility";
import * as CONSTANTS from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import UserDash from "../userdashboard/userdashboard";

export default function AdminPlan() {
  const navigate = useNavigate();
  const selectedMenu = useSelector((state) => state.selectedMenu);
  const dispatch = useDispatch();

  useEffect(() => {
    if (UTILITY.isUser()) {
      dispatch({
        type: "SET_MENU",
        payload: {
          menu: CONSTANTS.USER_MENU,
          selectedMenu: CONSTANTS.USER_MENU_DASHBOARD,
        },
      });

      const userSession = JSON.parse(localStorage.getItem("userSession")) || {};
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
    } else if (UTILITY.isAdmin()) {
      navigate("/admindashboard");
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  const services = [
    { name: "Cloud SaaS Backup **", status: "Completed" },
    { name: "Secure Internet Browsing", status: "Completed" },
    { name: "Cloud Security Activity Monitoring", status: "In Progress" },
    { name: "Email Protection", status: "Not Started" },
    { name: "Cybersecurity Awareness and Phishing Attack Training", status: "In Progress" },
    { name: "Endpoint Device Patching and Updates", status: "Completed" },
    { name: "Microsoft Defender Management", status: "In Progress" },
    { name: "Dark Web Activity Monitoring", status: "Completed" },
    { name: "Internal Network Vulnerability Scan", status: "Not Started" },
    { name: "External Network Vulnerability Scan", status: "In Progress" },
    { name: "Cloud Vulnerability Scan", status: "Completed" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#d1ffa8] text-green-700";
      case "In Progress":
        return "bg-[#E3F3FF] text-blue-600";
      case "Not Started":
        return "bg-[#DDE1E4] text-gray-700";
      default:
        return "";
    }
  };

  return (
  
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <span className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full">Starter – Bronze</span>
      </div>


      <div className="mb-4">
        <select className="border border-gray-300 rounded px-3 py-2">
          <option>18 Mar 2025 – 17 Apr 2025</option>
        </select>
      </div>

    
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-900 text-white px-6 py-3 font-semibold flex justify-between">
          <span>Services ⬍</span>
          <span>Status ⬍</span>
        </div>

        {services.map((service, index) => (
          <div
            key={index}
            className={`flex justify-between items-center px-6 py-4 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
          >
            <span className="text-xs sm:text-[18px] text-gray-800">{service.name}</span>
            <span className={`text-sm font-medium px-3 py-1 rounded ${getStatusStyle(service.status)}`}>
              {service.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
