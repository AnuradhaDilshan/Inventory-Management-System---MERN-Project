import React from "react";

function SideBar() {
  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/inventory-dashboard" className="brand-link">
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
              <a href="/inventory-dashboard" className="d-block">
                Inventory Manager
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
              <li className="nav-item">
                <a href="/inventory-dashboard" className="nav-link">
                  <i className="nav-icon far fa-file-alt" />
                  <p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/inventory-material" className="nav-link">
                  <i className="nav-icon fas fa-cubes" />
                  <p>Material</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/inventory-supplier" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p>Supplier</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <i className="nav-icon fas fa-sign-out" />
                  <p>Log Out</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
}

export default SideBar;
