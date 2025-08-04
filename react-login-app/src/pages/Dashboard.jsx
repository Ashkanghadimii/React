import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Dashboard() {
  const [test, setTest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/mock-single-test.json").then((res) => {
      setTest(res.data);
    });
  }, []);

  const LogoutButton = () => (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
        style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}
        className="logout-button"
        title="بازگشت به صفحه اصلی"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
      </button>
    </div>
  );

  if (!test) {
    return (
      <div className="dashboard">
        <LogoutButton />
        <h2>داشبورد</h2>
        <p>در حال بارگذاری اطلاعات آزمایش...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <LogoutButton />
      <h2>سامانه جوابدهی آنلاین آزمایش</h2>
      <div className="test-table-container">
        <div style={{ marginBottom: "24px", textAlign: "right" }}>
          <strong className="patient-info">نام بیمار:</strong> {test.patientName} <br />
          <strong className="patient-info">تاریخ آزمایش:</strong> {test.date} <br />
          <strong className="patient-info">نوع آزمایش:</strong> {test.testType}
        </div>
        <div style={{ textAlign: "right" }}>
          <strong>توضیحات:</strong> {test.description}
        </div>

        <div className="blood-section-title">
          Blood Biochemistry Department
        </div>
        <table className="blood-result-table">
          <thead>
            <tr>
              <th>آیتم</th>
              <th>مقدار</th>
              <th>واحد</th>
              <th>محدوده نرمال</th>
            </tr>
          </thead>
          <tbody>
            {test.biochemistry.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.result}</td>
                <td>{item.unit}</td>
                <td>{item.normal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="blood-section-title"
          style={{
            background: "#e53e3e",
            color: "#fff",
            marginTop: 32,
          }}
        >
          Hematology Department
        </div>
        <table className="blood-result-table">
          <thead>
            <tr>
              <th>آیتم</th>
              <th>مقدار</th>
              <th>واحد</th>
              <th>محدوده نرمال</th>
            </tr>
          </thead>
          <tbody>
            {test.hematology.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.result}</td>
                <td>{item.unit}</td>
                <td>{item.normal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "24px" }}>
          <a
            href={test.fileUrlFa}
            className="download-btn"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            دانلود فارسی
          </a>
          <a
            href={test.fileUrlEn}
            className="download-btn"
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: "8px" }}
          >
            دانلود انگلیسی
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
