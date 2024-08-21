import React, { useState } from "react";
import './NavBar.css'
import { Button } from '@mui/material'
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDirection, setLang } from "../../ReduxToolkit/Slices/Localization";
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';



// eslint-disable-next-line react/prop-types
const Navbar = ({ toggleTheme }) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const dispatch = useDispatch()
  const translate = useSelector((state) => state.Localization.translation);
  const [navAr , setNavAR] = useState(false)
  const translateToAR = () => {
    dispatch(setLang("ar"))
    dispatch(setDirection("rtl"))
     setNavAR(true)
  }
  const translateToEN = () => {
    dispatch(setLang("en"))
    dispatch(setDirection("ltr"))
    setNavAR(false)
  }
  const theme = useTheme();

  return (
    <div className={menuToggle ? "nav-holder" : ""} style={{ backgroundColor: theme.palette.background.bg, color: theme.palette.background.text }}>
      <nav id="navbar" className={menuToggle ? "menu-open" : ""}>
        <div className="nav-wrapper">
          <div className="logo">
            <Link style={{ textDecoration: 'none', color: theme.palette.background.text }} to="/">E-Learning</Link>
          </div>
          <ul id="menu" className={menuToggle ? "active" : ""}>
            <li>
              <NavLink style={{ textDecoration: 'none', color: theme.palette.background.text }} to="/">{translate.home}</NavLink>
            </li>
            <li>
              <NavLink style={{ textDecoration: 'none', color: theme.palette.background.text }} to="/courses">{translate.courses}</NavLink>
            </li>
            <li>
              <NavLink style={{ textDecoration: 'none', color: theme.palette.background.text }} to="/about">{translate.about}</NavLink>
            </li>
            <li>
              <NavLink style={{ textDecoration: 'none', color: theme.palette.background.text }} to="/contact">{translate.contact}</NavLink>
            </li>
          </ul>
          <div className="signin">
            <div>
              <Button onClick={toggleTheme} color="inherit" >
                <DarkModeIcon />
              </Button>
              <Button color="inherit" onClick={() => translateToAR()}>AR</Button>
              <Button color="inherit" onClick={() => translateToEN()}>EN</Button>
              <Button sx={{ display: { xs: 'none', sm: 'inline-block' } }} color="inherit">
                <Link to='/signin' style={{ textDecoration: 'none', color: theme.palette.background.text }}>{translate.signin}</Link>
              </Button>
            </div>
          </div>
          <div className={`menuIcon ${menuToggle ? "toggle" : ""}`} onClick={() => setMenuToggle(!menuToggle)}>
            <span className="icon icon-bars"></span>
            <span className="icon icon-bars overlay"></span>
          </div>
        </div>
      </nav>


      <div className={`overlay-menu ${menuToggle ? "active" : ""} ${navAr ? "arNav" : ""}`}>
        <ul>
          <li>
            <NavLink to="/">{translate.home}</NavLink>
          </li>
          <li>
            <NavLink to="/courses">{translate.courses}</NavLink>
          </li>
          <li>
            <NavLink to="/about">{translate.about}</NavLink>
          </li>
          <li>
            <NavLink to="/contact">{translate.contact}</NavLink>
          </li>
          <li>
            <NavLink to="/signin">{translate.signin}</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
