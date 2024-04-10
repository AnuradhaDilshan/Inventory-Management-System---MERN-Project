import React, { useEffect, useState } from "react";
import "../../css/areacharts.css";
import axios from "axios";

const AreaProgressChart = () => {
  const [materiallist, setMateriallist] = useState([]);

  const getData = async () => {
    try {
      let apiUrl = "http://localhost:3001/material";
      const response = await axios.get(apiUrl);
      setMateriallist(response.data);
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
        <h4 className="progress-bar-title">Material Stocks</h4>
      </div>
      <div className="progress-bar-list">
        {materiallist.map((material) => (
          <div className="progress-bar-item" key={material.id}>
            <div className="bar-item-info">
              <p className="bar-item-info-name">{material.materialname}</p>
              <p className="bar-item-info-value">{material.quantity}</p>
            </div>
            <div className="bar-item-full">
              <div
                className="bar-item-filled"
                style={{
                  "--target-width": `${calculateStockItemFill(
                    material.quantity
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

export default AreaProgressChart;
