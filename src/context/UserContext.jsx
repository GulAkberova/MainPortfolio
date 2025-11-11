import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [users, setUsers] = useState([]); // Bütün istifadəçiləri saxlayacaq vəziyyət
  const [loading, setLoading] = useState(true);

  // İstifadəçiləri Firestore-dan gətirmək üçün funksiya
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList); // İstifadəçiləri vəziyyətə yükləyirik
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData);
            setRole(userData.isSuperAdmin ? "superadmin" : userData.isAdmin ? "admin" : "user");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setRole(null);
      }

      // İstifadəçiləri yüklə
      fetchUsers();

      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup function
  }, []); // Burada yalnız initial mount-da işləyir

  return (
    <UserContext.Provider value={{ user, role, users, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
