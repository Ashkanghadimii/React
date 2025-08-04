import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function UserTests() {
  const [tests, setTests] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get("/mock-tests.json");
        setTests(res.data);
      } catch {
        setTests([]);
      }
    };
    fetchTests();
  }, []);

  return (
    <div className="form-container user-tests-container">
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
