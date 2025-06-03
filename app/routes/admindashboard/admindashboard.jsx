import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { client, crown, dashboard, exit, Logo, menu, palns, user, users } from "../../assets/image";
import Menu from '../../components/menu/menu'
export default function AdminDash() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  let navigate = useNavigate();
  const menuItems = [
    { title: "Dashboard", path: "/admindash", icon: dashboard },
    { title: "Clients", path: "/adminusers", icon: client },
    { title: "Plans", path: "/plans", icon: palns },
    { title: "Profile", path: "/profile", icon: users },
    { title: "Log Out", path: "/logOut", icon: exit },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setIsSidebarOpen(false)} />
      )}

      <header className="bg-white shadow-sm fixed w-full z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="block sm:hidden">
              <img src={menu} alt="Menu" />
            </button>

            <div>
              <img src={Logo} alt="Logo" className="h-11" />
            </div>
          </div>
          <div className="flex">
            <div className="grid">
              <p>John Smith</p>
              <p>john@gmail.com</p>
            </div>

            <img src={user} alt="Logo" className="h-11" />
          </div>
        </div>
      </header>

      {/* <aside
        className={`fixed top-0 left-0 z-20 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "w-60" : "w-60"}`}
        style={{ paddingTop: "4rem" }}
      >
        <nav className="px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
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
              </Link>
            );
          })}
        </nav>
      </aside> */}
   <Menu onMenuSelect={(selectedMenu)=>{
        //dispatch({ type: 'SELECT_MENU',payload:selectedMenu.title });
        navigate(`/${selectedMenu.route}`);
      }}/>
      <main
        className={`transition-all duration-300 ${isSidebarOpen ? (isMobile ? "ml-0" : "ml-60") : "ml-0"}`}
        style={{ paddingTop: "4rem" }}
      >
        <h1>Dashboard</h1>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
