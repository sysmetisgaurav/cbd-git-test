import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./app.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MenuContext from "./menucontext";
import { LoaderProvider } from "./loadercontext";
import { Provider } from "react-redux";
import store from "./store";
export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

function Test() {
  return <h1>This is my component</h1>;
}
export function Layout({ children }) {
  const setMenu = () => {};

  return (
    // <html lang="en">
    //   <head>
    //     <meta charSet="utf-8" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1" />
    //     <Meta />
    //     <Links />
    //   </head>
    //   <body>
    //     THIS IS NEW TEST
    //     <Test></Test>
    //     {children}
    //     <ScrollRestoration />
    //     <Scripts />
    //   </body>
    // </html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GoogleOAuthProvider clientId="939704780073-bt67j6hiftjq7db9dsv6pr7kv1i4tls3.apps.googleusercontent.com">
          {/* <MenuContext.Provider value={{ setMenu }}> */}
          <LoaderProvider>
            <Provider store={store}>{children}</Provider>
          </LoaderProvider>
          {/* </MenuContext.Provider> */}
        </GoogleOAuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
