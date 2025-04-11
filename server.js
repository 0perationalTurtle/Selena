const express = require("express");
const path = require("path");
const products = require("./data/products"); // Imported products.js file
const app = express();
const HTTP_PORT = 8080;

// Set up EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/cart", (req, res) => res.render("cart"));
app.get("/shop", (req, res) => res.render("shop"));
app.get("/shop/men", (req, res) => res.render("shop-men", { menProducts: products.men }));
app.get("/shop/women", (req, res) => res.render("shop-women", { womenProducts: products.women }));
app.get("/shop/kids", (req, res) => res.render("shop-kids", { kidsProducts: products.kids }));

// Product Description Page
app.get("/product/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = [...products.men, ...products.women, ...products.kids].find(p => p.id === productId);
  if (product) {
    res.render("product", { product });
  } else {
    res.status(404).send("Product not found");
  }
});

// Start the server
app.listen(HTTP_PORT, () => {
  console.log(`Server running at http://localhost:${HTTP_PORT}`);
});