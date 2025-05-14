import { Provider } from "react-redux";
import "./App.css";
import RouteComponent from "./routes/routes";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <RouteComponent />
    </Provider>
  );
}

export default App;
