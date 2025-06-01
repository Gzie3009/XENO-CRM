import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Megaphone,
  LogOutIcon,
  Plus,
  Bell,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage } from "../ui/avatar";
import api from "@/utils/API";
import { toast } from "sonner";
import useStore from "@/store/useStore";

export const SidebarContent = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Campaigns",
      path: "/campaigns",
      icon: <Megaphone size={18} />,
    },
  ];

  const handleLogoutClick = async () => {
    try {
      const response = await api.post("/auth/logout");
      if (response.status === 200) {
        toast.success("Logout successful");
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("An error occurred while logging out");
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between">
      {/* Top Section */}
      <div>
        {/* Logo / App Name */}
        <div className="flex items-center justify-center h-20 border-b border-white/10 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full" />
            <h1 className="text-xl font-semibold tracking-wide">Xeno CRM</h1>
          </div>
        </div>

        {/* Create Segment CTA */}
        <div className="px-4 py-4">
          <Button
            onClick={() => navigate("/segments/new")}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            Create Segment
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-2 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md transition-all text-sm font-medium ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <Separator className="bg-white/10 mx-4" />
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={user?.avatar?.split("=")[0]}
                alt="User Avatar"
              />
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-white/60">Logged in</p>
            </div>
          </div>
          <Bell
            size={20}
            className="text-white/70 hover:text-white cursor-pointer"
          />
        </div>

        <div className="p-4">
          <Button
            onClick={handleLogoutClick}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOutIcon size={16} />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
