const validator = require("validator");
const isEmpty = require("lodash.isempty");
// npm install validator --save
// npm install lodash.isempty

const authValidation = (req, res, next) => {
  let errors = {};
  const { email, password } = req.body;

  if (validator.isEmpty(email)) errors.email = "Email is required";
  else if (!validator.isEmail(email)) errors.email = "Enter a valid email";

  if (validator.isEmpty(password)) errors.password = "password is required";
  else if (!validator.isLength(password, { min: 8, max: 16 }))
    errors.password = "Password length must be minimum 8 character ";
  else if (!validator.matches(password, /[!@#$%^&*]/))
    errors.password = "Password must contains special character ";

  if (!isEmpty(errors)) {
    return res.status(422).json(errors);
  }

  next();
};

const categoryValidation = (req, res, next) => {
  let errors = {};
  const { categoryname } = req.body;
  if (validator.isEmpty(categoryname))
    errors.categoryname = "category name is required";
  else if (!validator.isLength(categoryname, { min: 3, max: 5 }))
    if (!isEmpty(errors)) {
      return res.status(422).json(errors);
    }

  next();
};
const productValidation = (req, res, next) => {
  let errors = {};
  const { productname, productprice, productdescription } = req.body;
  if (validator.isEmpty(productname))
    errors.productname = "product name is required";
  else if (!productprice > 0)
    errors.productname = "product price must be greater than 0";
  else if (validator.isEmpty(productdescription))
    errors.productdescription = "product description must be added";
  if (!isEmpty(errors)) {
    return res.status(422).json(errors);
  }
  next();
};

module.exports = {
  authValidation,
  categoryValidation,
  productValidation,
};
