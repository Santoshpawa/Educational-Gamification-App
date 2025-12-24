import Dashboard from "./pages/dashboard.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID =
  "791827698898-bsgvccppulv1h1c7l7n62ggnv6s5el4n.apps.googleusercontent.com";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./utils/userSlice.jsx";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      let userFromStorage = localStorage.getItem("user");
      let pictureFromStorage = localStorage.getItem("picture");
      if (userFromStorage && pictureFromStorage) {
        dispatch(setUser({ user: userFromStorage, picture: pictureFromStorage }));
      }
    }
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Dashboard></Dashboard>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
