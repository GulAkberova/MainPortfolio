// ModalMessage.jsx
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./modalMessage.css"; // Stil üçün əlavə etdiyiniz CSS faylını import edin
import { useNavigate } from "react-router-dom";

const ModalMessage = ({ type, message, onClose }) => {
  const { t } = useTranslation(); // Dil dəstəyi üçün
  const navigate=useNavigate()

  const translatedMessage = t(message); // Mesajı tərcümə et

  const handleClose = () => {
    onClose();
    navigate("/"); // Ana səhifəyə yönləndirir
  };

  useEffect(() => {
    // Dinamik olaraq modalı göstərmək üçün 'success' və ya 'error' tipinə görə stil veririk
  }, [type]);

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type}`}>
        <h2>{translatedMessage}</h2>
        <button className="close-btn" onClick={handleClose}>
          {t("close")}
        </button>
      </div>
    </div>
  );
};

export default ModalMessage;
