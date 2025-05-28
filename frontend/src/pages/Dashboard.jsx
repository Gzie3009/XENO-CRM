import React, { useState } from "react";

// Icon Components (simple SVGs)
const IconPlaceholder = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect width="24" height="24" opacity="0.2" />
  </svg>
);

const HomeIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const BriefcaseIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
  </svg>
);

const BarChartIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const UserCogIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
    <path d="M16 3.13a4 4 0 010 7.75"></path>
    <path d="M2 12h.01"></path>
  </svg>
);

const FileTextIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const LifeBuoyIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="4"></circle>
    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
    <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
    <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
  </svg>
);

const SettingsIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2-2h-.09a1.65 1.65 0 00-1.51 1z"></path>
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const BellIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 01-3.46 0"></path>
  </svg>
);

const ChevronDownIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const CloudRainIcon = ({ className = "w-16 h-16" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 16.2A4.5 4.5 0 0015.5 12H13a8 8 0 00-16 0h1.35M8 16.95l-2.8 2.8M16 16.95l-2.8 2.8M12 14.95l-2.8 2.8M10 20.85l-1.4-1.4M14 20.85l-1.4-1.4" />
    <path d="M16 4a4.5 4.5 0 00-8.47 1.9A5.5 5.5 0 005.5 12H13a8 8 0 005-2.47A4.5 4.5 0 0016 4z" />
  </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const MoreHorizontalIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

const Edit2Icon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const Trash2Icon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const CircleIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: <HomeIcon />, active: true },
    { name: "Projects", icon: <BriefcaseIcon /> },
    { name: "Report", icon: <BarChartIcon /> },
    { name: "Admin", icon: <UserCogIcon /> },
  ];

  const extraItems = [
    { name: "Invoices", icon: <FileTextIcon /> },
    { name: "Support", icon: <LifeBuoyIcon /> },
    { name: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <div className="w-64 bg-slate-800 text-gray-300 flex flex-col h-screen fixed">
      <div className="flex items-center justify-center h-20 border-b border-slate-700">
        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
        <h1 className="text-2xl font-bold text-white">Portal</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-700 hover:text-white transition-colors
              ${item.active ? "bg-purple-600 text-white" : ""}`}
          >
            {React.cloneElement(item.icon, { className: "w-5 h-5" })}
            <span>{item.name}</span>
          </a>
        ))}
        <div className="pt-4">
          <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Extra Section
          </h2>
          <div className="mt-2 space-y-2">
            {extraItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
              >
                {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-gray-400">Version 1.0</p>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-white shadow-sm h-20 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search project or client"
            className="bg-slate-100 text-sm rounded-md py-2.5 pl-10 pr-4 w-80 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Project
        </button>
        <BellIcon className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-9 h-9 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <span className="text-sm text-slate-700 font-medium">Alexander</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

const WeatherWidget = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
      <div>
        <h2 className="text-2xl text-slate-800">
          Welcome, <span className="font-semibold">Alexander</span>
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          I've Prepared A Quick Weather Report For{" "}
          <span className="text-purple-600 font-semibold">London</span> Today.
        </p>
        <p className="text-sm text-gray-600">
          Hope You're Having A Great Day 👋
        </p>
      </div>
      <div className="flex items-center text-right">
        <CloudRainIcon className="w-20 h-20 text-blue-400 mr-3" />
        <div>
          <p className="text-3xl font-bold text-slate-700">10°C</p>
          <p className="text-slate-500 text-sm">Light Raining</p>
          <p className="text-xs text-slate-400 mt-1">
            Outdoor Temperature: 10°C
          </p>
        </div>
      </div>
    </div>
  );
};

const meetingsData = [
  {
    id: 1,
    logoColor: "bg-red-400",
    company: "Astudio",
    contact: "ALEXANDER",
    date: "10/03/2023",
    time: "11:30",
    duration: "30min",
    timeColor: "text-green-600",
    durationColor: "text-yellow-600",
  },
  {
    id: 2,
    logoColor: "bg-blue-400",
    company: "Ledsense",
    contact: "AIM",
    date: "05/03/2023",
    time: "09:30",
    duration: "45min",
    timeColor: "text-green-600",
    durationColor: "text-yellow-600",
  },
  {
    id: 3,
    logoColor: "bg-green-400",
    company: "Frankopedia",
    contact: "MAGDALENA",
    date: "06/04/2023",
    time: "12:00",
    duration: "60min",
    timeColor: "text-green-600",
    durationColor: "text-yellow-600",
  },
];

const MeetingItem = ({ meeting }) => {
  return (
    <div className="flex items-center justify-between py-3 px-1 hover:bg-slate-50 rounded-md">
      <div className="flex items-center space-x-3">
        <div
          className={`w-9 h-9 rounded-full ${meeting.logoColor} flex items-center justify-center text-white text-sm font-bold`}
        >
          {meeting.company.substring(0, 1)}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">
            {meeting.company}
          </p>
          <p className="text-xs text-gray-500">{meeting.contact}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
          <span>{meeting.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ClockIcon className="w-3.5 h-3.5 text-gray-400" />
          <span className={meeting.timeColor}>{meeting.time}</span>
        </div>
        <span className={`${meeting.durationColor} font-medium`}>
          {meeting.duration}
        </span>
      </div>
    </div>
  );
};

const MeetingsSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-700">
          Next Coming Meetings
        </h3>
        <button className="text-purple-600 hover:text-purple-800">
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-1">
        {meetingsData.map((meeting) => (
          <MeetingItem key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

const projectsData = [
  {
    id: 1,
    logoUrl: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
    title: "Lead Sense",
    owner: "Madam",
    ownerSeo: "Owner Seo",
    category: "CODING",
    status: "ACTIVE",
    priority: "HIGH",
    payment: "DONE",
    description:
      "An excellent opportunity for an experienced UX/UI Designer to join a well-established cybersecurity",
    statusInfo: "IN-PROGRESS",
  },
  {
    id: 2,
    logoUrl: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
    title: "Digiin CRM",
    owner: "Jason Pineda",
    ownerSeo: "Owner Seo",
    category: "UX/UI",
    status: "ACTIVE",
    priority: "DONE", // Priority is "Payment" in the image, "Done" is its status
    payment: "DONE",
    description:
      "An excellent opportunity for an experienced UX/UI Designer to join a well-established cybersecurity",
  },
];

const ProjectItem = ({ project }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "IN-PROGRESS":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700";
      case "DONE":
        return "bg-blue-100 text-blue-700"; // Assuming "DONE" for payment maps to blue
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start gap-4">
      <div className="flex items-start space-x-4 flex-1">
        <img
          src={project.logoUrl}
          alt={project.title}
          className="w-12 h-12 rounded-md object-cover mt-1"
        />
        <div>
          <h4 className="text-md font-semibold text-slate-800">
            {project.title}
          </h4>
          <p className="text-xs text-gray-500">
            {project.owner}{" "}
            <span className="text-gray-400">{project.ownerSeo}</span>
          </p>
          <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full mt-1 inline-block">
            {project.category}
          </span>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-xs w-full md:w-auto mt-4 md:mt-0">
        <div>
          <p className="text-gray-500 mb-0.5">Status</p>
          <span
            className={`px-2.5 py-1 rounded-md font-medium ${getStatusClass(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>
        <div>
          <p className="text-gray-500 mb-0.5">Priority</p>
          <span
            className={`px-2.5 py-1 rounded-md font-medium ${getPriorityClass(
              project.priority
            )}`}
          >
            {project.priority === "DONE" ? project.payment : project.priority}
          </span>
        </div>
      </div>
      <div className="flex-1 w-full md:w-auto md:max-w-xs mt-2 md:mt-0 relative">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 mb-0.5">Assets And Info</p>
          {project.statusInfo && (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                project.statusInfo
              )}`}
            >
              {project.statusInfo}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {project.description}
        </p>
      </div>
      <button className="text-gray-400 hover:text-gray-600 absolute top-3 right-3 md:static">
        <MoreHorizontalIcon />
      </button>
    </div>
  );
};

const LatestProjectsSection = () => {
  return (
    <div className="bg-transparent">
      {" "}
      {/* No card bg for the section itself, items are cards */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-700">
          Latest Projects
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer p-2 rounded-md hover:bg-gray-200">
          <span>
            Status: <span className="font-medium text-slate-700">active</span>
          </span>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </div>
      <div className="space-y-4">
        {projectsData.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

const initialTasks = [
  { id: 1, text: "This is an example about my task", completed: true },
  { id: 2, text: "This is an example about my task", completed: false },
  { id: 3, text: "This is an example about my task", completed: false },
  { id: 4, text: "This is an example about my task", completed: false },
  { id: 5, text: "This is an example about my task", completed: false },
  { id: 6, text: "This is an example about my task", completed: true },
];

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <div className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded-md">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(task.id)}
          className="focus:outline-none"
        >
          {task.completed ? (
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          ) : (
            <CircleIcon className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
          )}
        </button>
        <span
          className={`text-sm ${
            task.completed ? "line-through text-gray-400" : "text-slate-700"
          }`}
        >
          {task.text}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onEdit(task.id)}
          className="text-gray-400 hover:text-purple-600"
        >
          <Edit2Icon />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-600"
        >
          <Trash2Icon />
        </button>
      </div>
    </div>
  );
};

const CreateTaskSection = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id) => {
    // For now, just log. In a real app, this would open an edit modal/form.
    console.log("Edit task:", id);
  };

  const handleAddTask = () => {
    const newTaskText = prompt("Enter new task text:");
    if (newTaskText && newTaskText.trim() !== "") {
      const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
        text: newTaskText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-700">
          Create New Task
        </h3>
        <button
          onClick={handleAddTask}
          className="text-purple-600 hover:text-purple-800"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-1">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        ))}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-100 font-sans antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        {" "}
        {/* ml-64 for fixed sidebar width */}
        <Header />
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="text-sm text-gray-500">
            Page / <span className="text-slate-700 font-medium">Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 -mt-4">Dashboard</h1>

          <WeatherWidget />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <MeetingsSection />
            </div>
            <div className="lg:col-span-2">
              <CreateTaskSection />
            </div>
          </div>

          <LatestProjectsSection />
        </main>
        <footer className="py-4 px-8 text-right">
          <p className="text-xs text-gray-500">
            Dashboard Using React Router Dom
          </p>
        </footer>
      </div>
    </div>
  );
}
