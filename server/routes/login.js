const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const express = require("express");

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
      const password = user.password;
      if (!password) {
        return res.json({
          message: "Incorrect Email or Password. Try again.",
        });
      }
      bcrypt.compare(password, takenEmail.password).then((match) => {
        if (match) {
          res.status(200).send({ message: "Login Successful." });
        } else {
          res
            .status(403)
            .send({ message: " Incorrect Email or Password. Try again." });
        }
      });
    }
  } catch (error) {
    res.send({ status: "error" });
  }
});

module.exports = router;
