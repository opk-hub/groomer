import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import "./index.css";

function MoreActions() {
  return (
    <div>
     

      <div className=" bg-cover">
        <div className="add-brands-bg-container">
          <div className="add-brands-container ">
            <div className="add-brands">
              <div className="add-b-list">
                <h1>Add brands</h1>
                <div className="add-b-list-items">
                  <input
                    type="text"
                    placeholder="Write brand name"
                    className="more-actions-input"
                  />
                  <button className="btn-all-brands">add</button>
                </div>
              </div>
              <div className="more-acttion-cont">
                <div>
                  <h1 className="brand-hed">Brand list</h1>

                  <div className="more-action-div-1">
                    <div className="more-actions-dle">
                      <p className="mor-des">Lakme</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />

                    <div className="more-actions-dle">
                      <p className="mor-des">Beardo</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                    <div className="more-actions-dle">
                      <p className="mor-des">The Man Company</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                    <div className="more-actions-dle">
                      <p className="mor-des">Bombay Shaving Company</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                    <div className="more-actions-dle">
                      {" "}
                      <p className="mor-des">Baxter of California</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                    <div className="more-actions-dle">
                      <p className="mor-des">Park Avenue</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                    <div className="more-actions-dle">
                      <p className="mor-des">Philips</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="vl"></div>

          <div className="add-brands-container a-b-c">
            <div className="add-brands">
              <div className="add-b-list">
                <h1>Add brands</h1>
                <div className="add-b-list-items">
                  <input
                    type="text"
                    placeholder="Write brand name"
                    className="more-actions-input"
                  />
                  <button className="btn-all-brands">add</button>
                </div>
              </div>
              <div className="more-acttion-cont">
                <div>
                  <h1 className="brand-hed">Brand list</h1>

                  <div className="more-action-div-1">
                    <div className="more-actions-dle">
                      <p className="mor-des">Lakme</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />

                    <div className="more-actions-dle">
                      <p className="mor-des">Beardo</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                    <div className="more-actions-dle">
                      <p className="mor-des">The Man Company</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                    <div className="more-actions-dle">
                      <p className="mor-des">Bombay Shaving Company</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                    <div className="more-actions-dle">
                      {" "}
                      <p className="mor-des">Baxter of California</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                    <div className="more-actions-dle">
                      <p className="mor-des">Park Avenue</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                    <div className="more-actions-dle">
                      <p className="mor-des">Philips</p>
                      <DeleteIcon className="margin-left-del" />
                    </div>
                    <hr className="hr-line-more-ac" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreActions;
