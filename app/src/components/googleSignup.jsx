import { GoogleLogin } from "@react-oauth/google";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../utils/userSlice.jsx";
import { VITE_API_URL } from "../utils/backendAPI.js";
export default function GoogleSignup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.user);

  async function handleSuccess(response) {
    const idToken = response.credential;
    try {
      const res = await fetch(`${VITE_API_URL}/api/user/googleSignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      });
      if(res.ok){
        const data = await res.json();
        const { token, user, picture } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        localStorage.setItem("picture", picture);
        dispatch(setUser({ user, picture }));
        console.log("User after Google signup/login: ", user);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during Google signup:", error);
    }
  }
  return (
    <>
      <div>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </>
  );
}
