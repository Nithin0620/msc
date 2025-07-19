import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useAnnouncementStore } from "../store/Announcement"; 

const SignUpPage = () => {
  const { darkInStore } = useAnnouncementStore();

  return (
    <div className={`min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 ${
      darkInStore ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${
            darkInStore ? 'text-white' : 'text-gray-900'
          }`}>
            Create your account
          </h2>
          <p className={`mt-2 text-center text-sm ${
            darkInStore ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Or{' '}
            <Link
              to="/sign-in"
              className={`font-medium ${
                darkInStore 
                  ? 'text-indigo-400 hover:text-indigo-300' 
                  : 'text-indigo-600 hover:text-indigo-500'
              }`}
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <div className="flex bg-white text-black rounded-3xl justify-center">
          <SignUp 
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
