import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import About from "./about";
import Problem from "./problem";
import Discuss from "./discuss";
import Signup from "./signup";
import Login from "./login";

function Dashboard() {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<About />}></Route>
          <Route path="/problem" element={<Problem />}></Route>
          <Route path="/discuss" element={<Discuss />}></Route>
          <Route path="/auth/signup" element={<Signup />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Dashboard;
