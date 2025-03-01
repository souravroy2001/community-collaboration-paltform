import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const LogAuthContext = createContext(null);

function LogAuth({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserLogin(true);
        console.log("user is logged in.");
      } else {
        console.log("No user is logged in.");
        setCurrentUser(null);
        setUserLogin(false);
      }
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    userLogin,
    loading,
  };
console.log(currentUser);
  return (
    <LogAuthContext.Provider value={value}>
      {!loading && children}
    </LogAuthContext.Provider>
  );
}

export default LogAuth;
