const mongoose = require("mongoose")

const SupplierSchema =  new mongoose.Schema({
    suppliercode: String,
    suppliername: String,
    registereddate: Date,
    status: String,
})

const SuppliersModel = mongoose.model("suppliers", SupplierSchema)
module.exports = SuppliersModel