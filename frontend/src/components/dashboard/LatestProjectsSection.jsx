import React from 'react';
import { MoreHorizontal, ChevronDown } from 'lucide-react';

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

const ProjectItem = ({ project }) => { // Added a comment to ensure change detection if only whitespace changes occur
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 flex flex-col lg:flex-row justify-between items-start gap-4">
      <div className="flex items-start space-x-3 md:space-x-4 flex-1 w-full lg:w-auto">
        <img
          src={project.logoUrl}
          alt={project.title}
          className="w-12 h-12 rounded-md object-cover mt-1"
        />
        <div>
          <h4 className="text-sm md:text-md font-semibold text-slate-800">
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
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 gap-x-3 md:gap-x-4 gap-y-2 text-xs w-full lg:w-auto mt-3 md:mt-4 lg:mt-0">
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
      <div className="flex-1 w-full lg:w-auto lg:max-w-xs mt-3 md:mt-2 lg:mt-0 relative">
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
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {project.description}
        </p>
      </div>
      <button className="text-gray-400 hover:text-gray-600 absolute top-3 right-3 lg:static lg:ml-4">
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
};

const LatestProjectsSection = () => {
  return (
    <div className="bg-transparent">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-slate-700">
          Latest Projects
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer p-2 rounded-md hover:bg-gray-200">
          <span>
            Status: <span className="font-medium text-slate-700">active</span>
          </span>
          <ChevronDown size={16} />
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

export default LatestProjectsSection;