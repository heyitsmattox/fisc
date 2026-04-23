import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabaseClient";

const UserSessionBtn = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <button
          className={`${user ? `text-white hover:text-emerald-400 transition-colors rounded-md font-bold  flex items-center shrink-0 ` : ` hover:text-emerald-400 transition-colors text-white rounded-md font-bold  flex items-center shrink-0`}`}
          onClick={() => supabase.auth.signOut()}
        >
          <i className="pr-2 fa-solid fa-arrow-right-to-bracket"></i>
          Sign out
        </button>
      ) : (
        <Link to="/login">Sign in</Link>
      )}
    </div>
  );
};

export default UserSessionBtn