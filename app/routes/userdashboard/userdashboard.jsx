import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { crown, dashboard, exit, Logo, menu, user, users } from "../../assets/image";

export default function UserDash() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { title: "Dashboard", path: "/userdash", icon: dashboard },
    { title: "Profile", path: "/profile", icon: users },
    { title: "Subscription", path: "/subscription", icon: crown },
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

      <aside
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
      </aside>

      <main
        className={`transition-all duration-300 ${isSidebarOpen ? (isMobile ? "ml-0" : "ml-60") : "ml-0"}`}
        style={{ paddingTop: "4rem" }}
      >
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
