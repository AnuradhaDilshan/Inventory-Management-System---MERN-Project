import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function ExchangeContent() {
  const [exchangelist, setExchangelist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/exchange/${id}/status`,
        {
          status: newStatus,
        }
      );
      toast.success("Status Updated");
      getData();
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to Update");
    }
  };

  const getData = async () => {
    try {
      let apiUrl = "http://localhost:3001/exchange";
      if (searchQuery.trim() !== "") {
        apiUrl += `/search?exchangename=${searchQuery}`;
      }
      const data = await axios.get(apiUrl);
      setExchangelist(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [searchQuery]);

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Exchange</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/product-dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Exchange</li>
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
                    <h3 className="card-title">Exchange Details</h3>
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
                          placeholder="Search Ex. Item by Name"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="col-4"></div>
                      <div className="col-6"></div>
                    </div>
                    <div
                      className="card-body table-responsive p-0"
                      style={{ height: 400 }}
                    >
                      <table className="table table-head-fixed text-nowrap">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th className="text-center">Exchange Code</th>
                            <th className="text-center">Product Code</th>
                            <th className="text-center">Ex. Item Name</th>
                            <th className="text-center">Sold Date</th>
                            <th className="text-center">Added Date</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Unit Price</th>
                            <th className="text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exchangelist.map((item, index) => {
                            // Use the formatDate utility function for displaying the date
                            const soldDate = formatDate(item.solddate);
                            const addDate = formatDate(item.addeddate);

                            return (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td className="text-center">
                                  {item.exchangecode}
                                </td>
                                <td className="text-center">
                                  {item.productcode}
                                </td>
                                <td className="text-center">
                                  {item.exchangename}
                                </td>
                                <td className="text-center">{soldDate}</td>
                                <td className="text-center">{addDate}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-center">{item.price}</td>
                                <td className="text-center">
                                  <select
                                    style={{
                                      paddingTop: "3px",
                                      paddingBottom: "3px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                      borderRadius: "5px",
                                      // Change color based on the status
                                      backgroundColor:
                                        item.status === "Pending"
                                          ? "lightgray"
                                          : item.status === "Approved"
                                          ? "#dff0d8"
                                          : "#f2dede",
                                    }}
                                    value={item.status}
                                    onChange={(e) =>
                                      handleStatusChange(
                                        item._id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option
                                      value="Pending"
                                      disabled={item.status !== "Pending"}
                                    >
                                      Pending
                                    </option>
                                    <option value="Approved">Approved</option>
                                    <option value="Not Approved">
                                      Not Approved
                                    </option>
                                  </select>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer"></div>
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

export default ExchangeContent;
