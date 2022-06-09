const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

//Testing endpoint

app.get("/", (req, res) => {
  res.status(200).json("Up and running");
});

app.listen(PORT, () => {
  console.log(`App running on port : ${PORT}`);
});
