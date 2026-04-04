import React, { useState } from 'react';

interface AuthFormProps {
  // mode: 'login' | 'signup';
  // setMode: (mode: 'login' | 'signup') => void;
  isLoading: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({isLoading }) => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [storeName, setStoreName] = useState<string>('');
  const [mode, setMode] = useState<string>('login' | 'signup')

  return (
    <div className="w-full min-h-screen flex items-center justify-center  bg-[#1a1d20] text-zinc-50 p-6">
      {/* Main Card Container */}
      <div className="w-full max-w-[450px] bg-[#1E2329] border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header / Logo Section */}
        <div className="pt-10 pb-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <div className=" bg-emerald-500 rounded-sm rotate-45" />
            <img src="src/assets/logo.png" alt="FISC Logo" className="h-36 w-[250px]" />
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
          <p className="text-zinc-500 text-sm uppercase tracking-[0.2em]">Inventory Manager</p>
        </div>

        {/* Mode Toggles */}
        <div className="flex border-b border-white/5">
          <button 
            onClick={() => setMode('login')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${mode === 'login' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${mode === 'signup' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Body */}
        <form className="p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
            <input 
              type="email"
              placeholder="user@example.com" 
              className="w-full bg-[#0f1113] border border-white/10 p-4 text-sm text-white rounded-xl outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-700"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Password</label>
            <input 
              type="password"
              placeholder="••••••••" 
              className="w-full bg-[#0f1113] border border-white/10 p-4 text-sm text-white rounded-xl outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-700"
            />
          </div>

          {/* Conditional Rendering: Sign Up Fields */}
          {mode === 'signup' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Store Name</label>
                <input 
                  type="text"
                  placeholder="My TCG Shop" 
                  className="w-full bg-[#0f1113] border border-white/10 p-4 text-sm text-white rounded-xl outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-700"
                />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <button type="button" className="text-[11px] text-zinc-500 hover:text-emerald-400 transition-colors font-medium">
              Forgot your password?
            </button>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-700 text-[#0f1113] font-bold py-4 rounded-xl mt-4 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-[0.98] disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <p className="text-center text-xs text-zinc-500 pt-4">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              type="button" 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-emerald-500 hover:underline font-bold"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;