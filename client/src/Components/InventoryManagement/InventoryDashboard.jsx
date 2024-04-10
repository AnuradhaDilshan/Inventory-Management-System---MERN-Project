import React, { useEffect, useState } from "react";
import "../../css/dashboard.css";
import "../../css/areatop.css";
import "../../css/areacard.css";
import AreaCard from "./AreaCard";
import AreaProgressChart from "./AreaProgressChart.jsx";
import axios from "axios";

function InventoryDashboard() {
  const [quantity, setQuantity] = useState(0);
  const [activeSupplierCount, setActiveSupplierCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [materiallist, setMateriallist] = useState([]);
  const [minQuantityMaterial, setMinQuantityMaterial] = useState({
    materialname: "",
    quantity: 0,
  });
  const [inventoryHealthStatus, setInventoryHealthStatus] = useState({
    message: "Inventory has Good Health",
    color: "green",
    backgroundColor: "#C7F6C7",
  });

  useEffect(() => {
    if (minQuantityMaterial.quantity < 40) {
      setInventoryHealthStatus({
        message: "Inventory has Critical Health",
        color: "red",
        backgroundColor: "#F6C7C7",
      });
    } else if (minQuantityMaterial.quantity < 100) {
      setInventoryHealthStatus({
        message: "Inventory has Bad Health",
        color: "orange",
        backgroundColor: "#F6F3C7",
      });
    } else {
      setInventoryHealthStatus({
        message: "Inventory has Good Health",
        color: "green",
        backgroundColor: "#C7F6C7",
      });
    }
  }, [minQuantityMaterial.quantity]);

  const calculateStockItemFill = () => {
    const targetMinQuantity = 4000;
    let fillPercentage = (quantity / targetMinQuantity) * 100;
    fillPercentage = Math.min(Math.max(fillPercentage, 0), 100);
    return fillPercentage;
  };

  const calculateSupplierFill = () => {
    const targetCount = 10;
    let fillPercentage = (supplierCount / targetCount) * 100;
    fillPercentage = Math.min(Math.max(fillPercentage, 0), 100);
    return fillPercentage;
  };

  const calculateMinStockItemFill = () => {
    const targetMinStock = 100;
    let fillPercentage = (minQuantityMaterial.quantity / targetMinStock) * 100;
    fillPercentage = Math.min(Math.max(fillPercentage, 0), 100);
    return fillPercentage;
  };

  const getData = async () => {
    try {
      let apiUrl = "http://localhost:3001/material";
      const data = await axios.get(apiUrl);
      const materials = data.data;
      setMateriallist(materials);
      console.log(materials);
      const totalQuantity = data.data.reduce(
        (acc, material) => acc + material.quantity,
        0
      );
      setQuantity(totalQuantity);
      if (materials.length) {
        const sortedMaterials = [...materials].sort(
          (a, b) => a.quantity - b.quantity
        );
        const minQuantityMaterial = sortedMaterials[0];
        setMinQuantityMaterial({
          materialname: minQuantityMaterial.materialname,
          quantity: minQuantityMaterial.quantity,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSup = async () => {
    try {
      const apiUrl = "http://localhost:3001/supplier";
      const response = await axios.get(apiUrl);
      const suppliers = response.data;
      const activeCount = suppliers.filter(
        (supplier) => supplier.status === "Active"
      ).length;
      const Count = suppliers.length;
      setActiveSupplierCount(activeCount);
      setSupplierCount(Count);
    } catch (e) {
      console.log(e);
    }
  };

  const [opacity, setOpacity] = useState(-2);

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
    }, 5000);
    return () => clearTimeout(timer);
  }, [opacity]);

  useEffect(() => {
    getData();
    getSup();
  }, []);

  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <h6
                    className="nav-link"
                    style={{
                      color: inventoryHealthStatus.color,
                      backgroundColor: inventoryHealthStatus.backgroundColor,
                      border: `1px solid ${inventoryHealthStatus.color}`,
                      padding: "7px 10px",
                      borderRadius: "5px",
                      textAlign: "center",
                      display: "inline-block",
                      opacity: opacity,
                      transition: "opacity 0.5s ease-out",
                    }}
                  >
                    {inventoryHealthStatus.message}
                  </h6>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            {/* small box */}
            <section className="content-area-cards">
              <AreaCard
                className="area-card"
                colors={["#e4e8ef", "#475be8"]}
                percentFillValue={calculateStockItemFill()}
                cardInfo={{
                  title: "Total Material Stock",
                  value: quantity,
                  text: `Stock Items : ${materiallist.length}`,
                }}
              />
              <AreaCard
                className="area-card"
                colors={["#e4e8ef", "#4ce13f"]}
                percentFillValue={calculateSupplierFill()}
                cardInfo={{
                  title: "Total Supplier Count",
                  value: `${supplierCount}`,
                  text: `Active Suppliers : ${activeSupplierCount}`,
                }}
              />
              <AreaCard
                className="area-card"
                colors={["#e4e8ef", "#f29a2e"]}
                percentFillValue={calculateMinStockItemFill()}
                cardInfo={{
                  title: "Lowest Stock Item",
                  value: minQuantityMaterial.materialname || "N/A",
                  text: `Quantity: ${minQuantityMaterial.quantity || 0}`,
                }}
              />
            </section>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <section className="content-area-charts">
              <AreaProgressChart />
            </section>
          </div>
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </div>
  );
}

export default InventoryDashboard;
