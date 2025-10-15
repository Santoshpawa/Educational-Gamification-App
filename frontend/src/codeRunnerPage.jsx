import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";

function CodeRunnerPage() {
  const { title } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("// Loading template...");
  const [results, setResults] = useState([]);

  // ✅ Fetch question details from backend
  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await fetch(`http://localhost:3000/questions/${title}`);
      const data = await res.json();
      setQuestion(data);
      setCode(data.codeTemplate);
    };
    fetchQuestion();
  }, [title]);

  // ✅ Function to run code inside sandbox
  const runInSandbox = (userCode) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    const iframeWindow = iframe.contentWindow;

    const outputs = [];

    try {
      // 1️⃣ Load user’s code inside sandbox
      iframeWindow.eval(userCode);

      // 2️⃣ For each test case, call the user’s function
      question.testCases.forEach((tc, index) => {
        try {
          const funcCall = `${question.functionName}(${tc.testCase
            .map((arg) => JSON.stringify(arg))
            .join(",")})`;

          const result = iframeWindow.eval(funcCall);

          const passed = JSON.stringify(result) === JSON.stringify(tc.answer);

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
  };

  const handleRunClick = () => {
    runInSandbox(code);
  };

  return (
    <div style={{ padding: "20px" }}>
      {question && (
        <>
          <h2>{question.title}</h2>
          <p style={{ whiteSpace: "pre-line" }}>{question.question}</p>
        </>
      )}

      {/* Code Editor */}
      <div style={{ height: "70vh", marginTop: "20px" }}>
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
                      <strong>Expected:</strong> {JSON.stringify(r.expected)}
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
  );
}

export default CodeRunnerPage;
