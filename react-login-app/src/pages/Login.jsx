import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [billNumber, setBillNumber] = useState("");
  const [internetPassword, setInternetPassword] = useState(""); // changed
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.get("/data.json");
        const users = res.data;
        const matched = users.find(
          (u) => u.billNumber === billNumber && u.internetPassword === internetPassword // changed
        );
        if (matched) {
          setSuccess("ورود موفقیت‌آمیز بود!");
          localStorage.setItem("user", JSON.stringify(matched));
          setTimeout(() => {
            navigate("/otp"); // Go to OTP page instead of dashboard
          }, 300);
        } else {
          setError("شماره قبض یا رمز اینترنتی نادرست است."); // changed
        }
      } catch (error) {
        setError("خطا در دریافت اطلاعات.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="form-container">
      <h2>ورود</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="شماره قبض"
          value={billNumber}
          onChange={(e) => setBillNumber(e.target.value)}
          disabled={loading}
        />
        <input
          className="login-input"
          type="text"
          placeholder="رمز اینترنتی"
          value={internetPassword} // changed
          onChange={(e) => setInternetPassword(e.target.value)} // changed
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "در حال ورود..." : "ورود"}
        </button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default Login;
