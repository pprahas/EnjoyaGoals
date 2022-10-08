const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not present.",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        //if username is not found
        message: "Username or Password is incorrect.",
        // error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        result
          ? res.status(200).json({
              message: "Login successful.",
              user,
            })
          : res
              .status(400)
              //if password is incorrect but username exists
              .json({ message: "Username or Password is incorrect." });
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred.",
      error: error.message,
    });
  }
});

module.exports = router;
