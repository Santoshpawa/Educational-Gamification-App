import { Provider } from "react-redux";
import Dashboard from "./components/dashboard";
import { store } from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Dashboard></Dashboard>
      </Provider>
    </>
  );
}

export default App;
