import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../css/areacharts.css";

const AreaBarChart = () => {
  const [productData, setProductData] = useState([]);

  const fetchProductData = async () => {
    try {
      let apiUrl = "http://localhost:3001/product";
      const response = await axios.get(apiUrl);
      const products = response.data;

      const formattedData = products.map((product) => ({
        Name: product.productname,
        Price: product.quantity * product.price,
      }));

      setProductData(formattedData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const formatTooltipValue = (value) => `${value.toLocaleString("en-US")} LKR`;
  const formatYAxisLabel = (value) => `${value.toLocaleString("en-US")} LKR`;

  return (
    <div className="bar-chart">
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={productData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="Name" />
            <YAxis tickFormatter={formatYAxisLabel} />
            <Tooltip formatter={formatTooltipValue} />
            <Bar dataKey="Price" fill="#475be8" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
