import { NavLink } from "react-router-dom";
import "./index.css";

function Header() {
  return (
    // Navbar container

    <div className="Navbar">
      <NavLink to="/admin-form">
        <span className="span-hed">On board form</span>
      </NavLink>
      <NavLink to="/salon-search">
        <span className="span-hed">Salon Search</span>
      </NavLink>
      <NavLink to="/manage-shop">
        <span className="span-hed">Manage Shop</span>
      </NavLink>
      <hr className="hr-line" />
    </div>
  );
}

export default Header;
