import React from "react";
import Header from "../Components/Header";
import SideBar1 from "../Components/SideBar1";
import ProductDashboard from "../Components/InventoryManagement/ProductDashboard.jsx";

function DashBoard1() {
  return (
    <div>
      <Header />
      <SideBar1 />
      <ProductDashboard />
    </div>
  );
}

export default DashBoard1;
