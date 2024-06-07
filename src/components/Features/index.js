import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import "../App.css";

function Features({ formValues, setFormValues, isReadOnly }) {
  const [newFeature, setNewFeature] = useState("");

  // Function to handle changes in feature selection
  const handleFeatureChange = (event) => {
    const selectedFeature = event.target.value;
    setFormValues((prevInputs) => ({
      ...prevInputs,
      features: {
        ...prevInputs.features,
        [selectedFeature]: !prevInputs.features[selectedFeature],
      },
    }));
  };

  // Function to handle adding a new feature
  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      setFormValues((prevInputs) => ({
        ...prevInputs,
        features: {
          ...prevInputs.features,
          [newFeature]: true,
        },
      }));
      setNewFeature(""); // Clear the input field
    }
  };

  // Function to handle deleting a feature
  const handleDeleteFeature = (feature) => {
    setFormValues((prevInputs) => {
      const updatedFeatures = { ...prevInputs.features };
      delete updatedFeatures[feature];
      return {
        ...prevInputs,
        features: updatedFeatures,
      };
    });
  };

  return (
    <div className="form-group">
      <label className="label">Features:</label>
      <div className="fea-cont">
        <div className="add-feature">
          <input
            style={{ borderRadius: "0" }}
            className="add-feature-input"
            type="text"
            placeholder="Add a feature"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
          />
          <button
            style={{ borderRadius: "0", background: "#ccbb8e" }}
            className="add-feature-button"
            onClick={handleAddFeature}
          >
            Add
          </button>
        </div>
        <div className="input feature-items">
          {Object.keys(formValues.features).map(
            (feature) =>
              feature !== "wifi" &&
              feature !== "parking" &&
              feature !== "AC" && (
                <div key={feature} className="feature-item">
                  <span>{feature}</span>
                  <button
                    style={{ background: "none" }}
                    onClick={() => handleDeleteFeature(feature)}
                    disabled={isReadOnly}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Features;
