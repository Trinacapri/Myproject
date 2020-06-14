//here we will definr all our api endpoints

const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Category = require("../models/category");
router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
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
    res.status(400).json();
  }
});

router.post("/category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const category = await newCategory.save(); // new category saved in database
    res.status(200).json(category); //converting into json
  } catch (e) {
    res.status(400).json(e);
  }
});

// router.post("/product", async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     const product = await newProduct.save(); // new category saved in database
//     res.status(200).json(product); //converting into json
//   } catch (e) {
//     res.status(400).json(e);
//   }
// });

// router.get("/product", async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     const product = await newProduct.save(); // new category saved in database
//     res.status(200).json(product); //converting into json
//   } catch (e) {
//     res.status(400).json(e);
//   }
// });

module.exports = router;
