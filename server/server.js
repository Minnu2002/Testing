const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs"); // Import the file system module
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect("mongodb://mongo:27017/seassignment", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Once MongoDB connection is open
db.once("open", () => {
  console.log("Connected to MongoDB Atlas"); // Print success message
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
  country: String,
  phone: String,
});

const User = mongoose.model("User", userSchema);

app.use(express.json());

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, password, age, country, phone } = req.body;
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username is already taken");
    }
    const newUser = new User({ username, password, age, country, phone });
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error signing up");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.password !== password) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign({ username: user.username }, "secretkey");
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

// Route to fetch user details based on JWT token
app.get("/user-details", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    const decoded = jwt.verify(token, "secretkey");
    if (!decoded) {
      return res.status(401).send("Unauthorized");
    }
    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({
      username: user.username,
      age: user.age,
      country: user.country,
      phone: user.phone,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user details");
  }
});

// Define schema for Product
const productSchema = new mongoose.Schema({
  name: String,
  imageUrl: String, // Changed to store image path
  quantity: Number,
});

const Product = mongoose.model("Product", productSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "pictures"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Replace spaces and periods with underscores and convert to lowercase
    const modifiedFileName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/\./g, "_")
      .toLowerCase();
    const uniqueFileName =
      modifiedFileName + "-" + uniqueSuffix + path.extname(file.originalname);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
// Serve static files including images from the 'pictures' directory
app.use("/pictures", express.static(path.join(__dirname, "pictures")));

// Add Product endpoint
app.post("/addProduct", upload.single("image"), async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = new Product({
      name,
      imageUrl: req.file.filename,
      quantity,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Product endpoint
app.delete("/deleteProduct/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Delete the associated image file from the 'pictures' folder
    fs.unlinkSync(path.join(__dirname, "pictures", deletedProduct.imageUrl));
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Product endpoint
app.put("/updateProduct/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, imageUrl, quantity } = req.body;

    // Find the product by ID and update its fields
    await Product.findByIdAndUpdate(productId, { name, imageUrl, quantity });

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all Products endpoint
app.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products); // Return the list of products
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to calculate sum of two numbers
app.get("/add", (req, res) => {
  const { num1, num2 } = req.query;
  const sum = parseFloat(num1) + parseFloat(num2);
  res.json({ sum });
});

// Route for all other requests - serve index.html for client-side routing.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
