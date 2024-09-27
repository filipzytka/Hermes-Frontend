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
import NotSignedInRoute from "./components/RouteAccess/PublicRoute";
import AdminRoute from "./components/RouteAccess/AdminRoute";
import CollabDashboard from "./pages/Dashboard/Collaborators";
import PrivateRoute from "./components/RouteAccess/PrivateRoute";
import BanListDashboard from "./pages/Dashboard/BanList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LogsDashboard from "./pages/Dashboard/LogsDashboard";

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
    path: "admin/dashboard/home",
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
    path: "admin/dashboard/banlist",
    element: (
      <PrivateRoute>
        <BanListDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "admin/dashboard/logs",
    element: (
      <PrivateRoute>
        <LogsDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "login",
    element: (
      <NotSignedInRoute>
        <SignIn />
      </NotSignedInRoute>
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

const queryClient = new QueryClient();

root.render(
  <>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider defaultColorScheme="auto" theme={{ primaryColor: "cyan" }}>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ToasterWrapper>
              <RouterProvider router={router} />
            </ToasterWrapper>
          </AuthProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </MantineProvider>
  </>
);
