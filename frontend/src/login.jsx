import { useState } from "react";
import {useNavigate} from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate("");
  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let data = await response.json();
      setMessage(data.msg);
      if(response.ok){
        setTimeout(()=>{
          navigate("/");
        },1000);
      }
    } catch (error) {
      setMessage("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Login</button>
      <p>{message}</p>
          <p>Don't have an account? <a href="/auth/signup">Signup</a></p>
    </div>
  );
}

export default Login;
