import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAnnouncementStore } from "../store/Announcement"; 

const SignInPage = () => {
  const [showNoUserMessage, setShowNoUserMessage] = useState(false);
  const { darkInStore } = useAnnouncementStore();

  return (
    <div className={`min-h-screen flex items-center justify-center py-20 sm:px-6 lg:px-8 ${
      darkInStore ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${
            darkInStore ? 'text-white' : 'text-gray-900'
          }`}>
            Sign in to your account
          </h2>
          <p className={`mt-2 text-center text-sm ${
            darkInStore ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Or{' '}
            <Link
              to="/sign-up"
              className={`font-medium ${
                darkInStore 
                  ? 'text-indigo-400 hover:text-indigo-300' 
                  : 'text-indigo-600 hover:text-indigo-500'
              }`}
            >
              create a new account
            </Link>
          </p>
        </div>

        {showNoUserMessage && (
          <div className={`border rounded-md p-4 ${
            darkInStore
              ? 'bg-red-900/50 border-red-800'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex">
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${
                  darkInStore ? 'text-red-200' : 'text-red-800'
                }`}>
                  No user registered
                </h3>
                <div className={`mt-2 text-sm ${
                  darkInStore ? 'text-red-300' : 'text-red-700'
                }`}>
                  <p>
                    It looks like you don't have an account yet.{' '}
                    <Link
                      to="/sign-up"
                      className={`font-medium underline ${
                        darkInStore
                          ? 'text-red-300 hover:text-red-200'
                          : 'text-red-700 hover:text-red-600'
                      }`}
                    >
                      Please sign up first
                    </Link>
                    {' '}to create your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white flex text-black justify-center mr-0 p-0 rounded-3xl">
          <SignIn 
            signUpUrl="/sign-up"
            onError={(error) => {
              if (error.code === 'form_identifier_not_found' || 
                  error.code === 'form_password_incorrect' ||
                  error.message?.includes('not found')) {
                toast.error("Please signup yourself first.");
              }
            }}
            
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;