const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  //create a new schema for category
  categoryname: String,
  isActive: Boolean,
});

const categories = mongoose.model("categories", categorySchema); //collection name is categories

module.exports = categories;
