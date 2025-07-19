import { useUser, SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { useEffect } from "react";
// import { FaUser } from "react-icons/fa";
import { useAnnouncementStore } from "../store/Announcement";
import { MoonIcon, SunIcon,User  } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { darkInStore, toggleTheme, setIsAuthenticated } = useAnnouncementStore();

  useEffect(() => {
    localStorage.setItem("theme", darkInStore ? "dark" : "light");
  }, [darkInStore]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
    }
  }, []);

  const navBg = darkInStore 
    ? "bg-gray-900/95 backdrop-blur-sm border-gray-700" 
    : "bg-white/95 backdrop-blur-sm border-gray-200";

  const textColor = darkInStore ? "text-white" : "text-gray-900";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${navBg} border-b shadow-lg transition-all duration-300`}>
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div onClick={()=>navigate("/")} className={`text-xl font-bold ${textColor} flex cursor-pointer items-center`}>
          <img 
            src="./logo.png" 
            alt="logo" 
            className="h-8 w-8 mr-3 object-contain" 
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            MSC Announcements
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              darkInStore 
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title={darkInStore ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkInStore ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>

          <SignedIn>
            <div className={`flex items-center gap-3 ${textColor}`}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-opacity-50">
                <div className={`p-1 rounded-full ${
                  darkInStore ? "bg-gray-700" : "bg-gray-200"
                }`}>
                  <User  size={14} />
                </div>
                <span className="font-medium text-sm">
                  {user?.fullName || user?.firstName || "User"}
                </span>
              </div>
              
              <SignOutButton>
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkInStore
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>

          <SignedOut>
            <button
              onClick={() => navigate("/sign-in")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                darkInStore
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
              }`}
            >
              Sign In
            </button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;