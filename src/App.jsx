import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [birthDay, setBirthDay] = useState("");
  const inputRef = useRef(null); // Reference to the date input

  const calculateAge = () => {
    if (!birthDate) return;

    const birthDateObj = new Date(birthDate);
    const today = new Date();

    // Calculate age in years, months, and days
    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Get the day of the week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const birthDayOfWeek = daysOfWeek[birthDateObj.getDay()];

    setAge({ years, months, days });
    setBirthDay(birthDayOfWeek);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <div className="card shadow" style={{ width: "500px" }}>
        <div className="card-header bg-primary text-white">
          <h4 className="text-center">Age Calculator</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="birthDate" className="form-label">
              Enter your birth date:
            </label>
            <div className="input-group">
              <span
                className="input-group-text"
                onClick={() => inputRef.current.focus()} // Focus the input when the icon is clicked
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-calendar-event"></i>
              </span>
              <input
                type="date"
                id="birthDate"
                className="form-control"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                ref={inputRef} // Attach the ref to the input
              />
            </div>
          </div>
          <button className="btn btn-success w-100" onClick={calculateAge}>
            Calculate Age
          </button>
          {age && (
            <div className="mt-4 alert alert-info text-center">
              <h5>Your Age</h5>
              <p>
                <strong>{age.years} years</strong>, <strong>{age.months} months</strong>, and{" "}
                <strong>{age.days} days</strong>
              </p>
              <p>You were born on a <strong>{birthDay}</strong>.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
