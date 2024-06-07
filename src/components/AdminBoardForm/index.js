import React, { useState, useEffect } from "react";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "../../Middlewares/Alertpop";
import { useNavigate } from "react-router-dom";
import Context, { getToken, removeToken } from "../../Context/Context";
import Languages from "../Languages";
import MoreOption from "../MoreOptions";
import Header from "../Header";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Photos from "../CoverImage";
import OwnerPhotosUpload from "../OwnerPhotosUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import "./index.css";
import Opendays from "../Opendays";

const AdminBoardForm = (props) => {
  const uuid = Cookies.get("uuid");

  // const [time, setTime] = useState("7:00 AM");
  const [selectedGender, setSelectedGender] = useState("");

  const incrementTime = (field) => {
    let [timePart, period] = formValues[field].split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (hours === 11 && period === "AM") {
      hours = 12;
      period = "PM";
    } else if (hours === 11 && period === "PM") {
      hours = 12;
      period = "AM";
    } else if (hours === 12) {
      hours = 1;
    } else {
      hours++;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: `${hours}:${minutes.toString().padStart(2, "0")} ${period}`,
    }));
  };

  const decrementTime = (field) => {
    let [timePart, period] = formValues[field].split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (hours === 12 && period === "PM") {
      hours = 11;
      period = "AM";
    } else if (hours === 12 && period === "AM") {
      hours = 11;
      period = "PM";
    } else if (hours === 1) {
      hours = 12;
    } else {
      hours--;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: `${hours}:${minutes.toString().padStart(2, "0")} ${period}`,
    }));
  };

  const DataSalon = props.Salondata?.one;
  const SalonLocation =
    DataSalon?.["salon_location"]?.["coordinates"].join(", ");

  const [formValues, setFormValues] = useState({
    username: DataSalon?.salon_username || "user name",
    password: DataSalon?.salon_password || "password",
    code: DataSalon?.["salon_code"] || "",
    name: DataSalon?.["salon_name"] || "",
    email: DataSalon?.["salon_email"] || "",
    description: "",
    type: DataSalon?.["salon_type"] || "male",
    address: DataSalon?.["salon_address"] || "",
    area: DataSalon?.["salon_area"] || "",
    city: DataSalon?.["salon_city"] || "",
    state: DataSalon?.["salon_state"] || "",
    location: SalonLocation || "",
    slots_number: parseInt(DataSalon?.["salon_slots"]) || 3,
    opening_time: DataSalon?.["salon_opening_time"] || "7:00 AM",
    closing_time: DataSalon?.["salon_closing_time"] || "6:00 PM",
    lunch_start_time: DataSalon?.["salon_lunch_start_time"] || "1:00 PM",
    lunch_end_time: DataSalon?.["salon_lunch_end_time"] || "1:30 PM",
    owner_name: DataSalon?.["salon_owner_name"] || "sumanth vartha",
    owner_mobile: DataSalon?.["salon_owner_mobile"] || "9876543210",
    owner_pancard_number:
      DataSalon?.["salon_owner_pancard_number"] || "234WERT092",
    bank_name: DataSalon?.["salon_bank_name"] || "state bank of india",
    bank_account_number:
      DataSalon?.["salon_bank_account_number"] || "3221655498746623",
    bank_IFSC_code: DataSalon?.["salon_bank_IFSC_code"] || "SBIN0001234",
    features: {
      wifi: DataSalon?.["salon_features"]?.["feature_wifi"] || true,
      parking: DataSalon?.["salon_features"]?.["feature_parking"] || false,
      AC: DataSalon?.["salon_features"]?.["feature_AC"] || true,
    },
    languages: {
      hindi: DataSalon?.["salon_languages"]?.["language_hindi"] || true,
      english: DataSalon?.["salon_languages"]?.["language_english"] || false,
      telugu: DataSalon?.["salon_languages"]?.["language_telugu"] || true,
    },
    photos: [],
  });
  const navigate = useNavigate();
  const [isReadOnly, setIsReadOnly] = useState(props.isReadOnly);
  let { Salondata } = props;
  const [newFeature, setNewFeature] = useState("");
  const [service, setServices] = useState(Salondata?.servicesRev || []);
  const [shouldUpload, setshouldUpload] = useState(true);

  const [uploadedPhotos, setUploadedPhotos] = useState(
    DataSalon?.["salon_photos"] || []
  );
  const [shouldUploadOwner, setshouldUploadOwner] = useState(true);
  const [uploadedPhotosOwner, setUploadedPhotosOwner] = useState(
    DataSalon?.["salon_photos"] || []
  );
  const [isActive, setisActive] = useState(DataSalon?.["salon_isActive"]);
  const [serviceCount, setServiceCount] = useState(
    DataSalon?.["salon_services"]?.length || 1
  );
  const [day] = useState("");
  const [blockSalon, setblockSalon] = useState(
    DataSalon?.["salon_block_dates"] || []
  );
  const [comboCount] = useState(1);
  const [comboservicecount] = useState(2);
  const [combos, setCombos] = useState(Salondata?.combosRev || []);

  const [readsalonCode] = useState(false);
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    console.log(gender);
  };

  useEffect(() => {
    if (!DataSalon) {
      const initialServices = Array.from({ length: serviceCount }, () => ({
        name: "",
        discount: "",
        price: "",
        duration: "",
      }));
      setServices(initialServices);
    }
  }, [serviceCount, DataSalon]);

  useEffect(() => {
    if (!DataSalon) {
      const initialCombos = Array.from({ length: comboCount }, () => ({
        combo_name: `Combo ${comboCount}`,
        services: Array.from({ length: comboservicecount }, () => ""),
        combo_price: "",
        duration: "",
      }));
      setCombos(initialCombos);
    }
  }, [comboCount, DataSalon, comboservicecount]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleTypeSelection = (selectedType) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      type: selectedType,
    }));
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const newServices = service.map((service, i) => {
      if (i === index) {
        return { ...service, [name]: value };
      }
      return service;
    });
    setServices(newServices);
  };

  const addService = () => {
    setServices([
      ...service,
      { name: "", discount: "", price: "", duration: "" },
    ]);
  };

  const removeService = (index) => {
    const newServices = service.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleComboChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCombos = [...combos];
    if (name === "services") {
      updatedCombos[index][name] = value.split(",");
    } else {
      updatedCombos[index][name] = value;
    }
    setCombos(updatedCombos);
  };

  const addComboService = () => {
    setCombos([
      ...combos,
      { combo_name: "", services: [], combo_price: "", duration: "" },
    ]);
  };

  const removeComboService = (index) => {
    const updatedCombos = combos.filter((_, i) => i !== index);
    setCombos(updatedCombos);
  };

  const handleFeatureToggle = (feature) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      features: {
        ...prevValues.features,
        [feature]: !prevValues.features[feature],
      },
    }));
  };

  const handleDeleteFeature = (feature) => {
    setFormValues((prevValues) => {
      const updatedFeatures = { ...prevValues.features };
      delete updatedFeatures[feature];
      return { ...prevValues, features: updatedFeatures };
    });
    console.log(feature);
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      setFormValues((prevValues) => ({
        ...prevValues,
        features: {
          ...prevValues.features,
          [newFeature]: true,
        },
      }));
      setNewFeature("");
    }
    console.log(newFeature);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = service.filter(
      (service) =>
        service.name !== "" &&
        service.discount !== "" &&
        service.price !== "" &&
        service.duration !== ""
    );

    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      if (key === "photos") {
        Array.from(formValues[key]).forEach((photo) => {
          formData.append("photos", photo);
        });
      } else if (key === "features") {
        formData.append("features", JSON.stringify(formValues[key]));
      } else if (key === "languages") {
        formData.append("languages", JSON.stringify(formValues[key]));
      } else {
        formData.append(key, formValues[key]);
      }
    });

    formData.append("service", JSON.stringify(allFieldsFilled));
    formData.append("combo_service", JSON.stringify(combos));
    formData.append("uuid", uuid);
    formData.append("block_dates", JSON.stringify(blockSalon));
    formData.append("should_update_image", shouldUpload ? "true" : "false");

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${getToken()}`,
    };

    if (DataSalon) {
      try {
        const response = await fetch(`${Context}/admin/salon/update`, {
          method: "PATCH",
          body: formData,
          headers: headersList,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error updating salon:", errorData);
          ToastError(errorData.message);
          return;
        }

        const data = await response.json();
        if (data.code === 202) {
          Salondata = null;
          setIsReadOnly(true);
          ToastSuccess("Salon updated successfully!");
          alert("Salon updated successfully!");
          console.log(data);
        } else {
          ToastError(data.message);
        }
      } catch (error) {
        console.error("Error updating salon:", error);
        ToastError("An error occurred while updating the salon.");
      }
    } else {
      try {
        const response = await fetch(`${Context}/admin/add-new-salon`, {
          method: "POST",
          body: formData,
          headers: headersList,
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error adding salon:", errorData);
          ToastError(errorData.message);
          return;
        }

        const data = await response.json();
        let code = data.code;
        if (code === 500 || code === 406) {
          ToastError(data.message);
          return;
        }
        if (code === 401) {
          removeToken();
          navigate("/");
          ToastError(data.message);
          return;
        }

        ToastSuccess("Salon added successfully!");
        alert("Salon added successfully!");
      } catch (error) {
        console.error("Error adding salon:", error);
        ToastError("An error occurred while adding the salon.");
      }
    }
  };

  return (
    <div className="main-bg-container">
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: isReadOnly ? "" : "end",
          width: "440px",
        }}
      >
        {isReadOnly && (
          <button
            onClick={() => setIsReadOnly(false)}
            className="label"
            style={{
              textAlign: "center",
              background: "#CCBB8E",
              fontWeight: "bold",
              marginBottom: "30px",
              fontSize: "17px",
              marginLeft: "300px",
              padding: "10px",
            }}
          >
            Enable Edit
          </button>
        )}
        {!isReadOnly && props.search && (
          <MoreOption
            salonCode={formValues.code}
            isActive={isActive}
            setisActive={setisActive}
          />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="top-cont">
          <div>
            <h4 className="heading-section">Salon Details</h4>
            <div className="heading-section">
              <label className="label">Salon code :</label>
              <div className="input-section">
                <input
                  style={{ width: "150px", color: "#5b5441", height: "50px" }}
                  name="code"
                  type="text"
                  placeholder="Enter the salon code"
                  value={formValues.code}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly ? isReadOnly : readsalonCode}
                  disabled={readsalonCode}
                  autoComplete="false"
                />
              </div>
            </div>

            {/* salon name */}
            <div className="heading-section">
              <label className="label">Salon name :</label>
              <div className="input-section">
                <input
                  style={{ width: "455px", height: "40px", color: "#5b5441" }}
                  name="name"
                  type="text"
                  placeholder="Enter the name of the salon"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                  isReadOnly={isReadOnly}
                />
              </div>
            </div>
            {/*Adress  */}
            <div>
              <div className="heading-section">
                <label className="label">Salon Adress :</label>
                <textarea
                  style={{
                    width: "455px",
                    height: "100px",
                    color: "#5b5441",
                    background: "black",
                    border: "1px solid #5B5441",
                  }}
                  name="address"
                  type="text"
                  placeholder="Enter the address of salon"
                  value={formValues.address}
                  onChange={handleChange}
                  required
                  isReadOnly={isReadOnly}
                ></textarea>
              </div>
            </div>

            {/* Salon-email section */}
            <div className="heading-section">
              <label className="label">Email :</label>
              <div className="input-section">
                <input
                  style={{ width: "455px", height: "40px", color: "#5b5441" }}
                  name="email"
                  type="email"
                  placeholder="Enter the mail-id"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/* salon category section */}

            <div className="heading-section " readOnly={isReadOnly}>
              <label className="label ">Category :</label>

              <div>
                <span
                  style={{
                    padding: "5px",
                    border: "0.3px solid #5B5441",
                    // color: '#5b5441'

                    backgroundColor:
                      formValues.type === "unisex" ? "#5B5441" : "transparent",

                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onClick={() => handleTypeSelection("unisex")}
                >
                  Unisex
                </span>
                <span
                  style={{
                    padding: "5px",
                    border: "0.3px solid #5B5441",
                    // color: '#5b5441'

                    backgroundColor:
                      formValues.type === "men's salon"
                        ? "#5B5441"
                        : "transparent",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onClick={() => handleTypeSelection("men's salon")}
                >
                  Men's Salon
                </span>
                <span
                  style={{
                    padding: "5px",
                    border: "0.3px solid #5B5441",

                    backgroundColor:
                      formValues.type === "beauty parlor"
                        ? "#5B5441"
                        : "transparent",
                    marginRight: "8px",
                  }}
                  onClick={() => handleTypeSelection("beauty parlor")}
                >
                  Beauty Parlor
                </span>
              </div>
            </div>
            {/* salon slot number section */}

            <div className="heading-section">
              <label className="label">Number of slots :</label>
              <div className="input-section">
                <input
                  style={{ width: "130px", height: "40px" }}
                  name="slots_number"
                  type="text"
                  placeholder="Enter a number"
                  value={formValues.slots_number}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*open days  */}

            <Opendays readOnly={isReadOnly} />
          </div>

          {/* owner deatails */}
          <div className="owner-section">
            <h3 className="credit">Crediential</h3>
            <div className="heading-section-creadentials">
              <div className="label-cre">
                <label>Username :</label>
              </div>
              <div className="input-section-creadentials">
                <input
                  style={{
                    background: "none",
                    border: "none",
                    padding: "none",
                    margin: "none",
                  }}
                  name="username"
                  type="text"
                  value={formValues.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/*  */}

            <div className="heading-section-creadentials">
              <div className="label-cre">
                <label>Password :</label>
              </div>{" "}
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>
            {/*  */}
            <h3 className="credit">Owner Details</h3>

            <div className="heading-section-creadentials">
              <div className="label-cre">
                <label>Owner Name :</label>
              </div>{" "}
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="owner_name"
                  type="text"
                  value={formValues.owner_name}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*  */}

            <div className="heading-section-creadentials">
              <div className="label-cre">
                <label>Mobile number :</label>
              </div>{" "}
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="owner_mobile"
                  type="text"
                  value={formValues.owner_mobile}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*  */}
            <div className="heading-section-creadentials">
              <div className="label-cre">
                <label>Bank name :</label>
              </div>{" "}
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="bank_name"
                  type="text"
                  value={formValues.bank_name}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*  */}

            <div className="heading-section-creadentials">
              <div className="label-cre">
                <label>Account number :</label>
              </div>{" "}
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="bank_account_number"
                  type="text"
                  value={formValues.bank_account_number}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*  */}
            <div className="heading-section-creadentials">
              <div className="label-cre">
                <label>IFSC Code :</label>
              </div>{" "}
              <div className="input-section-creadentials">
                <input
                  style={{ background: "none", border: "none" }}
                  name="bank_IFSC_code"
                  type="text"
                  value={formValues.bank_IFSC_code}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/*  */}

            <div className="heading-section-creadentials">
              <div className="label-cre">
                <label>Pan Number :</label>
              </div>{" "}
              <div className="input-section-creadentials">
                <input
                  style={{
                    background: "none",
                    border: "none",
                    marginLeft: "20px",
                  }}
                  name="owner_pancard_number"
                  type="text"
                  value={formValues.owner_pancard_number}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            <div className="heading-section-creadentials">
              {props.search && (
                <div className="">
                  <div
                    className="label"
                    style={{
                      textDecoration: "underline",
                      fontWeight: "bold",
                      marginBottom: "30px",
                      fontSize: "20px",
                      marginTop: "20px",
                    }}
                  >
                    Block Salon:
                  </div>
                  <div
                    className="input"
                    style={{ marginTop: "40px", marginBottom: "40px" }}
                  >
                    <input
                      style={{
                        border: "1px solid #ccbb8e",
                        height: "30px",
                        width: "200px",
                      }}
                      name="newDate"
                      type="date"
                      value={blockSalon}
                      onChange={(e) => setblockSalon(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      border: "1px solid #ccbb8e",
                      width: "200px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <input type="time" style={{ border: "none" }} />
                    <AccessTimeIcon />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="heading-section">
          <label className="label">Timings :</label>
          <div className="input-section ">
            <div className="time-section-cont">
              <div className="time-section">
                <label className="label-input-time">Opening Time :</label>
                <div className="time-input-cont">
                  <input
                    style={{
                      border: "none",
                    }}
                    name="opening_time"
                    type="text"
                    placeholder="Time"
                    value={formValues.opening_time}
                    onChange={handleChange}
                    required
                    readOnly={isReadOnly}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      className="arrow-button"
                      onClick={() => incrementTime("opening_time")}
                    >
                      <KeyboardArrowUpIcon fontSize="small" />
                    </div>
                    <div
                      className="arrow-button"
                      onClick={() => decrementTime("opening_time")}
                    >
                      <KeyboardArrowDownIcon
                        fontSize="small"
                        marginBottom="none"
                        marginTop="0px"
                        paddingTop="0px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="time-section">
                <label className="label-input-time">Closing Time :</label>
                <div className="time-input-cont">
                  <input
                    style={{
                      border: "none",
                    }}
                    name="closing_time"
                    type="text"
                    placeholder="closing-time"
                    value={formValues.closing_time}
                    onChange={handleChange}
                    required
                    readOnly={isReadOnly}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      className="arrow-button"
                      onClick={() => incrementTime("closing_time")}
                    >
                      <KeyboardArrowUpIcon fontSize="small" />
                    </div>
                    <div
                      className="arrow-button"
                      onClick={() => decrementTime("closing_time")}
                    >
                      <KeyboardArrowDownIcon
                        fontSize="small"
                        marginBottom="none"
                        marginTop="0px"
                        paddingTop="0px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="heading-section">
          <label className="label">Lunch Timings :</label>

          <div className="input-section">
            <div className="time-section-cont">
              <div className="time-section">
                <label className="label-input-time">Lunch Start Time :</label>
                <div className="time-input-cont">
                  <input
                    style={{
                      border: "none",
                    }}
                    name="lunch_start_time"
                    type="text"
                    placeholder="start Time"
                    value={formValues.lunch_start_time}
                    onChange={handleChange}
                    required
                    readOnly={isReadOnly}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      className="arrow-button"
                      onClick={() => incrementTime("lunch_start_time")}
                    >
                      <KeyboardArrowUpIcon fontSize="small" />
                    </div>
                    <div
                      className="arrow-button"
                      onClick={() => decrementTime("lunch_start_time")}
                    >
                      <KeyboardArrowDownIcon
                        fontSize="small"
                        marginBottom="none"
                        marginTop="0px"
                        paddingTop="0px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="time-section">
                <label className="label-input-time">Lunch End Time :</label>
                <div className="time-input-cont">
                  <input
                    style={{
                      border: "none",
                    }}
                    name="lunch_end_time"
                    type="text"
                    placeholder="End Time"
                    value={formValues.lunch_end_time}
                    onChange={handleChange}
                    required
                    readOnly={isReadOnly}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      className="arrow-button"
                      onClick={() => incrementTime("lunch_end_time")}
                    >
                      <KeyboardArrowUpIcon fontSize="small" />
                    </div>
                    <div
                      className="arrow-button"
                      onClick={() => decrementTime("lunch_end_time")}
                    >
                      <KeyboardArrowDownIcon
                        fontSize="small"
                        marginBottom="none"
                        marginTop="0px"
                        paddingTop="0px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Services Section */}
        <div className="heading-section">
          <label className="label">Services :</label>
          <div className="input-section  ">
            <div className="add-service-btn r">
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex" }}>
                  <p
                    className={`salon-cat-item b-color ${
                      selectedGender === "male" ? "selected" : ""
                    }`}
                    onClick={() => handleGenderSelect("male")}
                  >
                    Male
                  </p>
                  <p
                    style={{ marginLeft: "-20px", marginRight: "56vw" }}
                    className={`salon-cat-item b-color ${
                      selectedGender === "female" ? "selected" : ""
                    }`}
                    onClick={() => handleGenderSelect("female")}
                  >
                    Female
                  </p>
                </div>
                <button type="button" className="add" onClick={addService}>
                  +Addservice
                </button>
              </div>
            </div>

            <div className="input-section">
              <div>
                {service.map((service, index) => (
                  <div key={index} className="services-input-top-cont">
                    <div className="services-input-item">
                      <label className="label-input">Service name :</label>
                      <input
                        style={{
                          width: "195px",
                          height: "40px",
                        }}
                        name="name"
                        type="text"
                        placeholder="Enter the name"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="services-input-item">
                      <label className="label-input">Discounted price :</label>
                      <input
                        style={{
                          width: "115px",
                          height: "40px",
                        }}
                        name="discount"
                        type="number"
                        placeholder="Enter price"
                        value={service.discount}
                        onChange={(e) => handleServiceChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="services-input-item">
                      <label className="label-input">Original Price :</label>
                      <input
                        style={{
                          width: "115px",
                          height: "40px",
                        }}
                        name="price"
                        type="number"
                        placeholder="Enter Price"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>

                    <div className="services-input-item">
                      <label className="label-input-dur">Duration :</label>
                      <input
                        style={{
                          width: "115px",
                          height: "40px",
                        }}
                        name="duration"
                        type="text"
                        placeholder="Duration time"
                        value={service.duration}
                        onChange={(e) => handleServiceChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <button type="button" onClick={() => removeService(index)}>
                      <div>
                        {" "}
                        <DeleteOutlineIcon
                          style={{
                            background: "none",
                            mixBlendMode: "multiply",
                          }}
                          className="del-btn"
                        />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Combo service section */}
        <div className="heading-section">
          <label className="label">Combo Services :</label>
          <div className="input-section">
            <div className="add-service-btn">
              <p
                style={{ display: "flex", marginRight: "60vw", width: "300px" }}
              >
                Combo1
              </p>
              <button type="button" className="add" onClick={addComboService}>
                +AddService
              </button>
            </div>
            <hr
              style={{
                width: "70vw",
                border: "1px solid #5b5441",
                marginTop: "5px",
              }}
            />
            {combos.map((combo, index) => (
              <div key={index} className="services-input-cont">
                <div className="services-input-top-cont">
                  <div className="services-input-item">
                    <label className="label-input">service 1 :</label>
                    <input
                      style={{
                        width: "195px",
                        height: "40px",
                      }}
                      name="combo_name"
                      type="text"
                      placeholder="Enter the name"
                      value={combo.combo_name}
                      onChange={(e) => handleComboChange(index, e)}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                  <button type="button" onClick={() => removeService(index)}>
                    <DeleteIcon className="del-btn" />
                  </button>

                  <div className="services-input-item">
                    <label className="label-input">Service 2 :</label>
                    <input
                      style={{
                        width: "195px",
                        height: "40px",
                      }}
                      name="services"
                      type="text"
                      placeholder="Enter the name"
                      value={combo.services.join("")}
                      onChange={(e) => handleComboChange(index, e)}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                  <button type="button" onClick={() => removeService(index)}>
                    <DeleteIcon className="del-btn" />
                  </button>
                </div>
                <div>
                  <div className="services-input-top-cont">
                    <div className="services-input-item">
                      <label className="label-input">Price :</label>
                      <input
                        style={{
                          width: "113px",
                          height: "40px",
                        }}
                        name="combo_price"
                        type="number"
                        placeholder="Enter price"
                        value={combo.combo_price}
                        onChange={(e) => handleComboChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="services-input-item">
                      <label className="label-input">Duration :</label>
                      <input
                        style={{
                          width: "113px",
                          height: "40px",
                        }}
                        name="duration"
                        type="text"
                        placeholder="Duration time :"
                        value={combo.duration}
                        onChange={(e) => handleComboChange(index, e)}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeComboService(index)}
                    >
                      <DeleteIcon className="del-btn" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <hr style={{ width: "70vw", border: "1px solid #5b5441" }} />

            <button
              style={{ border: "1px solid  #5B5441", marginTop: "20px" }}
              type="button"
              className="combo"
              onClick={addComboService}
            >
              Add a combo
            </button>
          </div>
        </div>
        <Photos
          uploadedimages={uploadedPhotos}
          setUploadedimages={setUploadedPhotos}
          isReadOnly={isReadOnly}
          shouldUpload={shouldUpload}
          setshouldUpload={setshouldUpload}
          show={props.search}
        />
        <OwnerPhotosUpload
          uploadedimages={uploadedPhotosOwner}
          setUploadedimages={setUploadedPhotosOwner} // Correctly reference the function here
          isReadOnly={isReadOnly}
          shouldUploadOwner={shouldUploadOwner}
          setshouldUploadOwner={setshouldUploadOwner}
          show={props.search}
        />
        {/* Features section */}
        {/* <div>
          <label>Features</label>
          <input
            name="features"
            type="text"
            value={formValues.features}
            onChange={handleChange}
          />
        </div> */}
        <div className="heading-section">
          <label className="label">Features :</label>
          <div className="input-section">
            <div className="salon-owner-feature-container">
              <div className="add-feature">
                <input
                  className="add-feature-input"
                  type="text"
                  placeholder="Enter other features"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  readOnly={isReadOnly}
                />
                <button
                  className="add-feature-button"
                  type="button"
                  onClick={handleAddFeature}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="feature-item">
              {Object.entries(formValues.features).map(
                ([key, value], index) => (
                  <div
                    key={index}
                    style={{ background: "#222222", marginTop: "20px" }}
                  >
                    <label>
                      <input
                        style={{ marginRight: "10px" }}
                        type="checkbox"
                        checked={value}
                        onChange={() => handleFeatureToggle(key)}
                      />
                      {key}
                    </label>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteFeature(key)}
                    >
                      <DeleteIcon background="none" />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="heading-section">
          <label className="label">Area : </label>
          <div className="input-section">
            <input
              style={{ width: "300px", height: "50px" }}
              name="area"
              type="text"
              placeholder="Enter the area"
              value={formValues.area}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
            />
          </div>
        </div>
        <div className="heading-section">
          <label className="label">City :</label>
          <div className="input-section">
            <input
              style={{ width: "300px", height: "40px" }}
              name="city"
              type="text"
              placeholder="Enter the city"
              value={formValues.city}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </div>
        </div>
        <div className="heading-section">
          <label className="label">State :</label>
          <div className="input-section">
            <input
              style={{ width: "300px", height: "40px" }}
              name="state"
              type="text"
              placeholder="Enter the state"
              value={formValues.state}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </div>
        </div>
        {/*  */}
        <div className="heading-section">
          <label className="label">Location :</label>
          <div className="input-section">
            <input
              style={{ width: "300px", height: "30px" }}
              name="location"
              type="text"
              placeholder="Enter the location"
              value={formValues.location}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
            />
          </div>
        </div>
        {/*  */}
        {/* <div>
          <label>Languages</label>
          <input
            name="languages"
            type="text"
            value={formValues.languages}
            onChange={handleChange}
          />
        </div> */}
        {/*  */}
        <Languages
          formValues={formValues}
          setFormValues={setFormValues}
          readOnly={isReadOnly}
        />
        {/*  */}
        <div className="heading-section">
          <label className="label">Photos :</label>
          <div className="input-section">
            <input name="photos" type="file" multiple onChange={handleChange} />
          </div>
        </div>
        {/*  */}
        <div className="heading-section">
          <label className="label">Description :</label>
          <div className="input-section">
            <textarea
              style={{
                width: "300px",
                height: "100px",
                color: "#5b5441",
                background: "black",
                border: "1px solid #5B5441",
              }}
              name="description"
              type="text"
              placeholder="Description"
              value={formValues.description}
              onChange={handleChange}
              isReadOnly={isReadOnly}
            ></textarea>
          </div>
        </div>
        <hr className="hrr" />
        {/*  */}
        <div
        // style={{
        //   textAlign: "center",
        //   display: "flex",
        //   flexDirection: "row",
        //   gap: "80px",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   marginBottom: "10vh",
        // }}
        >
          {!isReadOnly && !props.search && (
            <>
              <button className="submit" type="submit" disabled={isReadOnly}>
                Save
              </button>
            </>
          )}
        </div>
        <div
          style={{
            marginBottom: "10vh",
          }}
        >
          {!isReadOnly && props.search && (
            <>
              <button className="submit " type="submit" disabled={isReadOnly}>
                Save Changes
              </button>
              <button
                style={{
                  marginLeft: "20px",

                  paddingLeft: "70px",
                  paddingRight: "70px",
                  backgroundColor: "grey",
                  boder: "1px solid #black",
                  height: "50px",
                  color: "white",
                }}
                onClick={() => setIsReadOnly(true)}
              >
                Cancel Changes
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminBoardForm;
