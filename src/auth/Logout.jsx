"use client";

import { auth, signOut } from "../firebaseConfig";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("İstifadəçi çıxış etdi");
    } catch (error) {
      console.error("Çıxış xətası:", error.message);
    }
  };

  return <button onClick={handleLogout}>Çıxış et</button>;
};

export default Logout;
