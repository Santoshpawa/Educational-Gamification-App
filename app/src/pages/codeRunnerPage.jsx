import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { VITE_API_URL } from "../utils/backendAPI";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setMessage } from "../utils/userSlice";
import Message from "../components/message";

function CodeRunnerPage() {
  const { title } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("// Loading template...");
  const [results, setResults] = useState([]);
  const { message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // ✅ Fetch question details from backend
  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await fetch(`${VITE_API_URL}/api/questions/${title}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("raw Response:", res);
      const data = await res.json();
      console.log("Response data of question:", data);
      setQuestion(data);
      setCode(data.codeTemplate);
    };
    fetchQuestion();
  }, [title]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [message, dispatch]);

  function runInSandbox(userCode) {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.style.display = "none";
    const iframeWindow = iframe.contentWindow;
    const outputs = [];
    let totalTestCases = question.testCases.length;
    let passedTestCases = 0;
    try {
      iframeWindow.eval(userCode);

      question.testCases.forEach((tc, index) => {
        try {
          let functionCall = `${question.functionName}(${tc.testCase
            .map((arg) => JSON.stringify(arg))
            .join(",")})`;

          let result = iframeWindow.eval(functionCall);
          let passed = JSON.stringify(result) === JSON.stringify(tc.answer);
          if (passed) passedTestCases++;

          outputs.push({
            id: index + 1,
            input: tc.testCase,
            expected: tc.answer,
            got: result,
            status: passed ? "✅ Passed" : "❌ Failed",
          });
        } catch (err) {
          outputs.push({
            id: index + 1,
            error: err.message,
            status: "❌ Runtime Error",
          });
        }
      });
    } catch (err) {
      outputs.push({ error: err.message, status: "❌ Code Error" });
    }
    document.body.removeChild(iframe);
    setResults(outputs);
    if (passedTestCases === totalTestCases) {
      dispatch(setMessage("All test cases passed! 🎉"));
    }
  }

  const handleRunClick = () => {
    runInSandbox(code);
  };

  return (
    <>
      {message && <Message message={message} />}
      <div className="flex flex-row">
        <div style={{ padding: "20px" }} className="w-1/2">
          {question && (
            <>
              <h2>{question.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{question.question}</p>
            </>
          )}
        </div>
        <div className="flex flex-col">
          {/* Code Editor */}
          <div style={{ height: "70vh", width: "50vw", marginTop: "20px" }}>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              theme="vs-dark"
              onChange={(value) => setCode(value || "")}
            />
          </div>

          {/* Run Button */}
          <button
            onClick={handleRunClick}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              marginTop: "10px",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            Run Code
          </button>

          {/* Test Results */}
          <div style={{ marginTop: "20px" }}>
            {results.length > 0 && (
              <>
                <h3>Results:</h3>
                {results.map((r) => (
                  <div
                    key={r.id}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "10px",
                      marginBottom: "10px",
                      background: r.status.includes("Passed")
                        ? "#d4edda"
                        : "#f8d7da",
                    }}
                  >
                    <p>
                      <strong>Test #{r.id}:</strong> {r.status}
                    </p>
                    {r.error ? (
                      <p style={{ color: "red" }}>Error: {r.error}</p>
                    ) : (
                      <>
                        <p>
                          <strong>Input:</strong> {JSON.stringify(r.input)}
                        </p>
                        <p>
                          <strong>Expected:</strong>{" "}
                          {JSON.stringify(r.expected)}
                        </p>
                        <p>
                          <strong>Got:</strong> {JSON.stringify(r.got)}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeRunnerPage;
