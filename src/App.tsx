import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/RegisterLogin/Register";
import Login from "./pages/RegisterLogin/Login";
import { useDispatch } from "react-redux";
import { getMyProfile } from "./pages/RegisterLogin/RegisterLoginFunctions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProfile = async () => {
      await getMyProfile(dispatch, token);
    };

    getProfile();
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
