import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [hasCheckedInitialAuth, setHasCheckedInitialAuth] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Only run the anonymous cleanup check once
      if (!hasCheckedInitialAuth) {
        setHasCheckedInitialAuth(true);

        if (currentUser?.isAnonymous) {
          console.log("Anonymous session from previous visit — signing out");
          await logout(auth);
          setUser(null);
          setLoading(false);
          return;
        }
      }

      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [hasCheckedInitialAuth]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe; // Clean up on unmount
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
