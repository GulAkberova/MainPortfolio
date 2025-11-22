import "./App.css";
import React, {useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { tableContext } from "./components/TableContext";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import SuperuserDashboard from "./superuser/SuperuserDashboard";
import HomeLayout from "./components/homeLayout/HomeLayout";

function App() {
  let { setAll, value, setLoading } =
    useContext(tableContext);

  useEffect(() => {
    setLoading(true);
    fetch("https://northwind.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAll(data);
        setLoading(false);
      });
  }, [value]);
  const { user } = useAuth();
  // console.log(user, "user");
  return (
    <>
  
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Qeydiyyatdan keçmiş istifadəçilər üçün */}
        <Route
          path="/questionsform"
          element={
            <ProtectedRoute requiredRole="user">
              {/* <QuestionsForm /> */}
            </ProtectedRoute>
          }
        />

        {/* Yalnız superadminlər üçün */}
        <Route
          path="/superuserdashboard"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <SuperuserDashboard />
            </ProtectedRoute>
          }
        />
        

        {/* Adminlər üçün xüsusi səhifə */}
        <Route
          path="/answer"
          element={
            <ProtectedRoute requiredRoles={["admin", "superadmin"]}>
              {/* <Answer /> */}
            </ProtectedRoute>
          }
        />

      

        {/* Bütün istifadəçilər üçün açıq səhifələr */}
        <Route path="/*" element={<HomeLayout />} />

  
      </Routes>
    </>
  );
}

export default App;
