import React from "react";

import GetAppIcon from "@mui/icons-material/GetApp";

import logo from "../image/hulugramNav.png";
import { useGlobalContext } from "../context";

export default function Navbar() {
  const { isWindow960, showText } = useGlobalContext();
  const navBarStyle = {
    marginBottom: isWindow960 < 960 ? "auto" : "3rem",
  };
  return (
    <nav className="navbar nav-flex" style={navBarStyle}>
      <div className="nav-header-container">
        <img src={logo} alt="Hulugram logo" className="App-logo" />
        <h3 className="logo-text">Hulugram</h3>
      </div>
      <div className="get-hulugram-app-flex">
        <a
          href="https://www.hulugram.org/apps"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GetAppIcon sx={{ color: "white[500]" }} />
          {showText > 380 && <strong>Hulugram</strong>}
        </a>
      </div>
    </nav>
  );
}
