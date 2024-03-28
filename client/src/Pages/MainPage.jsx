import { React } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import DashBoard from "./DashBoard";
import DashBoard1 from "./DashBoard1";
import DashBoard2 from "./DashBoard2";
import Material from "./InventoryManagment/Material";
import Materialp from "./InventoryManagment/Materialp";
import Product from "./InventoryManagment/Product";
import Productp from "./InventoryManagment/productp";
import Supplier from "./InventoryManagment/Supplier";
import Supplierp from "./InventoryManagment/supplierP";
import Summary from "./InventoryManagment/Summary";
import ProductPrice from "./InventoryManagment/ProductPrice";
import MaterialPrice from "./InventoryManagment/MaterialPrice";

function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/inventory-dashboard" exact element={<DashBoard />} />
        <Route path="/dashboard1inv" exact element={<DashBoard1 />} />
        <Route path="/dashboard2inv" exact element={<DashBoard2 />} />
        <Route path="/inventory-material" exact element={<Material />} />
        <Route path="/inventory-materialp" exact element={<Materialp />} />
        <Route path="/product" exact element={<Product />} />
        <Route path="/productp" exact element={<Productp />} />
        <Route path="/inventory-supplier" exact element={<Supplier />} />
        <Route path="/inventory-supplierp" exact element={<Supplierp />} />
        <Route path="/summary" exact element={<Summary />} />
        <Route path="/product-price" exact element={<ProductPrice />} />
        <Route path="/material-price" exact element={<MaterialPrice />} />
      </Routes>
    </div>
  );
}

export default MainPage;
