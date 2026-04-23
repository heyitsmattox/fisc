import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabaseClient";

const UserSessionBtn = () => {
  const { user } = useAuth();

  // Base styles 
  const baseStyles = "flex items-center shrink-0 font-bold  tracking-widest text-[14px] transition-all duration-200 hover:text-emerald-400";

  return (
    <div className="py-2">
      {user ? (
        <button
          className={`${baseStyles} text-zinc-400`}
          onClick={() => supabase.auth.signOut()}
        >
          {/* Icon from your OSRS/Dashboard aesthetic */}
          <i className="fa-solid fa-arrow-right-from-bracket pr-3 text-emerald-500"></i>
          Sign Out
        </button>
      ) : (
        <Link 
          to="/login" 
          className={`${baseStyles} text-white`}
        >
          <i className="fa-solid fa-user pr-3 text-emerald-500"></i>
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserSessionBtn;