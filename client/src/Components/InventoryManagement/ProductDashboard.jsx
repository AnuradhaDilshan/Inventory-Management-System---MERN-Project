import React, { useEffect, useState } from "react";
import "../../css/dashboard.css";
import "../../css/areatop.css";
import "../../css/areacard.css";
import AreaCard from "./AreaCard";
import AreaProgressChartPro from "./AreaProgressChartPro.jsx";
import axios from "axios";

function ProductDashboard() {
  const [quantity, setQuantity] = useState(0);
  const [productlist, setProductlist] = useState([]);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [pendingExchangesCount, setPendingExchangesCount] = useState(0);
  const [minQuantityProduct, setMinQuantityProduct] = useState({
    productname: "",
    quantity: 0,
  });

  const calculateStockItemFill = () => {
    const targetMinQuantity = 6000;
    let fillPercentage = (quantity / targetMinQuantity) * 100;
    fillPercentage = Math.min(Math.max(fillPercentage, 0), 100);
    return fillPercentage;
  };

  const calculateSupplierFill = () => {
    const targetCount = 15;
    let fillPercentage = (exchangeCount / targetCount) * 100;
    fillPercentage = Math.min(Math.max(fillPercentage, 0), 100);
    return fillPercentage;
  };

  const calculateMinStockItemFill = () => {
    const targetMinStock = 100;
    let fillPercentage = (minQuantityProduct.quantity / targetMinStock) * 100;
    fillPercentage = Math.min(Math.max(fillPercentage, 0), 100);
    return fillPercentage;
  };

  const getData = async () => {
    try {
      let apiUrl = "http://localhost:3001/product";
      const data = await axios.get(apiUrl);
      const products = data.data;
      setProductlist(products);
      const totalQuantity = data.data.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      setQuantity(totalQuantity);
      if (products.length) {
        const sortedProducts = [...products].sort(
          (a, b) => a.quantity - b.quantity
        );
        const minQuantityProduct = sortedProducts[0];
        setMinQuantityProduct({
          productname: minQuantityProduct.productname,
          quantity: minQuantityProduct.quantity,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getEx = async () => {
    try {
      let apiUrl = "http://localhost:3001/exchange";
      const data = await axios.get(apiUrl);
      const exchanges = data.data;
      setExchangeCount(exchanges.length);
      const pendingCount = exchanges.filter(
        (exchange) => exchange.status === "Pending"
      ).length;
      setPendingExchangesCount(pendingCount);
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
    getEx();
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
                colors={["#e4e8ef", "#6d6e6b"]}
                percentFillValue={calculateStockItemFill()}
                cardInfo={{
                  title: "Total Product Stock",
                  value: quantity,
                  text: `Stock Items : ${productlist.length}`,
                }}
              />
              <AreaCard
                className="area-card"
                colors={["#e4e8ef", "#21bfc4"]}
                percentFillValue={calculateSupplierFill()}
                cardInfo={{
                  title: "Total Exchanges",
                  value: `${exchangeCount}`,
                  text: `Pending Count : ${pendingExchangesCount}`,
                }}
              />
              <AreaCard
                className="area-card"
                colors={["#e4e8ef", "#e8e81e"]}
                percentFillValue={calculateMinStockItemFill()}
                cardInfo={{
                  title: "Lowest Product Item",
                  value: minQuantityProduct.productname || "N/A",
                  text: `Quantity: ${minQuantityProduct.quantity || 0}`,
                }}
              />
            </section>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <section className="content-area-charts">
              <AreaProgressChartPro />
            </section>
          </div>
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </div>
  );
}

export default ProductDashboard;
