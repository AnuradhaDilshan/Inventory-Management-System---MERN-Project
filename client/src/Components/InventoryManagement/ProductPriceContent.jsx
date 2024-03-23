import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toastr from "toastr/toastr";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "toastr/build/toastr.css";

function ProductPriceContent() {
  const [productcode, setProductcode] = useState("");
  const [productname, setProductname] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [suppliercode, setSuppliercode] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [supplierlist, setSupplierlist] = useState([]);
  const [productlist, setProductlist] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openModalForUpdate = (product) => {
    setProductcode(product.productcode);
    setProductname(product.productname);
    setQuantity(product.quantity);
    setSuppliercode(product.suppliercode);
    setPrice(product.price);
    const dateValue = new Date(product.date).toISOString().split("T")[0];
    setDate(dateValue);
    setUpdateMode(true); // Set update mode
    setSelectedProduct(product); // Set selected supplier for update
  };

  const clearData = () => {
    setProductcode("");
    setProductname("");
    setQuantity(0);
    setSuppliercode("");
    setPrice(0);
    setDate("");
  };

  const getData = async () => {
    try {
      let apiUrl = "http://localhost:3001/productp";
      if (searchQuery.trim() !== "") {
        apiUrl += `/search?productname=${searchQuery}`;
      }
      const data = await axios.get(apiUrl);
      setProductlist(data.data);
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

  const downloadPdf = () => {
    const doc = new jsPDF();

    const now = new Date();
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const generatedDate = now.toLocaleDateString("en-US", dateOptions);
    const generatedTime = now.toLocaleTimeString("en-US", timeOptions);

    // Titles
    doc.setFontSize(26);
    doc.text("Fashion Elegance", 14, 20);
    doc.setFontSize(10);
    doc.text("Product Price List Report", 14, 26);
    doc.setFontSize(10);
    doc.text(
      `Generated Date & Time: ${generatedDate} ${generatedTime}`,
      14,
      32
    );

    // Adding a page border
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setLineWidth(0.5);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // Draw a rectangle

    // Table setup
    const tableColumn = [
      "Product Code",
      "Supplier Code",
      "Product Name",
      "Added Date",
      "Quantity",
      "Price",
      "Total Price",
    ];
    const tableRows = [];

    productlist.forEach((item) => {
      const date = formatDate(item.date);
      // Determine if the price and total price are whole numbers or not
      const isPriceWholeNumber = item.price % 1 === 0;
      const isTotalPriceWholeNumber = (item.quantity * item.price) % 1 === 0;

      // Format price with up to 3 decimal places and commas, omitting .000 for whole numbers
      const formattedPrice = isPriceWholeNumber
        ? item.price.toLocaleString("en-US")
        : parseFloat(item.price.toFixed(3)).toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3,
          });

      // Calculate total price and format with up to 3 decimal places and commas, omitting .000 for whole numbers
      const totalPrice = item.quantity * item.price;
      const formattedTotalPrice = isTotalPriceWholeNumber
        ? totalPrice.toLocaleString("en-US")
        : parseFloat(totalPrice.toFixed(3)).toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3,
          });

      const productDetails = [
        item.productcode,
        item.suppliercode,
        item.productname,
        date,
        item.quantity,
        `LKR ${formattedPrice}`,
        `LKR ${formattedTotalPrice}`,
      ];
      tableRows.push(productDetails);
    });

    // Table styling options
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 38,
      theme: "grid",
      headStyles: { fillColor: [27, 130, 133] }, // Customize head row color
      styles: { cellPadding: 2, fontSize: 8, cellWidth: "wrap" }, // General cell styling
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
        4: { cellWidth: "auto" },
        5: { cellWidth: "auto" },
        6: { cellWidth: "auto" }, // Example: Adjusting column size
      },
    });

    doc.save("product_price_list.pdf");
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
                <h1 className="m-0">Product Price List</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Product Price</li>
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
                    <h3 className="card-title">Product Price Details</h3>
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
                          placeholder="search product by name"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="col-3"></div>
                      <div className="col-6">
                        <div className="float-right">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={downloadPdf}
                          >
                            Download Report
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
                            <th>Product Code</th>
                            <th>Supplier Code</th>
                            <th>Product Name</th>
                            <th>Added Date</th>
                            <th>Quantity </th>
                            <th>Price</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productlist.map((item) => {
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
                                <td>{item.productcode}</td>
                                <td>{item.suppliercode}</td>
                                <td>{item.productname}</td>
                                <td>{displayDate}</td>
                                <td>{item.quantity}</td>
                                <td>LKR {formattedPrice}</td>
                                <td>LKR {formattedTotalPrice}</td>
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

      {/* Add Product */}
      {/* /.modal */}
    </div>
  );
}

export default ProductPriceContent;
