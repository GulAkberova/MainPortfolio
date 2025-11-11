import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig"; // Firebase konfiqurasiyanız
import { onAuthStateChanged } from "firebase/auth";

// AuthContext yaradın
const AuthContext = createContext();

// AuthProvider komponenti
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log(user,'1111111111111111111111111')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // user burada düzgün şəkildə set edilir
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth funksiyası
export const useAuth = () => {
  return useContext(AuthContext);
};
