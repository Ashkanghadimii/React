import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import OtpPage from "./pages/OtpPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
