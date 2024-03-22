import { React } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Login from "./Login";
import DashBoard from "./DashBoard";
import DashBoard1 from "./DashBoard1";
import Material from "./InventoryManagment/Material";
import Materialp from "./InventoryManagment/Materialp";
import Product from "./InventoryManagment/Product";
import Productp from "./InventoryManagment/productp";
import Supplier from "./InventoryManagment/Supplier";
import Supplierp from "./InventoryManagment/supplierP";

function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboardinv" exact element={<DashBoard />} />
        <Route path="/dashboard1inv" exact element={<DashBoard1 />} />
        <Route path="/invmgtmaterial" exact element={<Material />} />
        <Route path="/invmgtmaterialp" exact element={<Materialp />} />
        <Route path="/product" exact element={<Product />} />
        <Route path="/productp" exact element={<Productp />} />
        <Route path="/invmgtsupplier" exact element={<Supplier />} />
        <Route path="/invmgtsupplierp" exact element={<Supplierp />} />
      </Routes>
    </div>
  );
}

export default MainPage;
