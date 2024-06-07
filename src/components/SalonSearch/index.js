import React, { useEffect, useState } from "react";
import Context from "../../Context/Context";
import { getToken } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const SalonSearch = () => {
  const [searchValue, setsearchValue] = useState("");
  const [loader, setloader] = useState(true);
  const [Data, setData] = useState([]);
  const [filtered, setfiltered] = useState([]);
  const [isAuth] = useState(getToken());

  console.log(isAuth);

  // const navigate = (id) => {
  //   window.open(`http://localhost:3000/salons/${id}`, "_blank");
  // };
  const navigate = useNavigate();

  const filterSalon = (e) => {
    let search = e.target.value;
    setsearchValue(search);
    if (search === "") {
      setfiltered(Data);
      return;
    }

    let update = Data.filter(
      (item) =>
        item.salon_code.toLowerCase().includes(search.toLowerCase()) ||
        item.salon_name.toLowerCase().includes(search.toLowerCase())
    );
    setfiltered(update);
  };

  useEffect(() => {
    const GetAllSalonsList = async () => {
      setloader(true);
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${isAuth}`,
      };

      let response = await fetch(`${Context}/admin/all-salons`, {
        method: "GET",
        headers: headersList,
      });

      let x = await response.json();
      console.log(x);

      setData(x.data);
      setfiltered(x.data);
      setloader(false);
    };

    GetAllSalonsList();
  }, [isAuth]);

  const handleNavigation = (salon_code) => {
    navigate(`/salon-search/${salon_code}`);
    console.log(salon_code);
  };

  return (
    <div className="salon-container">
      <Header />
      <div className="salon-botom-cont">
        <div className="dropdown-options">
          <div className="heading-section">
            <label className="">Salon Code:</label>
            <div className="">
              <input
                style={{ width: "500px", marginLeft: "50px", height: "40px" }}
                type="text"
                name="SalonCode"
                placeholder="salonCode (or) salonName.."
                autoComplete="off"
                value={searchValue}
                onChange={filterSalon}
              />
              <button className="search">Search</button>
            </div>
          </div>
          <div
            style={{
              background: "#222222",
              marginLeft: "250px",
              // marginRight: "600px",
              width: "500px",
              height: "30px",
            }}
          >
            {loader ? (
              <p>
                Data is Loading from server............ wait a min
                please..............
              </p>
            ) : (
              filtered.map((salon) => (
                <div
                  key={salon.salon_uuid}
                  className="dropdown-option"
                  onClick={() => handleNavigation(salon.salon_code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    background: "#222222",
                  }}
                >
                  <input
                    type="checkbox"
                    onChange={() => handleNavigation(salon.salon_code)}
                    style={{ marginRight: "10px", marginTop: "13px" }}
                  />
                  {/* <div>{salon.salon_uuid}</div> */}

                  <div>{salon.salon_code}</div>
                  <div>{salon.salon_name}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonSearch;
