const mongoose = require("mongoose");

const ExchangeSchema = new mongoose.Schema({
  exchangecode: { type: String, required: true },
  productcode: { type: String, required: true },
  cus_name: { type: String, required: true },
  cus_email: { type: String, required: true },
  exchangename: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  solddate: { type: Date, required: true },
  addeddate: { type: Date, required: true },
});

const ExchangeModel = mongoose.model("exchanges", ExchangeSchema);
module.exports = ExchangeModel;
