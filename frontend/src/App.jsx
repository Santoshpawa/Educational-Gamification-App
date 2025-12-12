import { Provider } from "react-redux";
import Dashboard from "./components/dashboard";
import { store } from "./app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID ='791827698898-bsgvccppulv1h1c7l7n62ggnv6s5el4n.apps.googleusercontent.com';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <Dashboard></Dashboard>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
