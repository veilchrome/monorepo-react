const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/ani";

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(`${MONGO_URI}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectMongo;
