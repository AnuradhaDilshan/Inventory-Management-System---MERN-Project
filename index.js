const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formidable = require("express-formidable");
const fs = require("fs");
const UserModel = require("./server/models/User");
const SuppliersModel = require("./server/models/Supplier");
const MaterialModel = require("./server/models/Material");
const ProductModel = require("./server/models/Product");
const ExchangeModel = require("./server/models/Exchange");
const slugify = require("slugify");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://deshansameera1100:deshan12345@cluster0.4vruico.mongodb.net/"
);

//login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username: username })
    .then((user) => {
      if (user) {
        if (user.password == password) {
          res.json({
            username: user.username,
            role: user.role,
          });
        } else {
          res.json("Invalid Password");
        }
      } else {
        res.json("Invalid User");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json("Internal Server Error");
    });
});

// --------------------------------------------------------

//supplierCreate
app.post("/supplier", async (req, res) => {
  try {
    const supplier = await SuppliersModel.create(req.body);
    res.json("Supplier Created");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//supplierRead
app.get("/supplier", async (req, res) => {
  try {
    const suppliers = await SuppliersModel.find();
    res.json(suppliers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//supplierReadSearch
app.get("/supplier/search", async (req, res) => {
  try {
    const { suppliername } = req.query;

    const suppliers = await SuppliersModel.find({
      suppliername: { $regex: suppliername, $options: "i" },
    });
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//supplierReadforMaterial
app.get("/supplier/active", async (req, res) => {
  try {
    const suppliers = await SuppliersModel.find({ status: "Active" });
    res.json(suppliers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//supplierUpdate
app.put("/supplier/:id", async (req, res) => {
  try {
    const supplier = await SuppliersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json("Supplier Updated");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//supplierDelete
app.delete("/supplier/:id", async (req, res) => {
  try {
    await SuppliersModel.findByIdAndDelete(req.params.id);
    res.json("Supplier Deleted");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --------------------------------------------------------

//materialCreate
app.post("/material", async (req, res) => {
  try {
    const material = await MaterialModel.create(req.body);
    res.json("Material Created");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//materialRead
app.get("/material", async (req, res) => {
  try {
    const materials = await MaterialModel.find();
    res.json(materials);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//materialReadSearch
app.get("/material/search", async (req, res) => {
  try {
    const { materialname } = req.query;

    const materials = await MaterialModel.find({
      materialname: { $regex: materialname, $options: "i" },
    });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//materialUpdate
app.put("/material/:id", async (req, res) => {
  try {
    const material = await MaterialModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json("Material Updated");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//materialDelete
app.delete("/material/:id", async (req, res) => {
  try {
    await MaterialModel.findByIdAndDelete(req.params.id);
    res.json("Material Deleted");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --------------------------------------------------------

//productCreate
app.post("/product", formidable(), async (req, res) => {
  try {
    const {
      productcode,
      productname,
      description,
      quantity,
      suppliercode,
      price,
      date,
    } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !productcode:
        return res.status(500).send({ error: "Product Code is Required" });
      case !productname:
        return res.status(500).send({ error: "Product Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !suppliercode:
        return res.status(500).send({ error: "Supplier Code is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !date:
        return res.status(500).send({ error: "Date is Required" });
      case photo && photo.size > 3000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and Should be less then 3MB" });
    }
    const product = await ProductModel.create({
      ...req.fields,
      slug: slugify(productname),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.json("Product Created");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//productRead
app.get("/product", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//productReadSearch
app.get("/product/search", async (req, res) => {
  try {
    const { productname } = req.query;

    const products = await ProductModel.find({
      productname: { $regex: productname, $options: "i" },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//productUpdate
app.put("/product/:id", formidable(), async (req, res) => {
  try {
    const {
      productcode,
      productname,
      description,
      quantity,
      suppliercode,
      price,
      date,
    } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !productcode:
        return res.status(500).send({ error: "Product Code is Required" });
      case !productname:
        return res.status(500).send({ error: "Product Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !suppliercode:
        return res.status(500).send({ error: "Supplier Code is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !date:
        return res.status(500).send({ error: "Date is Required" });
      case photo && photo.size > 3000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and Should be less then 3MB" });
    }
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(productname) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.json("Product Updated");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//productDelete
app.delete("/product/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json("Product Deleted");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --------------------------------------------------------

//exchangeCreate
app.post("/exchange", async (req, res) => {
  try {
    const exchange = await ExchangeModel.create(req.body);
    res.json("Ex.Item Created");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//exchangeRead
app.get("/exchange", async (req, res) => {
  try {
    const exchanges = await ExchangeModel.find();
    res.json(exchanges);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//exchangeReadSearch
app.get("/exchange/search", async (req, res) => {
  try {
    const { exchangename } = req.query;

    const exchanges = await ExchangeModel.find({
      exchangename: { $regex: exchangename, $options: "i" },
    });
    res.json(exchanges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//exchangeUpdate
app.put("/exchange/:id", async (req, res) => {
  try {
    const exchange = await ExchangeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json("Ex.Item Updated");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//exchangeDelete
app.delete("/exchange/:id", async (req, res) => {
  try {
    await ExchangeModel.findByIdAndDelete(req.params.id);
    res.json("Ex.Item Deleted");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server is Running on PORT: 3001 ");
});
