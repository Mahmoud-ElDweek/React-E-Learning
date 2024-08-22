import React, { useState } from "react";
import './NavBar.css'
import { Box, Button, colors } from '@mui/material'
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDirection, setLang } from "../../ReduxToolkit/Slices/Localization";
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CloseIcon from '@mui/icons-material/Close';



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
            <Link style={{ textDecoration: 'none', color: theme.palette.background.text,alignSelf: "center", display: "flex", alignItems: "center",height: "100%" }} to="/">
            <img src="/src/assets/Images/LogoIconWhite.png" className="logoIcon" alt="" />
            <img src="/src/assets/Images/E-LearningLogoWhite.png" className="logoImg" alt="" />
            </Link>
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


      <div className={`overlay-menu ${menuToggle ? "active" : ""} ${navAr ? "arNav" : "enNav"}`}>
        <ul>
        <Box sx={{display: "flex", justifyContent:"start",alignItems: "center" ,width: "100%", margin: "25px 0"}}>
        <CloseIcon sx={{color: "black",fontSize: "30px" ,cursor: "pointer" ,backgroundColor: "#999" , padding: "4px",margin: "0 10px", borderRadius: "50%" , ":hover":{backgroundColor:"#333", color: "white"}}} onClick={() => setMenuToggle(!menuToggle)}/>
          <div>
        <img src="/src/assets/Images/LogoIconBlack.png" style={{maxWidth: "32px"}} alt="" />
        <img src="/src/assets/Images/E-LearningLogoBlack.png" style={{maxWidth: "150px"}} alt="" />
          </div>
        </Box>
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
