const mongoose = require("mongoose");

async function connectDb() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected at ${connect.connection.host}`.blue.underline);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDb;
