import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VITE_API_URL } from "../utils/backendAPI";

function Problem() {
  const [questions, setQuestions] = useState([]);
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("in problem");
        let response = await fetch(`${VITE_API_URL}/api/questions`);
        let data = await response.json();
        console.log("Data:", data);
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    // Outer Container: Centered, max width, padding
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header: Large, bold, underlined title */}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-indigo-600 pb-2">
        🎯 Available Problems
      </h2>

      {/* Questions List: Flex layout for better spacing */}
      <div className="space-y-4">
        {questions.map((ele) => (
          // Individual Question Card/Row
          <div
            key={ele._id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-between transition duration-300 ease-in-out"
          >
            <h3 className="text-lg font-semibold w-full">
              {isAuthenticated ? (
                // ✅ ACTIVE LINK STYLES
                <Link
                  to={`/questions/${ele.title}`}
                  className="text-indigo-600 hover:text-indigo-800 hover:underline transition duration-150 block p-1"
                >
                  {ele.title}
                </Link>
              ) : (
                // ❌ DISABLED LINK STYLES
                <span
                  className="text-gray-400 cursor-not-allowed relative group flex items-center justify-between w-full p-1"
                  title="Login to view this question"
                >
                  {/* Title text */}
                  <span className="truncate">{ele.title}</span>

                  {/* Disabled Icon and Tooltip */}
                  <span className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6-6v6m12-6v6m-4-6h.01M16 19h.01M6 19h.01M16 5H8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2z"
                      ></path>
                    </svg>

                    {/* Tooltip message */}
                    <span className="absolute right-full mr-4 px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      🔐 Login first!
                    </span>
                  </span>
                </span>
              )}
            </h3>
          </div>
        ))}
      </div>

      {/* Call to Action for non-logged-in users */}
      {!isAuthenticated && (
        <div className="mt-10 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-inner">
          <p className="font-medium">
            Please log in to unlock all problem links and start coding!
          </p>
        </div>
      )}
    </div>
  );
}

export default Problem;
