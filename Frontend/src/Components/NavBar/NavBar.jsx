import React, { useState } from "react";
import './NavBar.css'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../../ReduxToolkit/Slices/Localization";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const dispatch = useDispatch()
  const translate = useSelector((state) => state.Localization.translation);
  const translateToAR = () => {
    dispatch(setLang("ar"))
  }
  const translateToEN = () => {
    dispatch(setLang("en"))
  }
  return (
    <div className={menuToggle ? "nav-holder" : ""}>
      <nav id="navbar" className={menuToggle ? "menu-open" : ""}>
        <div className="nav-wrapper">
          <div className="logo">
            <a href="#home"><i className="fas fa-chess-knight"></i> Logo</a>
          </div>
          <ul id="menu" className={menuToggle ? "active" : ""}>
            <li>
              <NavLink to="/">{translate.home}</NavLink>
            </li>
            <li>
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/about">{translate.about}</NavLink>
            </li>
            <li>
              <NavLink to="/contact">{translate.contact}</NavLink>
            </li>
            <li>
              <button onClick={() => translateToAR()}>AR</button>
              <button onClick={() => translateToEN()}>EN</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className={`menuIcon ${menuToggle ? "toggle" : ""}`} onClick={() => setMenuToggle(!menuToggle)}>
        <span className="icon icon-bars"></span>
        <span className="icon icon-bars overlay"></span>
      </div>

      <div className={`overlay-menu ${menuToggle ? "active" : ""}`}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="#services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="#contact">Contact</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
