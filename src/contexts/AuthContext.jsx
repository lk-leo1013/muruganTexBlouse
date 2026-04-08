import { createContext, useContext, useState } from 'react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
const SESSION_KEY = 'murugan_admin_session';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => !!sessionStorage.getItem(SESSION_KEY));

  const signIn = (_email, password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setSession(true);
      return { error: null };
    }
    return { error: 'Invalid password' };
  };

  const signOut = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(false);
  };

  return (
    <AuthContext.Provider value={{ session, loading: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
