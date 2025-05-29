import React from 'react';
import Header from '../components/dashboard/Header';
import CampaignsOverviewSection from '../components/dashboard/CampaignsOverviewSection'; // Renamed from LatestProjectsSection
import NotesSection from '../components/dashboard/NotesSection'; // Added NotesSection

export default function DashboardPage() {
  
  return (
    <div className="flex h-screen bg-slate-100 font-sans antialiased">
      <div className="flex-1 flex flex-col"> {/* ml-64 for fixed sidebar width */}
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8">
          <div className="text-sm text-gray-500">
            Page / <span className="text-slate-700 font-medium">CRM Dashboard</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 -mt-2 md:-mt-4">CRM Dashboard</h1>

          <CampaignsOverviewSection />
          <NotesSection /> 

        </main>
        <footer className="py-4 px-8 text-right">
          <p className="text-xs text-gray-500">
            CRM Dashboard - XENO
          </p>
        </footer>
      </div>
    </div>
  );
}
