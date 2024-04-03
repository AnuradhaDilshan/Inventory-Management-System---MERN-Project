const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productcode: { type: String, required: true },
  productname: { type: String, required: true },
  slug: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  photo: {
    data: Buffer,
    contentType: String,
  },
  quantity: { type: Number, required: true },
  suppliercode: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
