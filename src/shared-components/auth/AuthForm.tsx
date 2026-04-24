import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  isLoading?: boolean;
  mode: "login" | "signup";
}

type AuthMode = "login" | "signup";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

//anything in our interface needs to be passed as a prop in our
export const AuthForm: React.FC<AuthFormProps> = ({
  isLoading,
  mode: initialMode,
}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [formMode, setFormMode] = useState<AuthMode>(initialMode);
  // placeholder right now, will use in the future
  const [avatarUrl, setAvatarUrl] = useState<string>(""); // Example of extra user metadata
  const [fullName, setFullName] = useState<string>("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    let data;
    let error;

    if (formMode === "signup") {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            avatar_url: avatarUrl,
            store_name: storeName,
          },
        },
      });

      data = response.data;
      error = response.error;
      // we can continue the chain if we utilize OAuth provides
      // like Google or Github to handle the sign up and login flow. This is because with OAuth providers, the user is automatically signed in after the sign up process, so we can check for the session immediately after signing up. However, with email/password authentication, the user needs to confirm their email (if email confirmation is enabled) before they can log in, which is why we don't have an active session immediately after signing up. Therefore, we would need to implement a separate login step after sign up for email/password authentication, or we could choose to automatically log the user in after sign up if email confirmation is not required.
    } else {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      data = response.data;
      error = response.error;
    }
    //clears the form after submission
    const authForm = document.getElementById(
      "auth-form",
    ) as HTMLFormElement | null;
    authForm?.reset();

    if (error) {
      console.error("Auth error:", error.message);
    } else {
      console.log(
        `${formMode === "signup" ? "Sign up" : "Login"} successful:`,
        data,
      );
    }
  };

  const ProtectedRoute = ({
    isAuthenticated,
  }: {
    isAuthenticated: boolean;
  }) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return navigate("/login", { replace: true });
    }
  };

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
    if (event === "SIGNED_IN") {
      // handle signed in session
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } else if (event === "SIGNED_OUT") {
      // handle signed out event
      navigate("/login"); // Redirect to login after logout
    }
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center  bg-[#1a1d20] text-zinc-50 p-6">
      {/* Main Card Container */}
      <div className="w-full max-w-[450px] bg-[#1E2329] border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header / Logo Section */}
        <div className="pt-10 pb-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <div className=" bg-emerald-500 rounded-sm rotate-45" />
            <img
              src="src/assets/logo.png"
              alt="FISC Logo"
              className="h-36 w-[250px]"
            />
            <span
              className="
                  text-2xl text-white tracking-wider 
                  -ml-[122px] select-none
                  font-bold uppercase font-inter
                  /* This nudge ensures the text baseline matches the logo icon */
                  transform translate-y-[2px]
                "
            >
              FISC
            </span>
          </div>
          <p className="text-zinc-500 text-sm uppercase tracking-[0.2em]">
            Inventory Manager
          </p>
        </div>

        {/* Mode Toggles */}
        <div className="flex border-b border-white/5">
          <button
            onClick={() => setFormMode("login")}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${formMode === "login" ? "text-emerald-500 border-b-2 border-emerald-500" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Login
          </button>
          <button
            onClick={() => setFormMode("signup")}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${formMode === "signup" ? "text-emerald-500 border-b-2 border-emerald-500" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Body */}
        <form id="auth-form" className="p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              className="w-full bg-[#0f1113] border border-white/10 p-4 text-sm text-white rounded-xl outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-700"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#0f1113] border border-white/10 p-4 text-sm text-white rounded-xl outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-700"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Conditional Rendering: Sign Up Fields */}
          {formMode === "signup" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
                  Store Name
                </label>
                <input
                  type="text"
                  placeholder="My TCG Shop"
                  className="w-full bg-[#0f1113] border border-white/10 p-4 text-sm text-white rounded-xl outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-700"
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>
            </div>
          )}

          {formMode === "login" && (
            <button
              type="button"
              className="text-[11px] text-zinc-500 hover:text-emerald-400 transition-colors font-medium"
            >
              Forgot your password?
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-700 text-[#0f1113] font-bold py-4 rounded-xl mt-4 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-[0.98] disabled:cursor-not-allowed"
            onClick={handleAuth}
          >
            {isLoading
              ? "Processing..."
              : formMode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>

          <p className="text-center text-xs text-zinc-500 pt-4">
            {formMode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              // check current mode. If on login screen switch to the mode of signup. If on signup screen switch to the mode of login
              onClick={() =>
                setFormMode(formMode === "login" ? "signup" : "login")
              }
              className="text-emerald-500 hover:underline font-bold"
            >
              {/* if current mode is login show the text sign up. otherwise show the text login */}
              {formMode === "login" ? "Sign Up" : "Log In"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
