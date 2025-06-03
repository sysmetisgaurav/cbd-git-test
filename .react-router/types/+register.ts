import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/login": {};
  "/profile": {};
  "/admindashboard": {};
  "/plans": {};
  "/adminusers": {};
  "/userdash": {};
  "/admindash": {};
  "/dashboard": {};
  "/Subscription": {};
};