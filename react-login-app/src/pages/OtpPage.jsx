import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

const OTP_VALID_SECONDS = 60; // 1 minute

function OtpPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [modalOpen, setModalOpen] = useState(false); // State for modal
  const navigate = useNavigate();
  const timerRef = useRef();

  // Helper to get OTP data from localStorage
  const getOtpData = () => {
    const data = localStorage.getItem("otpData");
    return data ? JSON.parse(data) : null;
  };

  // Send OTP and store with expiration
  const handleSendOtp = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
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
      const loginMethod = localStorage.getItem("loginMethod");
      if (loginMethod === "login") {
        setModalOpen(true); // Open modal only for login method
      } else {
        localStorage.removeItem("otpData");
        navigate("/tests"); // Direct navigation for nationalcode
      }
    } else {
      setError("کد یکبار مصرف اشتباه است.");
    }
  };

  const handleViewResults = () => {
    setModalOpen(false);
    localStorage.removeItem("otpData");
    navigate("/dashboard");
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await axios.get("/mock-single-test.json");
      const test = response.data;
      if (test.fileUrlFa) {
        const link = document.createElement("a");
        link.href = test.fileUrlFa;
        link.download = "test_result_fa.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setError("لینک دانلود در دسترس نیست.");
        setSnackbarMsg("لینک دانلود در دسترس نیست.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setError("خطا در دریافت اطلاعات دانلود.");
      setSnackbarMsg("خطا در دریافت اطلاعات دانلود.");
      setSnackbarOpen(true);
    }
    setModalOpen(false);
    localStorage.removeItem("otpData");
    navigate("/"); // Navigate to the main page after download
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

  // Modal style
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 280,
    bgcolor: "var(--color-secondary)",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    p: 4,
    textAlign: "center",
    fontFamily: "'BYekan', sans-serif",
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
            type="SendOTPButton"
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
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            گزینه‌های جواب آزمایش
          </Typography>
          <Button
            onClick={handleViewResults}
            sx={{
              bgcolor: "var(--color-buttons)",
              color: "var(--color-texts)",
              fontWeight: "bold",
              fontFamily: "'BYekan', sans-serif",
              mb: 2,
              width: "100%",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#27675E", color: "whitesmoke" },
            }}
          >
            مشاهده جواب آزمایش
          </Button>
          <Button
            onClick={handleDownloadPdf}
            sx={{
              bgcolor: "var(--color-buttons)",
              color: "var(--color-texts)",
              fontWeight: "bold",
              fontFamily: "'BYekan', sans-serif",
              width: "100%",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#27675E", color: "whitesmoke" },
            }}
          >
            دانلود جواب به صورت پی دی اف
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default OtpPage;