const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_ATLAS_URI;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI || URI, connectionParams);
  mongoose.Promote = global.Promise;

  mongoose.connection.on("connected", () => {
    console.log("Connected to database: " + URI);
  });

  mongoose.connection.on("error", (err) => {
    console.log("Database connection error: " + err);
  });
};

module.exports = connectDB;
