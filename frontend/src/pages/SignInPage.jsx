import { SignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useAnnouncementStore } from "../store/Announcement";

const SignInPage = () => {
  const { user, isSignedIn } = useUser();
  const { setIsAuthenticated, darkInStore } = useAnnouncementStore();

  useEffect(() => {
    if (isSignedIn && user) {
      setIsAuthenticated(true);
    }
  }, [isSignedIn, user, setIsAuthenticated]);

  const cardBg = darkInStore ? "bg-black text-white" : "bg-white text-black";
  const cardBorder = darkInStore ? "border-zinc-700" : "border-border";

  return (
    <div className="min-h-screen flex mt-10 items-center justify-center" style={{ backgroundColor: "#04011c" }}>

      <div className={`w-full max-w-md p-6 rounded-2xl shadow-accent-box border bg-white text-black ${cardBorder}`}>

        <h2 className="text-2xl font-bold text-center mb-4 accent-text">Welcome Back</h2>
        <SignIn path="/sign-in"  routing="path" signUpUrl="/sign-up" />
        
      </div>
    </div>
  );
};

export default SignInPage;
