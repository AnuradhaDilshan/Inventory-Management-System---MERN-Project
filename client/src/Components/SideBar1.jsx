import React, { useState, useEffect } from "react";
import {
  MdOutlineBarChart,
  MdOutlinePeople,
  MdOutlineLogout,
  MdWidgets,
  MdViewInAr,
} from "react-icons/md";
import { TbArrowsExchange2 } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

function SideBar1() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const activeLinkStyle = {
    backgroundColor: "#52555c",
    borderRadius: "5px",
    color: "white",
    textDecoration: "none",
  };

  const [bottomMargin, setBottomMargin] = useState("150px");
  useEffect(() => {
    function handleResize() {
      const newMargin = window.innerWidth < 768 ? "150px" : "282px";
      setBottomMargin(newMargin);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/product-dashboard" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Fashion Elegance</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="/product-dashboard" className="d-block">
                Product Manager
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
                with font-awesome or any other icon font library */}
              <li
                className="nav-item"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  href="/product-dashboard"
                  className="nav-link"
                  style={isActive("/product-dashboard") ? activeLinkStyle : {}}
                >
                  <MdOutlineBarChart size={22} /> <p> Dashboard</p>
                </a>
              </li>
              <li
                className="nav-item"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  href="/product-product"
                  className="nav-link"
                  style={isActive("/product-product") ? activeLinkStyle : {}}
                >
                  <MdViewInAr size={22} /> <p>Product</p>
                </a>
              </li>
              <li
                className="nav-item"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  href="/product-material"
                  className="nav-link"
                  style={isActive("/product-material") ? activeLinkStyle : {}}
                >
                  <MdWidgets size={22} /> <p>Material</p>
                </a>
              </li>
              <li
                className="nav-item"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  href="/product-supplier"
                  className="nav-link"
                  style={isActive("/product-supplier") ? activeLinkStyle : {}}
                >
                  <MdOutlinePeople size={22} /> <p>Supplier</p>
                </a>
              </li>
              <li
                className="nav-item"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: bottomMargin,
                }}
              >
                <a
                  href="/product-exchange"
                  className="nav-link"
                  style={isActive("/product-exchange") ? activeLinkStyle : {}}
                >
                  <TbArrowsExchange2 size={22} /> <p>Exchange</p>
                </a>
              </li>
              <li
                className="nav-item"
                data-toggle="modal"
                data-target="#modal-logout"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a className="nav-link">
                  <MdOutlineLogout size={22} /> <p>Log Out</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

      <div className="modal fade" id="modal-logout">
        <div
          className="modal-dialog"
          style={{
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - (50px * 2))",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <div className="modal-content dark-mode">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Session End</h5>
            </div>
            <div className="modal-body">Are you sure you want to Log Out?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                No, I need to Stay
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-dismiss="modal"
                onClick={handleLogout}
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar1;
