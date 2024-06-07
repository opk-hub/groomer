import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Header from "../Header";
import Navbar from "../NavBar";

import "./index.css";

function OnBoardForm() {
  return (
    <div className="bg-container">
      <Header />

      <div className="sevth-page-contanier">
        <div className="manage-items">
          <label className="label-margin">Item code:</label>
          <input
            className="input-item"
            type="text"
            placeholder="Enter item code"
          />
        </div>
        <div className="manage-items">
          <label className="label-margin">Item code:</label>
          <input
            className="input-item"
            type="text"
            placeholder="Enter item code"
          />
        </div>
        <div className="display-img manage-items">
          <label className="label-margin">Product image:</label>
          <div>
            <div className="p-img-n">
              <div className="img-cent img-size img-cov">
                <DeleteIcon />
              </div>
            </div>
            <div className="img-size">
              <div className="upload">
                {/* <img src="image.jpg" alt="Description of the image" /> */}
                <FileUploadOutlinedIcon />
                <p>upload the selected identify proof</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="img-bottle img-size img-cov">
                <DeleteIcon />
              </div>
            </div>
            <div className="img-size">
              <div className="upload">
                {/* <img src="image.jpg" alt="Description of the image" /> */}
                <FileUploadOutlinedIcon />
                <p>upload the selected identify proof</p>
              </div>
            </div>
          </div>
        </div>

        {/*  */}

        <div className=" affilated-items manage-items">
          <label className="label-margin">Affilated link:</label>
          <div className="affilated">
            <input
              className="input-item "
              type="text"
              placeholder="Enter affilated of sellers (eg.amazo,nykaa)"
            />

            <input
              className="input-item"
              type="text"
              placeholder="Enter affilated of sellers (eg.amazo,nykaa)"
            />
            <input
              className="input-item"
              type="text"
              placeholder="Enter affilated of sellers (eg.amazo,nykaa)"
            />
            <input
              className="input-item"
              type="text"
              placeholder="Enter affilated of sellers (eg.amazo,nykaa)"
            />
            <input
              className="input-item"
              type="text"
              placeholder="Enter affilated of sellers (eg.amazo,nykaa)"
            />
          </div>
        </div>

        {/*  */}

        <div className="div-price">
          <h1 className="names">Price :</h1>
          <input className="price-margin" type="text" placeholder="price" />
        </div>
        {/*  */}
        <div className="manage-items ">
          <label className="label-margin ">Description:</label>
          <input
            className="input-item "
            type="text"
            placeholder="Enter product description"
          />
        </div>

        {/*
         */}

        <div className="manage-items">
          <label className="label-margin cat">Category</label>

          <input className="input-item " type="text" placeholder="Bea" />
        </div>

        {/*  */}

        <div className="gender manage-items">
          <h1 className="label-margin names">Gender</h1>
          <div className="gender-for">
            <div className="gender-male">
              <input
                type="radio"
                id="telugu"
                name="language"
                value="telugu"
                className="radio-1"
              />
              <label htmlFor="telugu">Male</label>
            </div>
            <div className="gender-male">
              <input
                type="radio"
                id="english"
                name="language"
                value="english"
                className="radio-1"
              />
              <label htmlFor="english">Female</label>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default OnBoardForm;
