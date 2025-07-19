import { Routes, Route, Navigate } from "react-router-dom";
import { SignedOut, useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useAnnouncementStore } from "./store/Announcement";

export default function App() {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { setIsAuthenticated, getAnnouncements, darkInStore } = useAnnouncementStore();

  useEffect(() => {
    const handleAuth = async () => {
      if (isSignedIn) {
        setIsAuthenticated(true);
        try {
          const token = await getToken();
          // console.log("token:",token)
          getAnnouncements(token); 
        } catch (error) {
          console.error("Error getting token:", error);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    handleAuth();
  }, [isSignedIn, setIsAuthenticated, getAnnouncements, getToken]);

  useEffect(() => {
    if (darkInStore) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkInStore]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkInStore ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navbar />
      <Routes>
        <Route 
          path="/sign-in" 
          element={
            <SignedOut>
              <SignInPage />
            </SignedOut>
          } 
        />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}