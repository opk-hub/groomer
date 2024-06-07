import React from "react";
import "./index.css";
import Header from "../Header";
class Seventhcomp extends React.Component {
  render() {
    return (
      <div className="bg-container sev-page-1">
   
        <Header />

        <div className="sev-page">
          <input
            className="sev-search b-color-se"
            type="text"
            placeholder="Search for products and brands"
          />
          <button className="sear-button">Search</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Code</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Description</th>
              <th>Concerns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Olivia Virgin oil | 120 ml </td>
              <td>GB126710035</td>
              <td>Olivia</td>
              <td> ₹250</td>
              <td>natural nourishment</td>
              <td>
                Dry hair <span className="edit-btn">Edit</span>
              </td>
            </tr>
            <tr>
              <td>Olivia Virgin oil | 120 ml </td>
              <td>GB126710035</td>
              <td>Olivia</td>
              <td> ₹250</td>
              <td>natural nourishment</td>
              <td>
                Dry hair <span className="edit-btn">Edit</span>
              </td>{" "}
            </tr>
            <tr>
              <td>Olivia Virgin oil | 120 ml </td>
              <td>GB126710035</td>
              <td>Olivia</td>
              <td> ₹250</td>
              <td>natural nourishment</td>
              <td>
                Dry hair <span className="edit-btn">Edit</span>
              </td>{" "}
            </tr>
            <tr>
              <td>Olivia Virgin oil | 120 ml </td>
              <td>GB126710035</td>
              <td>Olivia</td>
              <td> ₹250</td>
              <td>natural nourishment</td>
              <td>
                Dry hair <span className="edit-btn">Edit</span>
              </td>{" "}
            </tr>
            <tr>
              <td>Olivia Virgin oil | 120 ml </td>
              <td>GB126710035</td>
              <td>Olivia</td>
              <td> ₹250</td>
              <td>natural nourishment</td>
              <td>
                Dry hair <span className="edit-btn">Edit</span>
              </td>{" "}
            </tr>
            <tr>
              <td>Olivia Virgin oil | 120 ml </td>
              <td>GB126710035</td>
              <td>Olivia</td>
              <td> ₹250</td>
              <td>natural nourishment</td>
              <td>
                Dry hair <span className="edit-btn">Edit</span>
              </td>{" "}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Seventhcomp;
