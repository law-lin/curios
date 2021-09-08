import React, { useEffect, useState, createContext, useContext } from 'react';
import { Session, Subscription } from '@supabase/supabase-js';
import supabase from 'lib/supabase';
import { User } from 'types';
import { fetchUser } from 'lib/supabase/store';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext<{
  user: User | null;
  session: Session | null;
  authenticated: boolean;
  loadingAuthState: boolean;
}>({
  user: null,
  session: null,
  authenticated: false,
  loadingAuthState: true,
});

export const AuthProvider = (props: any) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let authListener: Subscription | null = null;
    (async () => {
      const session = supabase.auth.session();

      const userInfo = await fetchUser(session?.user?.email as string);
      setSession(session);
      const userObject = { ...session?.user, ...userInfo } as User;
      if (Object.keys(userObject).length > 0) {
        setUser(userObject);
      }
      let { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        if (event === 'SIGNED_IN') {
          const userInfo = await fetchUser(session?.user?.email as string);
          setSession(session);
          setUser(({ ...session?.user, ...userInfo } as User) ?? null);
          history.push('/c');
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
        }
      });
      authListener = data;
      setLoadingAuthState(false);
    })();
    return () => {
      authListener!.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    session,
    user,
    loadingAuthState,
    authenticated: user !== null,
  };
  return <AuthContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a AuthProvider.`);
  }
  return context;
};
