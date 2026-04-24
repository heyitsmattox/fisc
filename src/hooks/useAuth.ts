import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // this line checks if there is an active session when the component mounts. 
    // If there is, it sets the user state to the current user and sets loading to false. 
    // If there isn't, it just sets loading to false.
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    initAuth();

    // this listener will update the user state whenver the auth changes. e.g sign in or sign out.
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // tells our code to stop listening to the auth state change to avoid memory leaks
    return () => {
      data?.subscription?.unsubscribe();
    };
  }, []);

  //allows us to utilize the user object and loading state in other components
  return { user, isLoading };
};
