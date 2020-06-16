const mongoose = require("mongoose");
const Schema = mongoose.Schema; //get  instance of mongoose schema

const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  //create a new schema for user
  email: String,
  password: String,
});

// npm install --save express-validator

// userSchema.methods.generateAuthToken = async () => {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, "secretkey");
//   return token;
// };

//find the user by the user credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await users.findOne({ email }); //finding the user by the email

  if (!user) {
    throw new Error("unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("unable to login");
  }

  return user;
};
//hashing the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this; //getting the access of the user

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// users collection / model
const users = mongoose.model("users", userSchema); //fisrt param is the model name and this is the collection name

module.exports = users; //created a mongoose modle to crud operation in the databse
