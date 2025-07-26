import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NationalCodeLogin() {
  const [nationalCode, setNationalCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.get("/data.json");
      const users = res.data;
      const matched = users.find((u) => u.nationalCode === nationalCode);
      if (matched) {
        localStorage.setItem("user", JSON.stringify(matched));
        localStorage.setItem("loginMethod", "nationalcode"); // Save login method
        navigate("/otp"); // Go to OTP page
      } else {
        setError("کد ملی نادرست است.");
      }
    } catch {
      setError("خطا در دریافت اطلاعات.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>ورود با کد ملی</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="کد ملی"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "در حال بررسی..." : "ادامه"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default NationalCodeLogin;