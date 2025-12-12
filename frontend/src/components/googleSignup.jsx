import { GoogleLogin } from "@react-oauth/google";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../utils/userSlice.jsx";
export default function GoogleSignup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.user);

  async function handleSuccess(response) {
    const idToken = response.credential;
    try {
      const res = await fetch("http://localhost:3000/user/googleSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      });
      if(res.ok){
        const data = await res.json();
        dispatch(setUser(data.email));
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
