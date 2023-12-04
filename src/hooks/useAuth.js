import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  return { user };
}

export { useAuth };
