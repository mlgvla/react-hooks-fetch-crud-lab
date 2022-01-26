import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const newQuestionList = questions.filter(
          (question) => question.id !== id
        );
        setQuestions(newQuestionList);
      });
  }

  function handleUpdateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((revisedQuestion) => {
        const revisedQuestions = questions.map((question) => {
          if (question.id === revisedQuestion.id) {
            return revisedQuestion;
          } else {
            return question;
          }
        });
        setQuestions(revisedQuestions);
      });
  }

  const updatedQuestions = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteQuestion={handleDeleteQuestion}
      onUpdateQuestion={handleUpdateQuestion}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{updatedQuestions}</ul>
    </section>
  );
}

export default QuestionList;
