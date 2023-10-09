import React, { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

function AgeCalculatorForm() {
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [ageResult, setAgeResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setAgeResult(null);

    if (!formData.day || !formData.month || !formData.year) {
      setError("All fields must be filled out");
      return;
    }

    const day = parseInt(formData.day);
    if (isNaN(day) || day < 1 || day > 31) {
      setError("Day should be between 1 and 31");
      return;
    }

    const month = parseInt(formData.month);
    if (isNaN(month) || month < 1 || month > 12) {
      setError("Month should be between 1 and 12");
      return;
    }

    const year = parseInt(formData.year);
    let isLeapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1000 || year > currentYear) {
      setError(`Year should be between 1000 and ${currentYear}`);
      return;
    }

    if (
      (month === 4 || month === 6 || month === 9 || month === 11) &&
      day > 30
    ) {
      setError("April, June, September, and November have 30 days");
      return;
    }

    if ( isLeapYear &&
      (month === 2 &&
        day > 29 )
    ) {
      setError("February has 29 days in leap years");
      return;
    }

    if (!isLeapYear && month === 2) {
      if (day > 28) {
        setError("February has 28 days in non-leap years");
        return;
      }
    }

    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);
    const ageInMilliseconds = currentDate - birthDate;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;

    const years = Math.floor(ageInDays / 365);
    const months = Math.floor((ageInDays % 365) / 30);
    const days = Math.floor(ageInDays % 30);

    setAgeResult({ years, months, days });
    setError("");
  };

  return (
    <div className="center-container">
      <div className="outer-container">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h3 className="form-title">DAY</h3>
              <input
                inputMode="number"
                placeholder="Day"
                value={formData.day}
                className="submit-form"
                onChange={(e) =>
                  setFormData({ ...formData, day: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <h3 className="form-title">MONTH</h3>
              <input
                inputMode="number"
                placeholder="Month"
                value={formData.month}
                className="submit-form"
                onChange={(e) =>
                  setFormData({ ...formData, month: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <h3 className="form-title">YEAR</h3>
              <input
                inputMode="number"
                placeholder="Year"
                value={formData.year}
                className="submit-form"
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
              />
            </div>
            <div className="form-group1">
              <button type="submit" className="submit-button">
                <AiOutlineArrowDown />
              </button>
            </div>
          </form>
          {ageResult && (
            <div>
              <p>
                <span className="age-years">{ageResult.years}</span>
                <span className="years-text"> Years</span>
              </p>
              <p>
                <span className="age-years">{ageResult.months}</span>
                <span className="years-text"> Months</span>
              </p>
              <p>
                <span className="age-years">{ageResult.days}</span>
                <span className="years-text"> Days</span>
              </p>
            </div>
          )}
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default AgeCalculatorForm;
