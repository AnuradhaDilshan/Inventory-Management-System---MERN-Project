import React from "react";
import Header from "../../Components/Header";
import SideBar1 from "../../Components/SideBar1";
import SupplierContent from "../../Components/InventoryManagement/SupplierContent";

function Supplier() {
  return (
    <div>
      <Header />
      <SideBar1 />
      <SupplierContent />
    </div>
  );
}

export default Supplier;
