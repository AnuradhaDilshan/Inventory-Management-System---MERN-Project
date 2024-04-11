import React, { useEffect, useState } from "react";
import "../../css/dashboard.css";
import "../../css/areatop.css";
import "../../css/areacard.css";
import AreaCard from "./AreaCard";
import AreaBarChart from "./AreaBarChart";
import axios from "axios";

function FinanceDashboard() {
  const [quantity, setQuantity] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalMaterialPrice, setTotalMaterialPrice] = useState(0);
  const [productlist, setProductlist] = useState([]);
  const [materiallist, setMateriallist] = useState([]);
  const [highestValueProduct, setHighestValueProduct] = useState({
    productname: "",
    totalValue: 0,
  });

  const calculateStockItemFill = () => {
    const targetValue = 10000000;
    let fillPercentage = (totalProductPrice / targetValue) * 100;
    fillPercentage = Math.min(Math.max(fillPercentage, 0), 100);
    return fillPercentage;
  };

  const calculateSupplierFill = () => {
    const targetCount = 1000000;
    let fillPercentage = (totalMaterialPrice / targetCount) * 100;
    fillPercentage = Math.min(Math.max(fillPercentage, 0), 100);
    return fillPercentage;
  };

  const calculateMinStockItemFill = () => {
    const targetStock = 2500000;
    let fillPercentage = (highestValueProduct.totalValue / targetStock) * 100;
    fillPercentage = Math.min(Math.max(fillPercentage, 0), 100);
    return fillPercentage;
  };

  const getData = async () => {
    try {
      let apiUrl = "http://localhost:3001/product";
      const data = await axios.get(apiUrl);
      const products = data.data;
      setProductlist(products);

      let productTotalPrices = [];
      let highestTotalValue = 0;

      products.forEach((product) => {
        const totalPricePerProduct = product.quantity * product.price;
        productTotalPrices.push(totalPricePerProduct);

        if (totalPricePerProduct > highestTotalValue) {
          highestTotalValue = totalPricePerProduct;
          setHighestValueProduct({
            productname: product.productname,
            totalValue: totalPricePerProduct,
          });
        }
      });
      const overallTotalPrice = productTotalPrices.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      setTotalProductPrice(overallTotalPrice);
    } catch (e) {
      console.log(e);
    }
  };

  const getMat = async () => {
    try {
      let apiUrl = "http://localhost:3001/material";
      const data = await axios.get(apiUrl);
      const materials = data.data;
      setMateriallist(materials);
      const totalQuantity = data.data.reduce(
        (acc, material) => acc + material.quantity,
        0
      );
      setQuantity(totalQuantity);

      let materialTotalPrices = [];

      materials.forEach((material) => {
        const totalPricePerMaterial = material.quantity * material.price;
        materialTotalPrices.push(totalPricePerMaterial);
      });
      const overallTotalPrice = materialTotalPrices.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      setTotalMaterialPrice(overallTotalPrice);
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
    getMat();
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
                <ol className="breadcrumb float-sm-right"></ol>
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
                colors={["#e4e8ef", "#1569d6"]}
                percentFillValue={calculateStockItemFill()}
                cardInfo={{
                  title: "Total Product Price",
                  value: `LKR ${totalProductPrice.toLocaleString()}`,
                  text: `Product Items : ${productlist.length}`,
                }}
              />
              <AreaCard
                className="area-card"
                colors={["#e4e8ef", "#15d66c"]}
                percentFillValue={calculateSupplierFill()}
                cardInfo={{
                  title: "Total Material Price",
                  value: `LKR ${totalMaterialPrice.toLocaleString()}`,
                  text: `Material Items : ${materiallist.length}`,
                }}
              />
              <AreaCard
                className="area-card"
                colors={["#e4e8ef", "#e0e010"]}
                percentFillValue={calculateMinStockItemFill()}
                cardInfo={{
                  title: "Highest Value Product",
                  value: highestValueProduct.productname || "N/A",
                  text: `Stock Value : LKR ${
                    highestValueProduct.totalValue.toLocaleString() || 0
                  }`,
                }}
              />
            </section>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <section className="content-area-charts">
              <AreaBarChart />
            </section>
          </div>
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </div>
  );
}

export default FinanceDashboard;
