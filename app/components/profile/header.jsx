import React from 'react'
import { Logo } from '../../assets/image';
import { useNavigate } from "react-router";
const Header = () => {
  let navigate = useNavigate();

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Cyber Logo" className="h-10" />
        <div className="text-left"></div>
      </div>
      <button className="bg-blue-800 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-900 transition"
      onClick={()=>{
        navigate("/login");
      }}
      >
        Sign in
      </button>
    </header>
  );
}

export default Header;