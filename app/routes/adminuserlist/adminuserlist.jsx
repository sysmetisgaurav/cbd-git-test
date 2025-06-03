import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import * as UTILITY from '../../utils/utility'
import * as CONSTANTS from '../../utils/constants'
import Header from '../../components/header/header'
import Menu from '../../components/menu/menu'
import { useSelector, useDispatch } from 'react-redux';
export default function AdminUserList() {
  let navigate = useNavigate();
  const selectedMenu = useSelector(state => state.selectedMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: 'SET_MENU',payload:{menu:[{title:"Dashboard"},{title:"Profile"}],selectedMenu:"Profile"} });
    // Load previously viewed items from Local Storage
    if(UTILITY.isAdmin()){
      dispatch({ type: 'SET_MENU',payload:{menu:CONSTANTS.ADMIN_MENU,selectedMenu:CONSTANTS.ADMIN_MENU_USERS} });
            const userSession = JSON.parse(localStorage.getItem("userSession")) || {};
            console.log("useEffect:userSession>>", userSession);
            UTILITY.fetchWithAutoRetry(`${CONSTANTS.BASE_URL}${CONSTANTS.ADMIN_GET_USER}?PageNumber=1&PageSize=10&SortColumn=Email&SortDirection=Asc`,
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
    }else if(UTILITY.isUser()){
      // navigate("/dashboard");
      navigate("/admindashboard");
    }else{
      navigate("/");
    }

}, []);

  return <div>
 
      <Menu onMenuSelect={(selectedMenu)=>{
        //dispatch({ type: 'SELECT_MENU',payload:selectedMenu.title });
        navigate(`/${selectedMenu.route}`);
      }}/>
      <h1>Selected Menu : {selectedMenu}</h1>
  </div>;
}
