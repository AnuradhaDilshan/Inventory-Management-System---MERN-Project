const mongoose = require("mongoose");

const ExchangeSchema = new mongoose.Schema({
  exchangecode: { type: String, required: true },
  exchangename: { type: String, required: true },
  quantity: { type: Number, required: true },
  solddate: { type: Date, required: true },
  Addeddate: { type: Date, required: true },
});

const ExchangeModel = mongoose.model("exchanges", ExchangeSchema);
module.exports = ExchangeModel;
