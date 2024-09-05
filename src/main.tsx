import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./providers/auth/AuthProvider";
import ToasterWrapper from "./components/ToasterWrapper";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import FAQ from "./pages/FAQ";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PublicRoute from "./components/RouteAccess/PublicRoute";
import AdminRoute from "./components/RouteAccess/AdminRoute";
import CollabDashboard from "./pages/Dashboard/Collaborators";
import PrivateRoute from "./components/RouteAccess/PrivateRoute";
import BanListDashboard from "./pages/Dashboard/BanList";

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
    path: "/dashboard/home",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "admin/dashboard/collab",
    element: (
      <AdminRoute>
        <CollabDashboard />
      </AdminRoute>
    ),
  },
  {
    path: "dashboard/banlist",
    element: (
      <PrivateRoute>
        <BanListDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "login",
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
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
