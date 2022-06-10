const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const connectDb = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const app = express();

//Database connection
connectDb();

//Base middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);

//error middleware

app.use(notFound);
app.use(errorHandler);

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
