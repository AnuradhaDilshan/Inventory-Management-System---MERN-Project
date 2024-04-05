import React, { useState, useEffect } from "react";

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fade in effect
  useEffect(() => {
    let fadeEffectIn = setInterval(() => {
      if (opacity < 1) {
        setOpacity((prevOpacity) => prevOpacity + 0.1);
      } else {
        clearInterval(fadeEffectIn);
      }
    }, 50);
    return () => clearInterval(fadeEffectIn);
  }, [opacity]);

  // Fade out effect
  useEffect(() => {
    const timer = setTimeout(() => {
      let fadeEffectOut = setInterval(() => {
        if (opacity > 0) {
          setOpacity((prevOpacity) => prevOpacity - 0.1);
        } else {
          clearInterval(fadeEffectOut);
        }
      }, 50);
      return () => clearInterval(fadeEffectOut);
    }, 3000);
    return () => clearTimeout(timer);
  }, [opacity]);

  const inventoryHealthStyle = {
    color: "green",
    backgroundColor: "#C7F6C7",
    border: "1px solid green",
    marginLeft: windowWidth > 768 ? "765px" : "10px",
    marginRight: windowWidth > 768 ? "10px" : "0",
    padding: "7px 10px",
    borderRadius: "5px",
    textAlign: "center",
    display: "inline-block",
    opacity: opacity,
    transition: "opacity 0.5s ease-out",
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" role="button">
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a className="nav-link">Inventory Management System</a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a className="nav-link" style={inventoryHealthStyle}>
              Inventory has Good Health
            </a>
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
    </div>
  );
}

export default Header;
