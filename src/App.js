import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routers/Router";

function App() {
  return (
    <div className="w-11/12 mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
