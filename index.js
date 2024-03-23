const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./server/models/User");
const SuppliersModel = require("./server/models/Supplier");
const MaterialModel = require("./server/models/Material");
const ProductModel = require("./server/models/Product");

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
          res.json("Invalid password");
        }
      } else {
        res.json("Invalid user");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json("Internal Server Error");
    });
});

//supplierCreate
app.post("/supplier", async (req, res) => {
  try {
    const supplier = await SuppliersModel.create(req.body);
    res.json("Supplier created");
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
    const suppliers = await SuppliersModel.find({ status: "active" });
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
    res.json("Supplier updated");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//supplierDelete
app.delete("/supplier/:id", async (req, res) => {
  try {
    await SuppliersModel.findByIdAndDelete(req.params.id);
    res.json("Supplier deleted");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//materialCreate
app.post("/material", async (req, res) => {
  try {
    const material = await MaterialModel.create(req.body);
    res.json("Material created");
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
    res.json("Material updated");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//materialDelete
app.delete("/material/:id", async (req, res) => {
  try {
    await MaterialModel.findByIdAndDelete(req.params.id);
    res.json("Material deleted");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --------------------------------------------------------

//productCreate
app.post("/productp", async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.json("Product created");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//productRead
app.get("/productp", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//productReadSearch
app.get("/productp/search", async (req, res) => {
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
app.put("/productp/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json("Product updated");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//productDelete
app.delete("/productp/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json("Product deleted");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --------------------------------------------------------

app.listen(3001, () => {
  console.log("server is running ");
});
