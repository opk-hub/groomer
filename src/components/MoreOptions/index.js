import React, { useState } from "react";
import { ToastSuccess } from "../../Middlewares/Alertpop";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";

const Style_Css = {
  OptionMenu: {
    width: "185px",
    height: "110px",
    borderRadius: "25px",
    backgroundColor: "black",
    position: "absolute",
    left: "212px",
    padding: "10px 15px",
    boxSizing: "border-box",
  },
  Optionbutton: {
    width: "150px",
    fontSize: "14px",
    padding: "2px",
    marginTop: "8px",
  },
};

// Delete pop up Component
const DeletePopup = ({ setdeleteMenu, salonCode }) => {
  const navigate = useNavigate();

  const DeleteSalonHandler = async () => {
    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("salon_token")}`,
      };
      const response = await fetch(
        "https://groomerapp-e1f70ad38863.herokuapp.com/admin/delete-by-id",
        {
          method: "DELETE",
          body: JSON.stringify({ salon_code: salonCode }),
          headers: headersList,
        }
      );

      const data = await response.json();
      if (data.code === 200) {
        ToastSuccess(data.message);
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      setdeleteMenu(false);
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: "100%",
          minHeigh: "100%",
          display: "flex",
          background: "#1a1717",
          zIndex: 999,
        }}
      >
        <div
          style={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <h1>
            Are you really looking to <u>Delete</u> this Salon Permanently?
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              minWidth: "500px",
            }}
          >
            <button
              style={{
                ...Style_Css.Optionbutton,
                backgroundColor: "#CCBB8E",
              }}
              onClick={DeleteSalonHandler}
            >
              Yes
            </button>

            <button
              style={{
                ...Style_Css.Optionbutton,
                backgroundColor: "#323030",
              }}
              onClick={() => setdeleteMenu(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MoreOption = ({ salonCode, isActive, setisActive }) => {
  const [optionMenu, setoptionMenu] = useState(false);
  const [deleteMenu, setdeleteMenu] = useState(false);

  const toggleActiveHandle = async () => {
    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("salon_token")}`,
      };
      const response = await fetch(`${Context}/admin/toggle-salon`, {
        method: "PATCH",
        body: JSON.stringify({ salon_code: salonCode }),
        headers: headersList,
      });

      const data = await response.json();
      if (data.code === 200) {
        ToastSuccess(data.message);
        setisActive(!isActive);
      }
    } catch (error) {}
  };
  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <button
          className="label"
          style={{
            textAlign: "center",
            background: "#FF6548",
            fontWeight: "bold",
            marginBottom: "30px",
            fontSize: "17px",
            backgroundColor: "#fff",
            color: "black",
            padding: "10px",
          }}
          onClick={() => setoptionMenu(!optionMenu)}
        >
          More Actions
        </button>

        {optionMenu && (
          <div style={Style_Css.OptionMenu}>
            <button
              style={{
                ...Style_Css.Optionbutton,
                backgroundColor: isActive ? "#222222" : "CCBB8E",
                color: "white",
              }}
              disabled={isActive ? true : false}
              onClick={toggleActiveHandle}
            >
              Enable Salon
            </button>
            <button
              style={{
                ...Style_Css.Optionbutton,
                backgroundColor: !isActive ? "#CCBB8E" : "#222222",
                color: "white",
              }}
              onClick={toggleActiveHandle}
              disabled={!isActive ? true : false}
            >
              Disable Salon
            </button>
            <button
              style={{
                ...Style_Css.Optionbutton,
                backgroundColor: "#222222",
                color: "white",
              }}
              onClick={() => setdeleteMenu(true)}
            >
              Delete Salon
            </button>
          </div>
        )}
      </div>

      {deleteMenu && (
        <DeletePopup setdeleteMenu={setdeleteMenu} salonCode={salonCode} />
      )}
    </>
  );
};

export default MoreOption;
