require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const AuthRoutes = require("./src/routes/AuthRoutes");

const App = express();

App.use(express.json());
App.use(express.urlencoded());
App.use(cookieParser());

App.use("/auth", AuthRoutes);

// Define DB_URI and PORT in .env file

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB connected");
    App.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
  console.log(err);
});