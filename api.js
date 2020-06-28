//here we will define all our api endpoints

const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const isEmpty = require("lodash.isempty");
const Category = require("../models/category");
const Product = require("../models/product");
const multer = require("multer");
const {
  authValidation,
  categoryValidation,
  productValidation,
} = require("../middleware/validation");
const authorize = require("../middleware/authorized");
// npm install nodemon --dev
// npm run dev
// npm start

router.use(express.static((_dirname = "./public/")));
const Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

//upload middleware
const upload = multer({ storage: Storage }).single("file");
//api endpoints

router.post("/upload", upload, function (req, res, next) {
  const file = req.file;
  if (!file) {
    const error = new Error("please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});
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
//adding category
router.post("/category", authorize, categoryValidation, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const category = await newCategory.save(); // new category saved in database
    res.status(200).json(category); //converting into json
  } catch (e) {
    res.status(400).json(e);
  }
});
//getting category details

// router.get("/category", authorize, async (req, res) => {
//   try {
//     const categories = await Category.find({});
//     if (isEmpty(categories)) {
//       return res.status(400).json({ error: "No categories found" });
//     }
//     res.status(200).json(categories); //converting into json
//   } catch (e) {
//     res.status(400).json(e);
//   }
// });

router.get("/category", async (req, res, next) => {
  Category.find({})
    .populate("product")

    .exec()
    .then((data) => {
      res.status(201).json({
        data: data,
        status: "success",
        message: "category details found",
      });
    })
    .catch((er) => {
      res.status(500).json({
        data: er,
        status: "failed",
        message: "Internal server error",
      });
    });
});
//updating category
router.patch("/category", authorize, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["categoryname"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).json({ error: "invalid updates" });
  }
  try {
    const categories = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (isEmpty(categories)) {
      return res.status(400).json({ error: "No products found" });
    }
    res.send(categories);
  } catch {
    res.status(400).json(e);
  }
});

//deleting category
router.delete("/category", authorize, async (req, res) => {
  try {
    const categories = await product.findByIdAndDelete(req.params.id);
    if (!categories) {
      return res.status(404).json();
    }
    res.send(categories);
  } catch (e) {
    res.status(500).json(e);
  }
});

//adding product

router.post(
  "/product",
  authorize,
  productValidation,
  upload,
  async (req, res) => {
    try {
      const newProduct = new Product({
        productname: re.body.productname,
        productprice: req.body.productprice,
        productdiscount: req.body.productdiscount,
        productdoseInMG: req.body.productdoesInMG,

        productmgfdate: req.body.productmfgdate,
        productexpiredate: req.body.productexpiredate,
        productpriceWithDiscount: req.body.productpricewithDiscount,
        productdescription: req.body.productdescription,
        productimage: req.body.productimage,
        categoryid: req.body.categoryid,
      });
      const product = await newProduct.save(); // new category saved in database
      res.status(200).json(product); //converting into json
    } catch (e) {
      res.status(400).json(e);
    }
  }
);

//getting product details

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

//updating product details

router.patch("/product", authorize, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    " productname",
    "productprice",
    "productdiscount",
    "productpriceWithDiscount",
    "productdoseInMG",
    "productmgfdate",
    "productexpiredate",
    "productdescription",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).json({ error: "invalid updates" });
  }
  try {
    const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (isEmpty(products)) {
      return res.status(400).json({ error: "No products found" });
    }
    res.send(products);
  } catch {
    res.status(400).json(e);
  }
});

//deleting product

router.delete("/product", authorize, async (req, res) => {
  try {
    const product = await product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json();
    }
    res.send(product);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
