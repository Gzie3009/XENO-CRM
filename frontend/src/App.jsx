import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateSegmentPage from "./pages/CreateSegment";
import CampaignsPage from "./pages/Campaigns";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import { SidebarContent } from "./components/dashboard/Sidebar"; // Import SidebarContent
import AuthProvider from "./providers/authProvider";

function AppContent() {
  const location = useLocation();
  const showSidebarOnRoute = location.pathname !== "/";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sidebarContainerClasses =
    "hidden md:block w-64 bg-slate-800 text-gray-300 flex flex-col h-screen fixed";
  const mainContentMargin = showSidebarOnRoute ? "md:ml-64" : "";

  return (
    <div>
      {showSidebarOnRoute && (
        <>
          <div className="block md:hidden">
            <Sheet  open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger
                asChild
                className="fixed top-4 right-4 z-50 md:hidden"
              >
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[250px] sm:w-[300px] bg-slate-800 text-gray-300 p-0 flex flex-col"
              >
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
          <div className={sidebarContainerClasses}>
            <SidebarContent />
          </div>
        </>
      )}
      <div style={{ flexGrow: 1 }} className={mainContentMargin}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/segments/new" element={<CreateSegmentPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
