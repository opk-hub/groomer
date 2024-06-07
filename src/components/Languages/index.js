import "./index.css";

function Languages({ formValues, setFormValues, isReadOnly }) {
  // Function to handle language checkbox change
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    console.log(selectedLanguage);

    // Update the selected language in the inputs state
    // const updatedLanguages = {
    //   ...inputs.languages,
    //   [selectedLanguage]: !inputs.languages[selectedLanguage],
    // };

    // console.log(selectedLanguage, inputs.languages[selectedLanguage]);
    const updatedInput = {
      ...formValues,
      languages: {
        ...formValues.languages,
        [selectedLanguage]: !formValues.languages[selectedLanguage],
      },
    };

    setFormValues(updatedInput);
  };

  // Log the selected languages (for debugging)
  // console.log(inputs.languages, "languages");
  return (
    <div className="heading-section">
      <label className="label">Languages </label>
      <div className="input-section">
        {" "}
        <div className="languages-container">
          {/* Checkbox for Telugu */}
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                value="telugu"
                checked={formValues.languages["telugu"]}
                onChange={handleLanguageChange}
                disabled={isReadOnly}
              />
              <span className="checkbox-custom"></span>
              Telugu
            </label>
          </div>
          {/* Checkbox for Hindi */}
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                value="hindi"
                checked={formValues.languages["hindi"]}
                onChange={handleLanguageChange}
                disabled={isReadOnly}
              />
              <span className="checkbox-custom"></span>
              Hindi
            </label>
          </div>
          {/* Checkbox for English */}
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                value="english"
                checked={formValues.languages["english"]}
                onChange={handleLanguageChange}
                disabled={isReadOnly}
              />
              <span className="checkbox-custom"></span>
              English
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Languages;
