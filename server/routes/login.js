const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const express = require("express");
require("dotenv").config();

const router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
  const user = req.body;
  try {
    const takenEmail = await User.findOne({ email: user.email });

    if (!takenEmail) {
      res
        .status(403)
        .send({ message: "Incorrect Email or Password. Try again." });
      // res.json({ message: "Email does not exist." });
    } else {
      // const fullUser = await User.findOne({ email: takenEmail });
      // const full_user_data = await User.find({ username: "prado156" });
      const full_user_data = await User.find({ email: user.email });
      const password = user.password;
      if (!password) {
        return res.json({
          message: "Incorrect Email or Password. Try again.",
        });
      }
      bcrypt.compare(password, takenEmail.password).then((match) => {
        if (match) {
          // console.log("USER DEETS");
          // res.send({ message: "User deets" });
          // res.send(prado);
          // res.status(200).send({ message: "Login Successful." });
          res.status(200).send(full_user_data);
        } else {
          res
            .status(403)
            .send({ message: " Incorrect Email or Password. Try again." });
        }
      });
    }
  } catch (error) {
    res.send({ status: "Something went wrong" });
  }
});

module.exports = router;
