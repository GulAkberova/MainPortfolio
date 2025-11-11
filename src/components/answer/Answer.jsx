import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { QuestionsContext } from "../../context/QuestionsContext"; // Düzgün idxal
import "./answer.css"; // CSS faylı

function Answer() {
  const { allQuestions, loading } = useContext(QuestionsContext); // Context-dən məlumatları çəkirik

  if (loading) {
    return <div>Loading...</div>; // Yüklənmə vəziyyətində göstərilən mesaj
  }

  console.log(allQuestions, "allQuestionsallQuestionsallQuestions");

  return (
    <section className="home-container">
      <ul className="button-container">
        {Array.isArray(allQuestions) &&
          allQuestions.map((questionSet, idx) => {
            // Burada 'questions' array-ini çıxarırıq
            const questions = questionSet.questions || []; // 'questions' array-i olub olmadığını yoxlayırıq

            return questions.map((q, innerIdx) => {
              if (q.section === "company") {
                return (
                  <Link to={`/answer/form/${q.answers.q1}`} key={`${idx}-${innerIdx}`}>
                    <li className="custom-button agrovita">
                      {q.answers.q1 || "No answer"}
                    </li>
                  </Link>
                );
              }
              return null;
            });
          })}
      </ul>
    </section>
  );
}

export default Answer;
