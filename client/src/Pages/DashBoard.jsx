import React from "react";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import Home from "../Components/InventoryManagement/Home";

function DashBoard() {
  return (
    <div>
      <Header />
      <SideBar />
      <Home />
    </div>
  );
}

export default DashBoard;
