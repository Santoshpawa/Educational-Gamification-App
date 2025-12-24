import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import About from "./about";
import Problem from "../components/problem";
import Discuss from "./discuss";
import CodeRunnerPage from "./codeRunnerPage";
import Signup from "./signup";
import Login from "./login";
import Profile from "./profile";

function Dashboard() {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<About />}></Route>
          <Route path="/problem" element={<Problem />}></Route>
          <Route path="/discuss" element={<Discuss />}></Route>
          <Route path="/user/signup" element={<Signup />}></Route>
          <Route path="/user/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/questions/:title" element={<CodeRunnerPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Dashboard;
