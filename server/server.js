require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// import routes
const AuthRoutes = require("./routes/AuthRoutes");
const ItemRoutes = require("./routes/ItemRoutes");

const App = express();

App.use(express.json());
App.use(express.urlencoded({
  extended: true
}));
App.use(cookieParser());

// set app routes
App.use("/auth", AuthRoutes);
App.use("/items", ItemRoutes);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("DB connected");
    App.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  }).catch((err) => {
    console.log(err);
  });

module.exports = { App };