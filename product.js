const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  //create a new schema for product
  categoryid: String,
  productname: String,
  productprice: Number,
  isActive: Boolean,

});

const products = mongoose.model("products", productSchema); //collection name is products

module.exports = products;
