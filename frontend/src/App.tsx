import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import RouteComponent from "./routes/routes";
import { Footer } from "react-day-picker";

function App() {
  return (
    <Provider store={store}>
      <RouteComponent />
      <Footer className="absolute bottom-0" />
    </Provider>
  );
}

export default App;
