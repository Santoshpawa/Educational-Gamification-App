import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Question() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      let response = await fetch("http://localhost:3000/questions");
      let data = await response.json();
      setQuestions(data);
    };
    fetchQuestions(); 
  }, []);
  return (
    <div>
      <h2>Questions</h2>
      {questions.map((ele) => (
        <h3 key={ele._id}>
            <Link to ={`/questions/${ele.title}`}>{ele.title}</Link>
            </h3>
      ))}
    </div>
  );
}

export default Question;
