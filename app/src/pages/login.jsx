import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import leetcode from "/leetcode2.jpg";
import partition from "/partition.png";
import { useDispatch, useSelector } from "react-redux";
import { setError, clearError, loginUser } from "../utils/userSlice";
import Spinner from "../components/spinner";
import GoogleSignup from "../components/googleSignup";
import Message from "../components/message";
import Error from "../components/error";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [error, dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // credentials checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(setError("Please enter valid details."));
      return;
    }

    if (password.length < 6) {
      dispatch(setError("Please enter valid details."));
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
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
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Link to="/user/signup" className="text-blue-400 hover:text-blue-700">
            Signup
          </Link>
        </p>
        <div>
          <img src={partition} alt="partition" className="m-auto" />
        </div>
        <GoogleSignup />
      </div>
      {error && <Error error={error} />}
    </>
  );
}

export default Login;
