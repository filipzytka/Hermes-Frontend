import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./providers/auth/AuthProvider";
import ToasterWrapper from "./components/wrapper/ToasterWrapper";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import FAQ from "./pages/FAQ";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: (
      <div className="flex justify-center items-center h-screen flex-col">
        <PageNotFound />
      </div>
    ),
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
    errorElement: (
      <div className="flex justify-center items-center h-screen flex-col">
        <PageNotFound />
      </div>
    ),
  },
  {
    path: "login",
    element: <SignIn />,
  },
  {
    path: "faq",
    element: <FAQ />,
  },
  {
    path: "register",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider defaultColorScheme="auto" theme={{ primaryColor: "cyan" }}>
      <React.StrictMode>
        <AuthProvider>
          <ToasterWrapper>
            <RouterProvider router={router} />
          </ToasterWrapper>
        </AuthProvider>
      </React.StrictMode>
    </MantineProvider>
  </>
);
