import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/home.jsx"),
  route("login", "./routes/login/login.jsx"),
  route("profile", "./routes/profile/profile.jsx"),

  route("admindashboard", "./routes/admindashboard/admindashboard.jsx"),
  route("plans", "./routes/adminplans/adminplans.jsx"),
  route("adminusers", "./routes/adminuserlist/adminuserlist.jsx"),
  route("userdash", "./routes/userlayout/dashboard.jsx"),
  route("admindash", "./routes/adminlayout/admindash.jsx"),
  route("dashboard", "./routes/userdashboard/userdashboard.jsx"),
  route("Subscription", "./routes/usersubscription/usersubscription.jsx"),

  // route("login", "routes/home.jsx")
];
