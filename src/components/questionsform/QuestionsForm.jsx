import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuestions } from "../../context/QuestionsContext";
import LoadingSpinner from "../../loading/LoadingSpinner"; // Yüklənmə spinneri
import ModalMessage from "../../message/ModalMessage";
import "./questionform.css";

const QuestionsForm = () => {
  const { t } = useTranslation();
  const { handleAddForm, answers, handleInputChange, allQuestions } =
    useQuestions();

  const questionsData = t("questions", { returnObjects: true }) || {};
  const sections = Object.keys(questionsData).map((key) => ({
    key,
    label: t(`sections.${key}`, { defaultValue: key }),
  }));

  const [activeTab, setActiveTab] = useState(
    sections.length > 0 ? sections[0].key : ""
  );
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const [checkboxChecked, setCheckboxChecked] = useState(false); // Checkbox-un vəziyyəti

  useEffect(() => {
    if (allQuestions) {
      setLoading(false);
    }
  }, [allQuestions]);

  const handleAddFormWithModal = async () => {
    try {
      await handleAddForm(questionsData);
      setModalType("success");
      setModalMessage("questionsAdded");
      setShowModal(true);
    } catch (error) {
      setModalType("error");
      setModalMessage("questionsAddError");
      setShowModal(true);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="spinner-container-heigth">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="questionform">
            {sections.map((sec) => (
              <button
                key={sec.key}
                className={activeTab === sec.key ? "active" : ""}
                onClick={() => setActiveTab(sec.key)}
              >
                {sec.label}
              </button>
            ))}
          </div>
          <div className="tab-content-question">
            {questionsData[activeTab] ? (
              Object.keys(questionsData[activeTab]).map((questionKey, idx) => (
                <div key={idx} className="input-group">
                  <label>
                  <div></div>
                    {questionsData[activeTab][questionKey]}
                  </label>

                  <textarea
                    value={answers[activeTab]?.[questionKey] || ""}
                    onChange={(e) =>
                      handleInputChange(activeTab, questionKey, e.target.value)
                    }
                    rows={3}
                    style={{ width: "100%" }}
                  />
                </div>
              ))
            ) : (
              <LoadingSpinner />
            )}
          </div>
        
          <div className="add_questionform">
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={checkboxChecked}
                onChange={() => setCheckboxChecked(!checkboxChecked)} // Checkbox-u dəyiş
              />
              {t("areYouSureAllQuestionsFilled")} {/* Checkbox yanındakı mesaj */}
            </label>
          </div>
            <button
              onClick={handleAddFormWithModal}
              disabled={!checkboxChecked} // Checkbox seçilməyibsə, buttonu deaktiv et
              style={{
                backgroundColor: checkboxChecked ? "#35abab" : "#000", // Aktiv olduğunda yaşıl, deaktiv olduğunda boz
                cursor: checkboxChecked ? "pointer" : "not-allowed", // Aktiv olduğunda pointer, deaktiv olduğunda none
              }}
            >
              {t("addToAllQuestions")}
            </button>
          </div>
        </>
      )}
      {showModal && (
        <ModalMessage
          type={modalType}
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default QuestionsForm;
