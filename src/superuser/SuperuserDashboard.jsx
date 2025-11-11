import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useUser } from "../context/UserContext";
import "./superuserDashboard.css";

const SuperuserDashboard = () => {
  const { users, loading } = useUser();
  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const toggleAdminStatus = async (userId, isAdmin) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { isAdmin: !isAdmin });

      // Lokal state-i yenilə
      setLocalUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isAdmin: !isAdmin } : user
        )
      );
    } catch (error) {
      console.error("Error updating admin status:", error);
    }
  };

  if (loading) {
    return <div className="superuser-dashboard__loading">Yüklənir...</div>;
  }

  return (
    <div className="superuser-dashboard">
      {/* <h1 className="superuser-dashboard__title">Superuser Dashboard</h1> */}
      <table className="superuser-dashboard__table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {localUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                {user.isSuperAdmin
                  ? "Super Admin"
                  : user.isAdmin
                  ? "Admin"
                  : "Adi User"}
              </td>
              <td>
                {!user.isSuperAdmin && (
                  <button
                    className="superuser-dashboard__button"
                    onClick={() => toggleAdminStatus(user.id, user.isAdmin)}
                  >
                    {user.isAdmin ? "Admin statusunu ləğv et" : "Admin et"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperuserDashboard;
