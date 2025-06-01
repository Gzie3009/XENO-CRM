import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Star,
  Sparkles,
  MessageSquare,
  Database,
  ArrowRight,
  Users,
  BarChart3,
  Zap,
  Loader2,
} from "lucide-react";
import api from "@/utils/API";
import { useNavigate } from "react-router-dom";
import useStore from "@/store/useStore";
import { toast } from "sonner";

function Header({ googleLoginClick, loading }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-bold text-2xl text-black dark:text-white">
            Xeno
          </div>
          <div className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs rounded-md font-medium">
            CRM
          </div>
        </div>

        <Button
          onClick={googleLoginClick}
          variant="outline"
          className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 font-medium flex items-center gap-2"
          size="sm"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          {loading ? "Signing in…" : "Continue with Google"}
        </Button>
      </div>
    </header>
  );
}

function HeroSection({ googleLoginClick, loading }) {
  return (
    <section className="pt-20 relative overflow-hidden bg-white dark:bg-black">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white dark:from-black/80 dark:to-black" />

      <div className="container mx-auto px-6 flex flex-col relative z-10">
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-10">
          {/* Announcement badge */}
          <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
            <Star className="h-4 w-4 mr-2 text-black dark:text-white" />
            <span className="font-medium text-black dark:text-white">
              Introducing Xeno AI CRM
            </span>
            <ChevronRight className="h-4 w-4 ml-2 text-gray-500" />
          </div>

          {/* Heading & subtitle */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white leading-tight">
              AI-Powered Customer
              <br />
              <span className="relative">
                Relationship
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-black dark:bg-white rounded-full" />
              </span>
              <br />
              Management
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Transform your customer relationships with AI-driven insights,
              automated campaigns, and intelligent segmentation.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <Button
              onClick={googleLoginClick}
              size="lg"
              disabled={loading}
              className="bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-600 font-medium text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              {loading ? (
                "Signing in…"
              ) : (
                <>
                  Continue with Google
                  <ArrowRight className="ml-1 h-5 w-5" />
                </>
              )}
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl">
            <div className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-black dark:text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Smart segmentation and campaign suggestions powered by advanced
                AI
              </p>
            </div>

            <div className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-6 w-6 text-black dark:text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">
                Smart Campaigns
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Automated messaging with personalization and intelligent
                targeting
              </p>
            </div>

            <div className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 mb-4 group-hover:scale-110 transition-transform">
                <Database className="h-6 w-6 text-black dark:text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">
                Easy Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Secure APIs for seamless data synchronization and workflow
                automation
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-16 text-center">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-2xl font-bold text-black dark:text-white">
                10K+
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Customers
              </span>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-gray-500" />
              <span className="text-2xl font-bold text-black dark:text-white">
                95%
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Delivery Rate
              </span>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-gray-500" />
              <span className="text-2xl font-bold text-black dark:text-white">
                3x
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Faster Setup
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useStore();

  // initiate Google OAuth
  const googleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await api.post("/auth/google", {
          code: tokenResponse.code,
        });
        if (response.status === 200) {
          toast.success("Logged in successfully");
          setUser(response.data.user);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      console.error("Login Failed");
      setLoading(false);
    },
    flow: "auth-code",
  });

  // wrapper so we can toggle loading *before* the popup
  const handleGoogleLogin = () => {
    setLoading(true);
    googleAuth();
  };

  // redirect if already logged in
  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col bg-white dark:bg-black">
      <Header googleLoginClick={handleGoogleLogin} loading={loading} />
      <main className="flex-1">
        <HeroSection googleLoginClick={handleGoogleLogin} loading={loading} />
      </main>
    </div>
  );
};

export default Home;
