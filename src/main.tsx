import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/RouteAccess/PrivateRoute";
import Home from "./pages/Home";
import { AuthProvider } from "./providers/auth/AuthProvider";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ToasterWrapper from "./components/wrapper/ToasterWrapper";
import PublicRoute from "./components/RouteAccess/PublicRoute";
// import AdminRoute from "./components/RouteAccess/AdminRoute";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import FAQ from "./pages/FAQ";
import PageNotFound from "./pages/PageNotFound";
import Ban from "./pages/Ban";
import Dashboard from "./pages/Dashboard";

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
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: (
      <div className="flex justify-center items-center h-screen flex-col">
        <PageNotFound />
      </div>
    ),
  },
  {
    path: "login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "ban",
    element: (
      <PrivateRoute>
        <Ban />
      </PrivateRoute>
    ),
  },
  {
    path: "faq",
    element: (
      <PublicRoute>
        <FAQ />
      </PublicRoute>
    ),
  },
  {
    path: "register",
    element: <Register />,
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
