import AdminBoardForm from "../AdminBoardForm";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import { ToastError } from "../../Middlewares/Alertpop";
import Context, { getToken, removeToken } from "../../Context/Context";

function SalonSearch1() {
  const { salonCode } = useParams();
  const [searchon, setSearchOn] = useState(false);
  const [salonCodeInput, setSalonCodeInput] = useState(salonCode || "");
  const [sendData, setSendData] = useState({});
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (salonCode) {
      handleSubmit();
    }
  }, [salonCode]);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setSearchOn(true);
    setLoader(true);
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${getToken()}`,
    };

    let response = await fetch(
      `${Context}/admin/salons?code=${salonCodeInput}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    // console.log(data.data.salon_uuid);
    let uuid = data.data.salon_uuid;
    console.log(uuid);
    Cookies.set("uuid", uuid, { expires: 7 });
    if (data.code === 401) {
      removeToken();
      navigate("/");
      ToastError(data.message);
      return;
    }
    if (data.code === 404) {
      setSearchOn(false);
      setLoader(false);
      ToastError("Salon not found with id: " + salonCodeInput);
      return;
    }

    const keyMapping = {
      service_name: "name",
      service_discount: "discount",
      service_original_price: "price",
      service_duration: "duration",
      combo_name: "combo_name",
      combo_services_name: "services",
      combo_price: "combo_price",
      combo_duration: "duration",
    };

    const modifiedDictListServices = data.data["salon_services"].map((dict) => {
      const modifiedDict = {};
      for (const key in dict) {
        if (dict.hasOwnProperty(key)) {
          const newKey = keyMapping[key] || key;
          modifiedDict[newKey] = dict[key];
        }
      }
      return modifiedDict;
    });

    const modifiedDictListCombos = data.data["salon_combo_services"].map(
      (dict) => {
        const modifiedDict = {};
        for (const key in dict) {
          if (dict.hasOwnProperty(key)) {
            const newKey = keyMapping[key] || key;
            modifiedDict[newKey] = dict[key];
          }
        }
        return modifiedDict;
      }
    );

    setSendData({
      one: data.data,
      servicesRev: modifiedDictListServices,
      combosRev: modifiedDictListCombos,
    });

    setLoader(false);
  };

  return (
    <div className="salon-container">
      <div>
        {!searchon && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Salon Code:</label>
              <div className="input">
                <input
                  style={{ marginRight: "4vw" }}
                  type="text"
                  placeholder="HYD1...DEL1"
                  name="SalonCode"
                  value={salonCodeInput}
                  onChange={(event) =>
                    setSalonCodeInput(event.target.value.toUpperCase())
                  }
                />
                <button
                  className="submit"
                  style={{ paddingRight: "40px", paddingLeft: "40px" }}
                  type="submit"
                >
                  Go
                </button>
              </div>
            </div>
          </form>
        )}
        {loader && <p>Getting Data..............from server....</p>}

        {searchon && sendData.one && (
          <AdminBoardForm
            isReadOnly={true}
            search={true}
            Salondata={sendData.one && sendData}
            upPhoto={false}
          />
        )}
      </div>
    </div>
  );
}

export default SalonSearch1;
