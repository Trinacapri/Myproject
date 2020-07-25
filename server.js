const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const PORT = 5000; //on 3000 port the express server is running on
const app = express(); //create an instance if express
const api = require("./routes/api");
app.use(bodyParser.json()); //specify the bodyparser to handle the json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());//cors is a middleware to run the frontend and backedend togethrt from them different port
app.use(express.static(path.join(__dirname, "public")));
const db =
  "mongodb+srv://tri:Trina1234@cluster0-hcrj8.mongodb.net/eventsdb?retryWrites=true&w=majority"; //get the link of the database

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error("Error!" + err);
  });

app.use("/api", api);
app.get("/", function (req, res) {
  res.send("hello from server");
});

app.listen(PORT, function () {
  console.log("server running on:" + PORT);
});
