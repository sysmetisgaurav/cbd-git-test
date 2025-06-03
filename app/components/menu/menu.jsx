import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import * as UTILITY from '../../utils/utility'
import { useSelector, useDispatch } from 'react-redux';
export default function AdminDashboard(props) {
  let navigate = useNavigate();
  const menu = useSelector(state => state.menu);
  const isSidebarOpen = useSelector(state => state.selectedMenu);
 // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  // console.log("menu>>>>>",JSON.stringify(menu));
  const dispatch = useDispatch();
  useEffect(() => {


}, []);

function getMenu(){
    return menu.map((m)=>{
        return <button onClick={()=>{
          // dispatch({ type: 'SELECT_MENU' });
          if(m.title == "Logout"){
            localStorage.clear();
            navigate("/login",{ replace: true });
          }else props.onMenuSelect(m);
        }}>{m.title}</button>
    })
}

  return <div>
  <aside
        className={`fixed top-0 left-0 z-20 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "w-60" : "w-60"}`}
        style={{ paddingTop: "4rem" }}
      >
        <nav className="px-4 py-4 space-y-1">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
             <button onClick={()=>{
            //  alert("tep")
              // dispatch({ type: 'SELECT_MENU' });
              
              if(item.title == "Logout"){
                localStorage.clear();
                navigate("/login",{ replace: true });
              }else props.onMenuSelect(item);
            }}
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive ? "bg-blue-600 text-white" : "text-dark hover:bg-blue-50 hover:text-primary"
                }`}
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={`${item.title} icon`}
                    className={`h-5 w-5 ${isActive ? "filter brightness-0 invert" : ""}`}
                  />
                )}
                <span>{item.title}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>}
              </button>
            );
          })}
        </nav>
      </aside>
  </div>;
}
