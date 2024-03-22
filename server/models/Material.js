const mongoose = require("mongoose")

const MaterialSchema =  new mongoose.Schema({
    materialcode: String,
    materialname: String,
    quantity: Number,
    suppliercode: String,
    price: Number,
    date: Date
})

const MaterialModel = mongoose.model("materials", MaterialSchema)
module.exports = MaterialModel