import React from "react";
import { useUser, SignOutButton } from '@clerk/clerk-react';
import { useAnnouncementStore } from "../store/Announcement";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, LogIn, Megaphone } from "lucide-react";

const WelcomeCard = () => {
  const { user } = useUser();
  const { isAuthenticated, setIsAuthenticated, darkInStore } = useAnnouncementStore();
  const navigate = useNavigate();

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight * 0.6,
      behavior: 'smooth',
    });
  };

  const cardBg = darkInStore 
    ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700" 
    : "bg-gradient-to-br from-white to-gray-50 border-gray-200";
  
  const textColor = darkInStore ? "text-white" : "text-gray-900";
  const textMuted = darkInStore ? "text-gray-300" : "text-gray-600";

  return (
    <div className="max-w-2xl mx-auto mt-4 mb-8">
      <div className={`${cardBg} border p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl`}>
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className={`p-3 rounded-full ${
              darkInStore ? "bg-blue-600" : "bg-blue-500"
            }`}>
              <Megaphone className="text-white" size={24} />
            </div>
          </div>
          
          <h1 className={`text-3xl font-bold ${textColor} mb-2`}>
            {isAuthenticated
              ? `Welcome back, ${user?.firstName || "User"}! 🎉`
              : "Welcome to MSC Announcements 🚀"}
          </h1>
          
          <p className={`${textMuted} text-lg`}>
            {isAuthenticated
              ? "Stay updated with the latest announcements and share your own!"
              : "Your hub for important updates and community announcements"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleScroll}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 ${
              darkInStore
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <Megaphone size={18} />
            View Announcements
            <ChevronDown size={16} className="ml-1" />
          </button>

          {isAuthenticated ? (
            <SignOutButton>
              <button
                onClick={() => setIsAuthenticated(false)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 ${
                  darkInStore
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </SignOutButton>
          ) : (
            <button
              onClick={() => navigate("/sign-in")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 ${
                darkInStore
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              <LogIn size={18} />
              Sign In
            </button>
          )}
        </div>

        {isAuthenticated && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="text-center">
                <div className={`font-semibold ${textColor}`}>Welcome!</div>
                <div className={textMuted}>Logged in as {user?.fullName || user?.firstName}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default WelcomeCard;