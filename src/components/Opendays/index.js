import { useState } from "react";
import "./index.css";

function Opendays() {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDaySelect = (day) => {
    // Check if the day is already selected
    const isDaySelected = selectedDays.includes(day);

    // If it's already selected, remove it from the list
    // Otherwise, add it to the list
    if (isDaySelected) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div className="heading-section ">
      <div className="salon-cat">
        <label className="label">Open days:</label>
        <div className="sa-cart-list">
          <div className="open-days-top-container">
            <p
              className={`salon-cat-item ${
                selectedDays.includes("Monday") ? "selected" : ""
              }`}
              onClick={() => handleDaySelect("Monday")}
            >
              Monday
            </p>
            <p
              className={`salon-cat-item ${
                selectedDays.includes("Tuesday") ? "selected" : ""
              }`}
              onClick={() => handleDaySelect("Tuesday")}
            >
              Tuesday
            </p>
            <p
              className={`salon-cat-item ${
                selectedDays.includes("Wednesday") ? "selected" : ""
              }`}
              onClick={() => handleDaySelect("Wednesday")}
            >
              Wednesday
            </p>
            <p
              className={`salon-cat-item ${
                selectedDays.includes("Thursday") ? "selected" : ""
              }`}
              onClick={() => handleDaySelect("Thursday")}
            >
              Thursday
            </p>
          </div>
          <div className="open-days-bottom-cont">
            <p
              className={`salon-cat-item ${
                selectedDays.includes("Friday") ? "selected" : ""
              }`}
              onClick={() => handleDaySelect("Friday")}
            >
              Friday
            </p>
            <p
              className={`salon-cat-item ${
                selectedDays.includes("Saturday") ? "selected" : ""
              }`}
              onClick={() => handleDaySelect("Saturday")}
            >
              Saturday
            </p>
            <p
              className={`salon-cat-item ${
                selectedDays.includes("Sun") ? "selected" : ""
              }`}
              onClick={() => handleDaySelect("Sun")}
            >
              Sunday
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Opendays;
