import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import OtpPage from "./pages/OtpPage";
import Dashboard from "./pages/Dashboard";
import NationalCodeLogin from "./pages/NationalCodeLogin";
import UserTests from "./pages/UserTests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/nationalcode" element={<NationalCodeLogin />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tests" element={<UserTests />} />
    </Routes>
  );
}

export default App;
