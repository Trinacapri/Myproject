const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  //create a new schema for product
  productname: String,
  productprice: String,
  productdiscount: String,
  productpriceWithDiscount: String,
  productdoseInMG: String,
  productmgfdate: String,
  productexpiredate: String,
  productdescription: String,
  productimage:String, 

  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },

  // isActive: Boolean,
});

const products = mongoose.model("products", productSchema); //collection name is products

module.exports = products;
