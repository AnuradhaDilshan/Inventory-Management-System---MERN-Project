import React, { useEffect, useState } from "react";
import "../../css/areacharts.css";
import axios from "axios";

const AreaProgressChartFin = () => {
  const [productlist, setProductlist] = useState([]);

  const getData = async () => {
    try {
      let apiUrl = "http://localhost:3001/product";
      const response = await axios.get(apiUrl);
      const sortedAndFiltered = response.data
        .sort((a, b) => a.quantity - b.quantity)
        .slice(0, 5);
      setProductlist(sortedAndFiltered);
    } catch (e) {
      console.log(e);
    }
  };

  const calculateStockItemFill = (quantity) => {
    const targetMinQuantity = 800;
    let fillPercentage = (quantity / targetMinQuantity) * 100;
    fillPercentage = Math.min(Math.max(fillPercentage, 0), 100);
    return fillPercentage;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Product Stocks</h4>
      </div>
      <div className="progress-bar-list">
        {productlist.map((product) => (
          <div className="progress-bar-item" key={product.id}>
            <div className="bar-item-info">
              <p className="bar-item-info-name">{product.productname}</p>
              <p className="bar-item-info-value">{product.quantity}</p>
            </div>
            <div className="bar-item-full">
              <div
                className="bar-item-filled"
                style={{
                  "--target-width": `${calculateStockItemFill(
                    product.quantity
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaProgressChartFin;
