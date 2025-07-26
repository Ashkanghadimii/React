import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function OtpPage() {
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const navigate = useNavigate();

  // Simulate sending OTP
  const handleSendOtp = () => {
    const generatedOtp = "1234";
    setSentOtp(generatedOtp);
    setError("");
    setSnackbarMsg("کد یکبار مصرف ارسال شد: " + generatedOtp);
    setSnackbarOpen(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (otp === sentOtp && otp !== "") {
      setSnackbarMsg("ورود موفقیت‌آمیز بود!");
      setError("");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000); // Show success for 0.3s before navigating
    } else {
      setError("کد یکبار مصرف اشتباه است.");
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <div className="form-container">
      <h2>تایید کد یکبار مصرف</h2>
      <form onSubmit={handleLogin}>
        <div className="otp-row">
          <input
            className="login-input otp-input"
            type="text"
            placeholder="کد یکبار مصرف"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            type="button"
            className="otp-btn"
            onClick={handleSendOtp}
            tabIndex={-1}
          >
            ارسال کد
          </button>
        </div>
        <button type="submit" className="login-btn">ورود</button>
        {error && <p className="error">{error}</p>}
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default OtpPage;