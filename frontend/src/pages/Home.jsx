import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronRight,
  Star,
  Sparkles,
  MessageSquare,
  Database,
} from "lucide-react";
import api from "@/utils/API";
import { useNavigate } from "react-router-dom";

function Header({ googleLoginClick }) {
  return (
    <header
      className={
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out bg-background/90 backdrop-blur-md py-4"
      }
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="font-bold text-2xl">Xeno</div>
          <div className="bg-primary text-primary-foreground px-1.5 py-0.5 text-xs rounded-md">
            CRM
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button onClick={googleLoginClick} variant="outline" size="sm">
            Sign In
          </Button>
          <Button onClick={googleLoginClick} size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeroSection({ googleLoginClick }) {
  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/60 -z-10" />

      <div className="container mx-auto px-4 h-[calc(100vh-80px)] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-background/80 backdrop-blur-sm shadow-sm">
            <span className="flex items-center">
              <Star className="h-3.5 w-3.5 mr-1 text-primary" />
              <span className="font-medium">Introducing Xeno AI CRM</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            AI-Powered Customer Relationship
            <br className="hidden md:inline" />
            <span className="text-primary">Management</span> Simplified
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            Transform your customer relationships with AI-driven insights,
            automated campaigns, and intelligent segmentation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button onClick={googleLoginClick} size="lg" className="text-base">
              Start Free Trial
            </Button>
            <Button
              onClick={googleLoginClick}
              size="lg"
              variant="outline"
              className="text-base"
            >
              Book a Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
            <div className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold mb-1">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">
                Smart segmentation and campaign suggestions
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
              <MessageSquare className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Smart Campaigns</h3>
              <p className="text-sm text-muted-foreground">
                Automated messaging with personalization
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
              <Database className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Easy Integration</h3>
              <p className="text-sm text-muted-foreground">
                Secure APIs for seamless data sync
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Home = () => {
  const naviagte = useNavigate();
  const googleLoginClick = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/auth/google", {
          code: tokenResponse.code,
        });

        if (res.status === 200) {
          naviagte("/dashboard");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    onError: () => {
      console.error("Login Failed");
    },
    flow: "auth-code",
  });
  return (
    <div className="min-h-screen flex flex-col">
      <Header googleLoginClick={googleLoginClick} />
      <main className="flex-1">
        <HeroSection googleLoginClick={googleLoginClick} />
      </main>
    </div>
  );
};

export default Home;
