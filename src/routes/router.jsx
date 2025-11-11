import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { GuestLayout } from "../components/layouts/GuestLayout";
import { Supplier } from "../pages/Suppliers/Supplier";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Dashboard } from "../pages/dashbaord/Dashboard";
import { Factory } from "../pages/factory/Factory";
import { GreenLeaf } from "../pages/greenleaf/GreenLeaf";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "/suppliers",
        element: <Supplier />,
      },
      {
        path: "/factory",
        element: <Factory />,
      },
      {
        path: "/green-leaf",
        element: <GreenLeaf />,
      }
        ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
