import Header from "./header";
import MainBanner from "./mainBanner";
import Service from "./service";
import About from "./about";
import Plans from "./Plans";
import Footer from "./footer";
import { useNavigate } from "react-router";
import { useEffect, useState } from 'react';
import * as UTILITY from '../../utils/utility'
export default function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    // dispatch({ type: 'SET_MENU',payload:{menu:[{title:"Dashboard"},{title:"Profile"}],selectedMenu:"Profile"} });
    // Load previously viewed items from Local Storage
    if(UTILITY.isUser()){
      navigate("/dashboard");
    }else if(UTILITY.isAdmin()){
      navigate("/admindashboard");
    }
}, []);
  
  return  <>
  <Header/>
  <MainBanner/>
  <Service/>
  <About/>
  <Plans/>
  <Footer/>
</>
}
