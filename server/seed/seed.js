require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { CUISINE, SIDE, DRINK, DESSERT } = require("../const/ItemType");
const { User } = require("../models/User");
const { Item } = require("../models/Item");
const { CartItem }  = require("../models/CartItem");
const { PwdResetToken } = require("../models/PwdResetToken");

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
  }).catch((err) => {
    console.log(err);
  });

const createSeedUsers = async () => {
  const hashedPassword1 = await bcrypt.hash("password123?!", 12);
  return [
    {
      email: "corngrub42069@gmail.com",
      password: hashedPassword1,
      validated: true
    }
  ];
};

const createSeedItems = async () => {
  return [
    {
      itemName: "Shepherd's Pie",
      itemType: CUISINE,
      itemPrice: 9,
      imgSrc: "/img/Shepherd's-Pie.jpg"
    },
    {
      itemName: "Cornmeal Fish",
      itemType: CUISINE,
      itemPrice: 10,
      imgSrc: "/img/Cornmeal-Fried-Fish.jpg"
    },
    {
      itemName: "Cornbread",
      itemType: SIDE,
      itemPrice: 3,
      imgSrc: "/img/Corn-Bread.jpg"
    },
    {
      itemName: "Grilled corn",
      itemType: SIDE,
      itemPrice: 4,
      imgSrc: "/img/Grilled-Corn.jpg"
    },
    {
      itemName: "Corn Milk",
      itemType: DRINK,
      itemPrice: 3,
      imgSrc: "/img/Corn-Milk.jpg"
    },
    {
      itemName: "Corn Beer",
      itemType: DRINK,
      itemPrice: 5,
      imgSrc: "/img/Corn-Beer.png"
    },
    {
      itemName: "Corn Pudding",
      itemType: DESSERT,
      itemPrice: 6,
      imgSrc: "/img/Corn-Pudding.jpg"
    },
    {
      itemName: "Sweet Corn Cake",
      itemType: DESSERT,
      itemPrice: 6,
      imgSrc: "/img/Sweet-Corn-Cake.jpg"
    }
  ];
};

const seedDB = async () => {
  const seedUsers = await createSeedUsers();
  const seedItems = await createSeedItems();

  await PwdResetToken.deleteMany({});
  await CartItem.deleteMany({});
  await User.deleteMany({});
  await User.insertMany(seedUsers);
  await Item.deleteMany({});
  await Item.insertMany(seedItems);
};

seedDB().then(() => {
  mongoose.connection.close();
});