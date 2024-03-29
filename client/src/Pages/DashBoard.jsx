import React from "react";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import InventoryDashboard from "../Components/InventoryManagement/InventoryDashboard";

function DashBoard() {
  return (
    <div>
      <Header />
      <SideBar />
      <InventoryDashboard />
    </div>
  );
}

export default DashBoard;
