require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const AuthRoutes = require("./routes/AuthRoutes");

const App = express();

App.use(express.json());
App.use(express.urlencoded());
App.use(cookieParser());

App.use("/auth", AuthRoutes);

let database;
if (process.env.NODE_ENV === "testing") {
  database = process.env.DB_URI_TESTING;
} else {
  database = process.env.DB_URI_MAIN;
}

mongoose
  .connect(database)
  .then(() => {
    console.log("DB connected");
    App.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
  console.log(err);
});