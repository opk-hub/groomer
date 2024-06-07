import "./index.css";
import React from "react";

function ServiceType({ formValues, setFormValues, isReadOnly }) {
  const handleMahoodChanges = (category) => {
    setFormValues((prevState) => ({ ...prevState, type: category }));
  };
  return (
    <div className="form-group">
      <label className="label ">Services:</label>
      <div
        className="input"
        style={{ display: "flex", flexDirection: "row", gap: "20px" }}
      >
        {/* Buttons for selecting predefined numbers */}
        <button
          type="button"
          value={"male"}
          onClick={() => handleMahoodChanges("male")}
          className={formValues.type === "male" ? "active" : ""}
          disabled={isReadOnly}
        >
          Men
        </button>
        <button
          type="button"
          value={"female"}
          onClick={() => handleMahoodChanges("female")}
          className={formValues.type === "female" ? "active" : ""}
          disabled={isReadOnly}
        >
          Women
        </button>

      </div>
    </div>
  );
}

export default ServiceType;
