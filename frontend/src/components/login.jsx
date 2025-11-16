import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import leetcode from "../assets/leetcode2.jpg";
import { useDispatch, useSelector } from "react-redux";
import {  loginUser } from "../utils/userSlice";
import Spinner from "./spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setMessage(error.message);
    }
  }, [error]);
  const handleLogin = async (e) => {
    e.preventDefault();

    // credentials checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Enter valid email");
      return;
    }

    if (password.length < 6) {
      setMessage("Password should be atleast 6 characters.");
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="w-100 h-auto mx-auto my-12 border-0 shadow-2xl p-4 ">
      <div className="w-full h-28 flex flex-col justify-center items-center">
        <img src={leetcode} alt="leetcode" className="w-14 h-auto " />
        <p className="font-sans font-semibold text-2xl text-gray-400 block">
          cheat-code
        </p>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" w-full mt-1.5 border-2 rounded p-2 border-gray-500 bg-blue-200"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1.5 border-2 rounded p-2 border-gray-500 bg-blue-200"
        />
        <button
          type="submit"
          className="w-full h-10 mt-1.5 text-gray-400 bg-gray-600 cursor-pointer border-0 rounded hover:bg-gray-700"
        >
          {loading ? <Spinner /> : "Login"}
        </button>
      </form>
      <p className="text-sm text-red-500">{message}</p>
      <p className="text-gray-400">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-blue-400 hover:text-blue-700">
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
