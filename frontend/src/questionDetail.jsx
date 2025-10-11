import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function QuestionDetail() {
  const [question, setQuestion] = useState({});
  useEffect(() => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    async function getQuestion() {
      let response = await fetch(`http://localhost:3000/questions/${id}`);
      let data = await response.json();
      setQuestion(data);
    }
    getQuestion();
  });

  return (
  <div>
    {question.question}
  </div>);
}

export default QuestionDetail;
