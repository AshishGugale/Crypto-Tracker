import "./App.css";
import { Routes, Route  } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditTodo from "./pages/EditTodo";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/home" />
      <Route element={<EditTodo />} path="/edit" />
    </Routes>
  );
}

export default App;
