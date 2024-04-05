import React, { useState, useEffect } from "react";
import axios from "axios";

function MaterialContentforfinance() {
  const [supplierlist, setSupplierlist] = useState([]);
  const [materiallist, setMateriallist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async () => {
    try {
      let apiUrl = "http://localhost:3001/material";
      if (searchQuery.trim() !== "") {
        apiUrl += `/search?materialname=${searchQuery}`;
      }
      const data = await axios.get(apiUrl);
      setMateriallist(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getDataSupplier = async () => {
    try {
      const data = await axios.get("http://localhost:3001/supplier/active");
      setSupplierlist(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    getDataSupplier();
  }, [searchQuery]);

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Material</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/finance-dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Material</li>
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
            <div className="row">
              <div className="col-12">
                {/* Default box */}
                <div className="card card-secondary">
                  <div className="card-header">
                    <h3 className="card-title">Material Details</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-2">
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Search Material by Name"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="col-4"></div>
                      <div className="col-6">
                        <div className="float-right"></div>
                      </div>
                    </div>
                    <div
                      className="card-body table-responsive p-0"
                      style={{ height: 400 }}
                    >
                      <table className="table table-head-fixed text-nowrap">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th className="text-center">Material Code</th>
                            <th className="text-center">Supplier Code</th>
                            <th className="text-center">Material Name</th>
                            <th className="text-center">Added Date</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-right">Unit Price</th>
                            <th className="text-right">Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {materiallist.map((item, index) => {
                            // Determine if the price and total price are whole numbers or not
                            const isPriceWholeNumber = item.price % 1 === 0;
                            const isTotalPriceWholeNumber =
                              (item.quantity * item.price) % 1 === 0;

                            // Format price with up to 3 decimal places and commas, omitting .000 for whole numbers
                            const formattedPrice = isPriceWholeNumber
                              ? item.price.toLocaleString("en-US")
                              : parseFloat(
                                  item.price.toFixed(3)
                                ).toLocaleString("en-US", {
                                  minimumFractionDigits: 1,
                                  maximumFractionDigits: 3,
                                });

                            // Calculate total price and format with up to 3 decimal places and commas, omitting .000 for whole numbers
                            const totalPrice = item.quantity * item.price;
                            const formattedTotalPrice = isTotalPriceWholeNumber
                              ? totalPrice.toLocaleString("en-US")
                              : parseFloat(
                                  totalPrice.toFixed(3)
                                ).toLocaleString("en-US", {
                                  minimumFractionDigits: 1,
                                  maximumFractionDigits: 3,
                                });

                            // Use the formatDate utility function for displaying the date
                            const displayDate = formatDate(item.date);

                            return (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td className="text-center">
                                  {item.materialcode}
                                </td>
                                <td className="text-center">
                                  {item.suppliercode}
                                </td>
                                <td className="text-center">
                                  {item.materialname}
                                </td>
                                <td className="text-center">{displayDate}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-right">
                                  LKR {formattedPrice}
                                </td>
                                <td className="text-right">
                                  LKR {formattedTotalPrice}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* /.card-body */}
                  {/* /.card-footer*/}
                </div>
                {/* /.card */}
              </div>
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
      {/* /.modal */}
    </div>
  );
}

export default MaterialContentforfinance;
