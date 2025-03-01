import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import axios from "axios";

export const LogAuthContext = createContext(null);

function LogAuth({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetUser(user) {
    try {
      const response = await axios.get(
        "https://masai-hackathon-2025-default-rtdb.firebaseio.com/community/users.json"
      );
      const data = await response.data;
      const arr = [];
      for (let key in data) {
        arr.push({ id: key, ...data[key] })
        if (data[key]?.email === user?.email) {
          setCurrentUser(data[key]);
        }
      }
      setUsers(arr)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(true);
        console.log("user is logged in.");
        fetUser(user);
      } else {
        setUserLogin(false);
        console.log("No user is logged in.");
      }
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    userLogin,
    loading,
    users
  };

  return (
    <LogAuthContext.Provider value={value}>
      {!loading && children}
    </LogAuthContext.Provider>
  );
}

export default LogAuth;
