import React, { useState } from "react";
import './NavBar.css'
import { Badge, Box, Button, colors, Fab } from '@mui/material'
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBaseApiUrl, setDirection, setLang } from "../../ReduxToolkit/Slices/Localization";
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import FavoriteIcon from '@mui/icons-material/Favorite';


// eslint-disable-next-line react/prop-types
const Navbar = ({ toggleTheme }) => {

  const [menuToggle, setMenuToggle] = useState(false);
  const dispatch = useDispatch()
  const translate = useSelector((state) => state.Localization.translation);
  const lang = useSelector((state) => state.Localization.Lang);

  const [navAr, setNavAR] = useState(false)
  const translateToAR = () => {
    dispatch(setLang("ar"))
    dispatch(setDirection("rtl"))
    dispatch(setBaseApiUrl("http://localhost:3001/arCourses"))
    setNavAR(true)
  }
  const translateToEN = () => {
    dispatch(setLang("en"))
    dispatch(setDirection("ltr"))
    dispatch(setBaseApiUrl("http://localhost:3001/courses"))
    setNavAR(false)
  }
  const theme = useTheme();
  // console.log(theme.palette.mode);



  return (
    <div className={menuToggle ? "nav-holder" : ""} style={{ backgroundColor: theme.palette.background.bg, color: theme.palette.background.navText }}>
      <nav id="navbar" className={menuToggle ? "menu-open" : ""}>
        <div className="nav-wrapper">
          <div className="logo">
            <Link style={{ textDecoration: 'none', color: theme.palette.background.navText, alignSelf: "center", display: "flex", alignItems: "center", height: "100%" }} to="/">
              <img src="/src/assets/Images/LogoIconWhite.png" className="logoIcon" alt="" />
              <img src="/src/assets/Images/E-LearningLogoWhite.png" className="logoImg" alt="" />
            </Link>
          </div>
          <ul id="menu" className={menuToggle ? "active" : ""}>
            <li>
              <NavLink style={{ textDecoration: 'none', color: theme.palette.background.navText }} to="/">{translate.home}</NavLink>
            </li>
            <li>
              <NavLink style={{ textDecoration: 'none', color: theme.palette.background.navText }} to="/courses">{translate.courses}</NavLink>
            </li>
            <li>
              <NavLink style={{ textDecoration: 'none', color: theme.palette.background.navText }} to="/about">{translate.about}</NavLink>
            </li>
            <li>
              <NavLink style={{ textDecoration: 'none', color: theme.palette.background.navText }} to="/contact">{translate.contact}</NavLink>
            </li>
          </ul>
          <div className="signin">
            <div>
              <Fab size="small" onClick={toggleTheme} sx={{ color: "inherit", backgroundColor: "inherit", ":hover": { backgroundColor: "#555" }, boxShadow: "none" }} >
                {
                  theme.palette.mode === "light" ?
                    <DarkModeIcon />
                    : <LightModeIcon />
                }
              </Fab>
              {
                lang === "en"
                  ? <Fab size="small" onClick={translateToAR} sx={{ color: "inherit", backgroundColor: "inherit", ":hover": { backgroundColor: "#555" }, margin: "0 4px", boxShadow: "none" }}>AR</Fab>
                  : <Fab size="small" onClick={translateToEN} sx={{ color: "inherit", backgroundColor: "inherit", ":hover": { backgroundColor: "#555" }, margin: "0 4px", boxShadow: "none" }}>EN</Fab>
              }
              <Link to="/wishlist" style={{ textDecoration: 'none', color: theme.palette.background.navText, width: "100%" }}>
                <Fab size="small" sx={{ color: "inherit", backgroundColor: "inherit", ":hover": { backgroundColor: "#555" }, margin: "0 8px", boxShadow: "none" }}>
                  <Badge badgeContent={5} color="error" max={9}>
                    <FavoriteIcon />
                  </Badge>
                </Fab>
              </Link>
              <Button sx={{ display: { xs: 'none', sm: 'inline-block' }, border: "1px solid #eee",padding: "4px 16px",  }} color="inherit">
                <Link to='/signin' style={{ textDecoration: 'none', color: theme.palette.background.navText }}>{translate.signin}</Link>
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
          <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", padding: "25px" }}>
            <CloseIcon sx={{ color: "black", fontSize: "30px", cursor: "pointer", backgroundColor: "#999", padding: "4px", margin: "0 10px", borderRadius: "50%", ":hover": { backgroundColor: "#333", color: "white" } }} onClick={() => setMenuToggle(!menuToggle)} />
            <div>
              <img src="/src/assets/Images/LogoIconBlack.png" style={{ maxWidth: "32px" }} alt="" />
              <img src="/src/assets/Images/E-LearningLogoBlack.png" style={{ maxWidth: "150px" }} alt="" />
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
