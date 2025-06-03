export const BASE_URL = "https://cbd-dev-api-axada2b4hpbwhsh9.centralindia-01.azurewebsites.net/";
export const REQUEST_LOGIN_OTP = "api/Auth/request-otp";
export const VERIFY_LOGIN_OTP = "api/Auth/verify-otp";
export const GOOGLE_LOGIN_OTP = "api/Auth/google-login";
export const MICROSOFT_LOGIN_OTP = "api/Auth/microsoft-login";
export const GET_PROFILE = "api/user/profile";
export const ADMIN_GET_PLAN = "api/admin/plans";
export const ADMIN_GET_USER = "api/admin/users";
export const ADMIN_GET_DASHBOARD = "api/admin/statistics";
import { client, crown, dashboard, exit, Logo, menu, palns, user, users } from "../assets/image";
export const ADMIN_MENU = [
     { title: "Dashboard",route:"admindashboard", icon: dashboard },
     { title: "Profile", route:"profile", icon: client}, 
     { title: "Plans",route:"plans", icon: palns }, 
     { title: "Users",route:"adminusers", icon: users  },
     { title: "Logout", icon: exit }
    ];
export const ADMIN_MENU_PROFILE = "Profile";
export const ADMIN_MENU_DASHBOARD = "Dashboard";
export const ADMIN_MENU_PLAN = "Plans";
export const ADMIN_MENU_USERS = "Users";


export const USER_MENU = [
    { title: "Dashboard",route:"dashboard" },
    { title: "Profile", route:"profile"}, 
    { title: "Subscription",route:"subscription" },
    { title: "Logout" }
   ];
export const USER_MENU_PROFILE = "Profile";
export const USER_MENU_DASHBOARD = "Dashboard";
export const User_MENU_SUBSCRIPTION = "Subscription";