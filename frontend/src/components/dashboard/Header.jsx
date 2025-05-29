import React from "react";
import { Search, Plus, Bell, ChevronDown } from "lucide-react";
import useStore from "@/store/useStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { user } = useStore();
  console.log(user)
  return (
    <header className="bg-white shadow-sm h-20 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search project or client"
            className="bg-slate-100 text-sm rounded-md py-2.5 pl-10 pr-4 w-80 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <NavLink to="/segments/new" className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium">
          <Plus size={20} className="mr-2" />
          Create Campaign
        </NavLink>
        <Bell
          size={24}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        />
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar>
            <AvatarImage src={user?.avatar?.split("=")[0]} alt="avatar" />
          </Avatar>
          <span className="text-sm text-slate-700 font-medium">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
