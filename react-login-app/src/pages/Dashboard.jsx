import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [test, setTest] = useState(null);

  useEffect(() => {
    axios.get("/mock-single-test.json").then((res) => {
      setTest(res.data);
    });
  }, []);

  if (!test) {
    return (
      <div className="dashboard">
        <h2>داشبورد</h2>
        <p>در حال بارگذاری اطلاعات آزمایش...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>سامانه جوابدهی آنلاین آزمایش</h2>
      <div className="test-table-container">
        <div style={{ marginBottom: "24px", textAlign: "right" }}>
          <strong className="patient-info">نام بیمار:</strong> {test.patientName} <br />
          <strong className="patient-info">تاریخ آزمایش:</strong> {test.date} <br />
          <strong className="patient-info">نوع آزمایش:</strong> {test.testType}
        </div>
        <div style={{ marginBottom: "18px", textAlign: "right" }}>
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
