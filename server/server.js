require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// import routes
const AuthRoutes = require("./routes/AuthRoutes");
const ItemRoutes = require("./routes/ItemRoutes");
const CartRoutes = require("./routes/CartRoutes");

const App = express();

App.use(express.json());
App.use(express.urlencoded({
  extended: true
}));
App.use(cookieParser());

// set app routes
App.use("/api/auth", AuthRoutes);
App.use("/api/items", ItemRoutes);
App.use("/api/cart", CartRoutes);

let database;
if (process.env.ENV_TYPE === "test") {
  console.log("Connecting to test db");
  database = process.env.DB_LOCAL;
} else {
  console.log("Connecting to prod db");
  database = process.env.DB_URI;
}

mongoose
  .connect(database, {
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