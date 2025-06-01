import React from "react";
import { CalendarDays, Sun } from "lucide-react";

const WelcomeCard = () => {
  const username = localStorage.getItem("username") || "Welcome back!";
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-1">
          Hi {username}
        </h2>
        <p className="text-sm text-gray-500">
          Here's your CRM dashboard overview for today.
        </p>
      </div>
      <div className="flex items-center gap-4 text-gray-500">
        <div className="flex items-center">
          <CalendarDays className="mr-2" size={18} /> {today}
        </div>
        <div className="flex items-center">
          <Sun className="mr-1" size={18} /> 34°C Sunny
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
