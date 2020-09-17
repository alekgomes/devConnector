const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Banco de dados conectado...");
  } catch (error) {
    console.error(error);
    // Exit process caso erro
    process.exit(1);
  }
};

module.exports = connectDB;
