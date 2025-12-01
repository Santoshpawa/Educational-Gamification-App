import { useEffect, useState } from "react";
import { baseAPI } from "../utils/backendAPI";
import { useSelector } from "react-redux";

// --- START: Component Logic (Unchanged) ---
function Discuss() {
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [topicClicked, setTopicClicked] = useState(null);
  const [thread, setThread] = useState("");
  const [threads, setThreads] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchDiscussion();
  }, []);

  async function fetchDiscussion() {
    try {
      let response = await fetch(`${baseAPI}/discuss`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Fetch discussion Response status:", response.status);
        return;
      }
      console.log("Discussion response: ", response);
      let { titles, message } = await response.json();
      console.log("Titles:", titles);
      console.log("Messages:", message);
      setTopics(titles);
    } catch (error) {
      console.log("Error in fetching discussion:", error);
    }
  }

  async function addDiscussion() {
    if (!user) {
      alert("Login to post.");
      return;
    }
    try {
      let res = await fetch(`${baseAPI}/discuss`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, email: user.email }), // Assuming you need to send email
        credentials: "include",
      });
      if (!res.ok) {
        console.log("add discussion Response status:", res.status);
        return;
      }
      console.log("raw response:", res);
      setTitle("");
      fetchDiscussion(); // Refresh the list after sending
    } catch (error) {
      console.log("Error in adding discussion:", error);
    }
  }

  async function fetchThreads(id) {
    setTopicClicked(id);
    try {
      let response = await fetch(`${baseAPI}/discuss/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Fetching threads Response status:", response.status);
        return;
      }
      let { threadsFromServer } = await response.json();
      setThreads(threadsFromServer);
    } catch (error) {
      console.log("Error in fetching threads:", error);
    }
  }

  // --- CORRECTION: ensure ID is used to fetch the current topic's threads
  async function addThread(topicId) {
    if (!user) {
      alert("Login to contribute a thread.");
      return;
    }
    try {
      let response = await fetch(`${baseAPI}/discuss/${topicId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: thread, email: user.email }),
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Response status of adding thread:", response.status);
        return;
      }
      // Refresh threads for the currently clicked topic
      await fetchThreads(topicId);

      setThread("");
    } catch (error) {
      console.log("Error in adding thread:", error);
    }
  }
  // --- END: Component Logic ---

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
          Discussion Board 💬
        </h2>
        <p className="text-xl text-gray-500">Needle and Thread</p>
      </div>

      {/* MAIN LAYOUT: Two Columns (New Topic | Topics List) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMN 1: NEW TOPIC */}
        <div className="lg:col-span-1 p-6 bg-white rounded-xl shadow-lg h-fit sticky top-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Start a New Topic
          </h3>
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none h-32"
              placeholder="What new topic would you like to discuss?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <button
              onClick={addDiscussion}
              disabled={!title.trim()}
              className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition duration-150"
            >
              Post Topic
            </button>
          </div>
        </div>

        {/* COLUMN 2: TOPICS LIST & THREADS */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Active Topics
          </h3>
          {topics.map((ele, idx) => {
            const isActive = topicClicked === ele._id;
            return (
              <div
                key={ele._id || idx} // Use _id for a stable key
                onClick={() => fetchThreads(ele._id)}
                className={`p-5 bg-white rounded-xl shadow-md border-l-4 cursor-pointer transition duration-200 ${
                  isActive
                    ? "border-indigo-500 shadow-xl"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                {/* Topic Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    {ele.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Posted by: {ele.email || "N/A"}
                  </p>
                </div>

                {/* Conditional Threads and Reply Section */}
                {isActive && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                    <h4 className="text-lg font-semibold text-indigo-600 mb-3">
                      Threads
                    </h4>
                    {/* Threads List */}
                    <div className="max-h-96 overflow-y-auto pr-2 space-y-3">
                      {threads.length === 0 ? (
                        <p className="text-gray-500 italic">
                          No replies yet. Be the first!
                        </p>
                      ) : (
                        threads.map((t, index) => (
                          <div
                            key={t._id || index} // Use unique thread ID if available
                            className="p-3 bg-indigo-50 rounded-lg shadow-sm"
                          >
                            <p className="text-gray-800">{t.text}</p>
                            <p className="text-xs text-indigo-400 mt-1">
                              — {t.email}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Reply Area */}
                    {user && (
                      <div className="pt-3 border-t mt-4">
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded-lg resize-none mb-2 focus:ring-indigo-500"
                          placeholder="Write your reply..."
                          value={thread}
                          onChange={(e) => setThread(e.target.value)}
                        ></textarea>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the main div click event
                            addThread(ele._id);
                          }}
                          disabled={!thread.trim()}
                          className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 transition duration-150"
                        >
                          Add Thread
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Discuss;
