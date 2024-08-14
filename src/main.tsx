import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/RouteAccess/PrivateRoute";
import Home from "./pages/Home";
import { AuthProvider } from "./providers/auth/AuthProvider";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ToasterWrapper from "./wrapper/ToasterWrapper";
import PublicRoute from "./components/RouteAccess/PublicRoute";
import AdminRoute from "./components/RouteAccess/AdminRoute";
import Collaborators from "./pages/Collaborators";
import { MantineProvider } from "@mantine/core";
import Statistics from "./pages/Statistics";
import FAQ from "./pages/FAQ";
import PageNotFound from "./pages/PageNotFound";

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
    path: "faq",
    element: (
      <PrivateRoute>
        <FAQ />
      </PrivateRoute>
    ),
  },
  {
    path: "register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <MantineProvider theme={{ primaryColor: "cyan" }}>
    <React.StrictMode>
      <AuthProvider>
        <ToasterWrapper>
          <RouterProvider router={router} />
        </ToasterWrapper>
      </AuthProvider>
    </React.StrictMode>
  </MantineProvider>
);
