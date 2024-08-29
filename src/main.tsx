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
import AdminRoute from "./components/RouteAccess/AdminRoute";
import Collaborators from "./pages/Collaborators";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Statistics from "./pages/Statistics";
import FAQ from "./pages/FAQ";
import PageNotFound from "./pages/PageNotFound";
import Ban from "./pages/Ban";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
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
    path: "collaborators",
    element: (
      <AdminRoute>
        <Collaborators />
      </AdminRoute>
    ),
  },
  {
    path: "statistics",
    element: (
      <AdminRoute>
        <Statistics />
      </AdminRoute>
    ),
  },
  {
    path: "ban",
    element: (
      <AdminRoute>
        <Ban />
      </AdminRoute>
    ),
  },
  {
    path: "faq",
    element: (
      <PrivateRoute>
        <FAQ />
      </PrivateRoute>
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
