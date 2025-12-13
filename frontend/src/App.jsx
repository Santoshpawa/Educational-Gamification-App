import Dashboard from "./components/dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID =
  "791827698898-bsgvccppulv1h1c7l7n62ggnv6s5el4n.apps.googleusercontent.com";

import { useEffect } from "react";
import { baseAPI } from "./utils/backendAPI.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./utils/userSlice.jsx";
import Cookies from "js-cookie";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  },[]);

  async function fetchUser() {
    let response = await fetch(`${baseAPI}/user/refresh`, {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    dispatch(setUser(data.user));
  }
  // useEffect(() => {
  //   if(!user){
  //     dispatch(setUser(Cookies.get("user") || null));
  //   }
  // }, [user,dispatch]);
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Dashboard></Dashboard>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
