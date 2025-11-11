// GoogleRegister.js
import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/google.png";

const Google = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const isSuperAdmin = user.email === "kbrovagul0@gmail.com";

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        isAdmin: isSuperAdmin,
        isSuperAdmin: isSuperAdmin,
      });

      console.log("İstifadəçi Google ilə qeydiyyatdan keçdi!");
      navigate("/");
    } catch (error) {
      console.error("Google ilə qeydiyyat zamanı xəta baş verdi:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleGoogleRegister}
        className="auth_button_google"
        disabled={loading}
      >
        <img src={googleIcon} alt="Google İkonu" className="google-icon" />
        {/* {loading ? (
          "Giriş edilir..."
        ) : (
          <img src={googleIcon} alt="Google İkonu" className="google-icon" />
        )} */}
      </button>
    </div>
  );
};

export default Google;
