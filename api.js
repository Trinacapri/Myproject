//here we will define all our api endpoints

const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const isEmpty = require("lodash.isempty");
const Category = require("../models/category");
const Product = require("../models/product");
const {
  authValidation,
  categoryValidation,
  productValidation,
} = require("../middleware/validation");
const authorize = require("../middleware/authorized");
// npm install nodemon --dev
// npm run dev
// npm start

//api endpoints

router.post("/register", authValidation, async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save(); // new user saved in database

    // const token = await User.generateAuthToken();
    const payload = { userId: user.id };
    const token = await jwt.sign(payload, "secretkey");

    res.status(201).json({ token }); //converting into json
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: true });
  }
});

router.post("/login", authValidation, async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const payload = { userId: user.id };
    const token = await jwt.sign(payload, "secretkey");
    // const token = await User.generateAuthToken();
    res.status(201).json({ token }); //converting into json
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: true });
  }
});

router.post("/category", authorize, categoryValidation, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const category = await newCategory.save(); // new category saved in database
    res.status(200).json(category); //converting into json
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/category", authorize, async (req, res) => {
  try {
    const categories = await Category.find({});
    if (isEmpty(categories)) {
      return res.status(400).json({ error: "No categories found" });
    }
    res.status(200).json(categories); //converting into json
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/product", authorize, productValidation, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const product = await newProduct.save(); // new category saved in database
    res.status(200).json(product); //converting into json
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/product", authorize, async (req, res) => {
  try {
    const products = await Product.find({});
    if (isEmpty(products)) {
      return res.status(400).json({ error: "No products found" });
    }
    res.status(200).json(products); //converting into json
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
