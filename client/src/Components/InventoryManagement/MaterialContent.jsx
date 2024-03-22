import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toastr from "toastr/toastr";
import "toastr/build/toastr.css";

function MaterialContent() {
  const [materialcode, setMaterialcode] = useState("");
  const [materialname, setMaterialname] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [suppliercode, setSuppliercode] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [supplierlist, setSupplierlist] = useState([]);
  const [materiallist, setMateriallist] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async () => {
    if (
      !materialcode ||
      !materialname ||
      !quantity ||
      !suppliercode ||
      !price ||
      !date
    ) {
      toastr.error("All fields are required");
    } else {
      const apiUrl = updateMode
        ? `http://localhost:3001/material/${selectedMaterial._id}` // Update existing supplier
        : "http://localhost:3001/material"; // Add new supplier

      const requestData = updateMode
        ? {
            ...selectedMaterial,
            materialcode,
            materialname,
            quantity,
            suppliercode,
            price,
            date,
          }
        : { materialcode, materialname, quantity, suppliercode, price, date };

      axios[updateMode ? "put" : "post"](apiUrl, requestData)
        .then((result) => {
          toastr.success(result.data);
          setMaterialcode("");
          setMaterialname("");
          setQuantity(0);
          setSuppliercode("");
          setPrice(0);
          setDate("");
          getData();
          setUpdateMode(false); // Reset update mode after submission
          setSelectedMaterial(null); // Reset selected supplier
        })
        .catch((err) => console.log(err));
    }
  };

  const openModalForUpdate = (material) => {
    setMaterialcode(material.materialcode);
    setMaterialname(material.materialname);
    setQuantity(material.quantity);
    setSuppliercode(material.suppliercode);
    setPrice(material.price);
    const dateValue = new Date(material.date).toISOString().split("T")[0];
    setDate(dateValue);
    setUpdateMode(true); // Set update mode
    setSelectedMaterial(material); // Set selected supplier for update
  };

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete("http://localhost:3001/material/" + id);
      toastr.success(data.data);
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const clearData = () => {
    setMaterialcode("");
    setMaterialname("");
    setQuantity(0);
    setSuppliercode("");
    setPrice(0);
    setDate("");
  };

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
                    <a href="#">Dashboard</a>
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
                      <div className="col-3">
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="search material by name"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="col-3"></div>
                      <div className="col-6">
                        <div className="float-right">
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                            data-toggle="modal"
                            data-target="#modal-add"
                          >
                            Add material
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card-body table-responsive p-0"
                      style={{ height: 400 }}
                    >
                      <table className="table table-head-fixed text-nowrap">
                        <thead>
                          <tr>
                            <th>Material Code</th>
                            <th>Material Name</th>
                            <th>Quantity </th>
                            <th>Supplier Code</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {materiallist.map((item) => {
                            return (
                              <tr key={item._id}>
                                <td>{item.materialcode}</td>
                                <td>{item.materialname}</td>
                                <td>{item.quantity}</td>
                                <td>{item.suppliercode}</td>
                                <td>{item.price}</td>
                                <td>{item.date}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-light mr-1"
                                    data-toggle="modal"
                                    data-target="#modal-add"
                                    onClick={() => openModalForUpdate(item)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-pencil-square"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-light mr-1"
                                    onClick={() => handleDelete(item._id)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-trash-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                  </button>
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

      {/* Add Material */}
      {/* /.modal */}
      <div className="modal fade" id="modal-add">
        <div className="modal-dialog">
          <div className="modal-content dark-mode">
            <div className="modal-header">
              <h4 className="modal-title">Material</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="materialCode">Material code</label>
                <input
                  type="text"
                  className="form-control bg-secondary"
                  id="materialCode"
                  placeholder="Enter code"
                  value={materialcode}
                  onChange={(e) => setMaterialcode(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="materialName">Material name</label>
                <input
                  type="text"
                  className="form-control bg-secondary"
                  id="materialName"
                  placeholder="Enter name"
                  value={materialname}
                  onChange={(e) => setMaterialname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="materialQuantity">Quantity</label>
                <input
                  type="text"
                  className="form-control bg-secondary"
                  id="materialQuantity"
                  placeholder="Enter qty"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="supplierCode">Supplier code</label>
                <select
                  className="form-control bg-secondary"
                  value={suppliercode}
                  onChange={(e) => setSuppliercode(e.target.value)}
                >
                  <option value="" disabled selected>
                    -select one-
                  </option>
                  {supplierlist.map((item) => {
                    return (
                      <option value={item.suppliercode}>
                        {item.suppliercode}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="materialPrice">Price</label>
                <input
                  type="text"
                  className="form-control bg-secondary"
                  id="materialPrice"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control bg-secondary"
                  id="birthdate"
                  name="birthdate"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-dismiss="modal"
                onClick={clearData}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                data-dismiss="modal"
                onClick={handleSubmit}
              >
                Save changes
              </button>{" "}
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
      {/* /.modal */}
    </div>
  );
}

export default MaterialContent;
