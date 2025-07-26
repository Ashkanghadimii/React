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
      <h2>داشبورد</h2>
      <div className="test-table-container">
        <table className="test-table">
          <thead>
            <tr>
              <th>نام آزمایش</th>
              <th>تاریخ</th>
              <th>توضیحات</th>
              <th>دانلود</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{test.name}</td>
              <td>{test.date}</td>
              <td>{test.description}</td>
              <td>
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
