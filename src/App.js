import "./App.css";
import React, {useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { tableContext } from "./components/TableContext";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import QuestionsForm from "./components/questionsform/QuestionsForm";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Answer from "./components/answer/Answer";
import SuperuserDashboard from "./superuser/SuperuserDashboard";
import About from "./components/about/About";
import Education from "./components/education/Education";
import Skills from "./components/skills/Skills";
import Works from "./components/works/Works";
import Contact from "./components/contact/Contact";
import Certificates from "./components/certificates/Certificates";
import HomeLayout from "./components/homeLayout/HomeLayout";
import SeenWorks from "./components/seenworks/SeenWorks";

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
              <QuestionsForm />
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
              <Answer />
            </ProtectedRoute>
          }
        />

      

        {/* Bütün istifadəçilər üçün açıq səhifələr */}
        <Route path="/" element={<HomeLayout />} />

        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/works" element={<Works />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/seenworks" element={<SeenWorks />} />
      </Routes>
    </>
  );
}

export default App;
