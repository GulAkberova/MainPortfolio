import React, { createContext, useContext, useState, useEffect } from "react";
import { db, addDoc, collection, getDocs,updateDoc,getDoc, doc } from "../firebaseConfig";

// Data context
export const QuestionsContext = createContext(null);

export const QuestionsProvider = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [localAllQuestions, setLocalAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "questions")); // "questions" kolleksiyasından məlumatları çəkirik
        const questions = [];
        querySnapshot.forEach((doc) => {
          questions.push(doc.data()); // Hər bir sənəddən məlumatı alırıq
        });
        setAllQuestions(questions); // Məlumatları set edirik
      } catch (error) {
        console.error("Error fetching questions: ", error);
      } finally {
        setLoading(false); // Yüklənmə tamamlandı
      }
    };

    fetchQuestions();
  }, []); // Boş array, bir dəfə yalnız komponentin mount olunmasında işləyəcək












  const handleInputChange = (section, question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: { ...prev[section], [question]: value },
    }));
  };


  const updateQuestion = async (docId, section, questionKey, newValue, setAllQuestions) => {
    try {
      const docRef = doc(db, "questions", docId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedQuestions = data.questions.map((q) => {
          if (q.section === section) {
            return {
              ...q,
              answers: {
                ...q.answers,
                [questionKey]: newValue,
              },
            };
          }
          return q;
        });
  
        await updateDoc(docRef, { questions: updatedQuestions });
  
        setAllQuestions((prev) =>
          prev.map((q) =>
            q.id === docId
              ? { ...q, questions: updatedQuestions }
              : q
          )
        );
  
        console.log("Məlumat uğurla yeniləndi!");
      } else {
        console.error("Sənəd tapılmadı!");
      }
    } catch (error) {
      console.error("Yeniləmə zamanı xəta baş verdi:", error);
    }
  };




  
  const handleAddForm = async (questionsData) => {
    const newQuestions = [];

    Object.keys(questionsData).forEach((sectionKey) => {
      const sectionAnswers = answers[sectionKey] || {};
      const newQuestion = {
        id: new Date().toISOString(),
        section: sectionKey,
        answers: {},
      };

      Object.keys(questionsData[sectionKey]).forEach((questionKey) => {
        newQuestion.answers[questionKey] = sectionAnswers[questionKey] || "";
      });

      newQuestions.push(newQuestion);
    });

    try {
      await addDoc(collection(db, "questions"), {
        questions: newQuestions,
        createdAt: new Date(),
      });

      console.log("Məlumat Firestore-a uğurla əlavə edildi!");

      setLocalAllQuestions((prev) => {
        const updatedLocalQuestions = [...prev, newQuestions];
        localStorage.setItem(
          "local_allQuestions",
          JSON.stringify(updatedLocalQuestions)
        );
        return updatedLocalQuestions;
      });

      setAllQuestions(newQuestions);
      setAnswers({});
    } catch (error) {
      console.error("Firebase xətası:", error);
    }
  };

  return (
    <QuestionsContext.Provider
      value={{
        allQuestions,
        answers,
        setAllQuestions,
        handleInputChange,
        handleAddForm,
        updateQuestion,
        localAllQuestions
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionsContext); // useQuestions hookunu ayrıca ixrac et
