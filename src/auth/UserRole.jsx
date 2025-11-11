import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebaseConfig";

const UserRole = () => {
  const [role, setRole] = useState({
    isSuperAdmin: false,
    isAdmin: false,
    isUser: false
  });

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);

        const userDocSnap = await getDoc(userDocRef);
        console.log(userDocSnap, "rrrrrrrrrrrr");

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.isSuperAdmin) {
            setRole({
              isSuperAdmin: true,
              isAdmin: false,
              isUser: false
            });
          } else if (userData.isAdmin) {
            setRole({
              isSuperAdmin: false,
              isAdmin: true,
              isUser: false
            });
          } else {
            setRole({
              isSuperAdmin: false,
              isAdmin: false,
              isUser: true
            });
          }
        } else {
          console.log("İstifadəçi məlumatı tapılmadı.");
        }
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div>
      <p>İstifadəçi rolu: {role.isSuperAdmin ? "Super Admin" : role.isAdmin ? "Admin" : "User"}</p>
    </div>
  );
};

export default UserRole;
