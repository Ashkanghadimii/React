import { useEffect, useState } from "react";
import axios from "axios";

function UserTests() {
  const [tests, setTests] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Simulate fetching tests from a mock API (public/mock-tests.json)
    const fetchTests = async () => {
      try {
        const res = await axios.get("/mock-tests.json");
        // Filter tests for the current user if needed (e.g., by nationalCode)
        // For now, just use all mock tests
        setTests(res.data);
      } catch {
        setTests([]);
      }
    };
    fetchTests();
  }, []);

  return (
    <div className="form-container user-tests-container">
      <h2>آزمایش‌های من</h2>
      {tests.length === 0 ? (
        <p>هیچ آزمایشی ثبت نشده است.</p>
      ) : (
        <ul className="test-list">
          {tests.map((test) => (
            <li key={test.id} className="test-item">
              <span className="test-name">{test.name}</span>
              <span className="test-date">{test.date}</span>
              <a
                href={test.fileUrlFa}
                className="download-btn"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                دانلود به فارسی
              </a>
              <a
                href={test.fileUrlEn}
                className="download-btn"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                دانلود به انگلیسی
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserTests;