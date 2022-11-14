// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// app
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
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
express.urlencoded({ extended: true });

// routes
const registerRoutes = require("./routes/register");
app.use("/register", registerRoutes);

const aboutme = require("./routes/AboutMe");
app.use("/about_me", aboutme);

const loginRoutes = require("./routes/login");
app.use("/login", loginRoutes);

const forgotPasswordRoutes = require("./routes/forgot_password");
app.use("/forgot_password", forgotPasswordRoutes);

const resetPasswordRoutes = require("./routes/reset_password");
app.use("/reset_password", resetPasswordRoutes);

const queryDBRoutes = require("./routes/query_database");
app.use("/query_database", queryDBRoutes);

const taskRoutes = require("./routes/task");
app.use("/task", taskRoutes);

const roomRoutes = require("./routes/room");
app.use("/room", roomRoutes);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const progressBarRoutes = require("./routes/progress_bar");
app.use("/progress_bar", progressBarRoutes);

// port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () =>
  console.log(`Server is running on ${port}`)
);
