import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [billNumber, setBillNumber] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loader

    setTimeout(async () => {
      try {
        const res = await axios.get("/data.json");
        const users = res.data;
        const matched = users.find(
          (u) => u.billNumber === billNumber && u.nationalCode === nationalCode
        );
        if (matched) {
          localStorage.setItem("user", JSON.stringify(matched)); // Save user info
          navigate("/dashboard");
        } else {
          setError("شماره قبض یا کد ملی نادرست است.");
        }
      } catch (error) {
        setError("خطا در دریافت اطلاعات.");
      } finally {
        setLoading(false); // Stop loader
      }
    }, 1000); // 1 seconds delay
  };

  return (
    <div className="form-container">
      <h2>ورود</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="شماره قبض"
          value={billNumber}
          onChange={(e) => setBillNumber(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="کد ملی"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "در حال ورود..." : "ورود"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
