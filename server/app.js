// import modules

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const User = require('./models/UserModel.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//app
const app = express();

// mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Enjoyagoals DB Connected"))
  .catch((err) => console.log("Enjoyagoals DB Not Connected"));

// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

// routes
const registerRoutes = require("./routes/register");
app.use("/register", registerRoutes);

// port
const port = process.env.PORT || 8080;

//listener
const server = app.listen(port, () =>
  console.log(`Server is running on ${port}`)
);