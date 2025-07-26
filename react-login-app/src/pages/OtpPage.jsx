import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const OTP_VALID_SECONDS = 60; // 1 minute

function OtpPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef();

  // Helper to get OTP data from localStorage
  const getOtpData = () => {
    const data = localStorage.getItem("otpData");
    return data ? JSON.parse(data) : null;
  };

  // Send OTP and store with expiration
  const handleSendOtp = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate random 4-digit OTP
    const expiresAt = Date.now() + OTP_VALID_SECONDS * 1000;
    localStorage.setItem(
      "otpData",
      JSON.stringify({ otp: generatedOtp, expiresAt })
    );
    setSnackbarMsg("کد یکبار مصرف ارسال شد: " + generatedOtp);
    setSnackbarOpen(true);
    setError("");
    setTimeLeft(OTP_VALID_SECONDS);
  };

  // On mount, check for existing OTP
  useEffect(() => {
    const otpData = getOtpData();
    if (otpData && otpData.expiresAt > Date.now()) {
      setTimeLeft(Math.floor((otpData.expiresAt - Date.now()) / 1000));
    }
  }, []);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timeLeft]);

  const handleLogin = (e) => {
    e.preventDefault();
    const otpData = getOtpData();
    if (!otpData) {
      setError("ابتدا کد یکبار مصرف را دریافت کنید.");
      return;
    }
    if (otpData.expiresAt < Date.now()) {
      setError("کد منقضی شده است. لطفا دوباره ارسال کنید.");
      return;
    }
    if (otp === otpData.otp && otp !== "") {
      setSnackbarMsg("ورود موفقیت‌آمیز بود!");
      setError("");
      setSnackbarOpen(true);
      setTimeout(() => {
        localStorage.removeItem("otpData");
        // Check login method and navigate accordingly
        const loginMethod = localStorage.getItem("loginMethod");
        if (loginMethod === "nationalcode") {
          navigate("/tests");
        } else {
          navigate("/dashboard");
        }
      }, 1000); // or your preferred delay
    } else {
      setError("کد یکبار مصرف اشتباه است.");
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  // Format timer as mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
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
            disabled={timeLeft > 0}
          >
            ارسال کد
          </button>
        </div>
        {timeLeft > 0 && (
          <div className="otp-timer">
            زمان باقی‌مانده: {formatTime(timeLeft)}
          </div>
        )}
        <button type="submit" className="login-btn">
          ورود
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Show for 6 seconds
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