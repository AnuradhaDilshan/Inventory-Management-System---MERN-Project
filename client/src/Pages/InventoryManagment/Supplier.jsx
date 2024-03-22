import React from "react";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";
import SupplierContent from "../../Components/InventoryManagement/SupplierContent";

function Supplier() {
  return (
    <div>
      <Header />
      <SideBar />
      <SupplierContent />
    </div>
  );
}

export default Supplier;
