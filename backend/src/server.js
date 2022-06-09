const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");

const app = express();

//Base middleware
app.use(cors());
//Testing endpoint

const data = [
  {
    id: Date.now(),
    name: "Victor",
    age: 25,
    job: "software developer",
  },
  {
    id: Date.now(),
    name: "Owiti",
    age: 25,
    job: "software engineer",
  },
];
app.get("/api", (req, res) => {
  console.log("api endpoint hit");
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`App running on port : ${PORT}`);
});
