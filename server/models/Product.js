const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productcode: String,
  productname: String,
  quantity: Number,
  suppliercode: String,
  price: Number,
  date: Date,
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
