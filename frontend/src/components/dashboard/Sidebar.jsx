import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  ShoppingCart,
  PieChart,
  Megaphone,
  LogOut,
  LogOutIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import api from "@/utils/API";
import { toast } from "sonner";

export const SidebarContent = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Segments", path: "/segments", icon: <PieChart size={20} /> },
    { name: "Campaigns", path: "/campaigns", icon: <Megaphone size={20} /> },
  ];
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      const response = await api.post("/auth/logout");
      if (response.status === 200) {
        toast.success("Logout successful");
        navigate("/");
      }
      else{
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-20 border-b border-slate-700">
        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
        <h1 className="text-2xl font-bold text-white">Xeno CRM</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-700 hover:text-white transition-colors ${
                isActive ? "bg-purple-600 text-white" : "text-slate-300"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700 absolute bottom-0 left-0 right-0">
        <Button
          onClick={handleLogoutClick}
          className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white hover:bg-red-700"
        >
          <LogOutIcon /> Logout
        </Button>
      </div>
    </>
  );
};
