import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/RegisterLogin/Register";
import Login from "./pages/RegisterLogin/Login";
import Project from "./pages/Project/Project";
import Profile from "./pages/Profile/Profile";
import SingleProject from "./pages/SingleProject/SingleProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/project/:id" element={<SingleProject />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
