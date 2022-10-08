const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
  const user = req.body;

  try {
    const takenUsername = await User.findOne({ username: user.username });
    const takenEmail = await User.findOne({ email: user.email });

    if (takenUsername || takenEmail) {
      res.json({ message: "Username or email has already been taken." });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);

      const dbUser = new User({
        username: user.username.toLowerCase(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email.toLowerCase(),
        password: user.password,
      });

      dbUser.save();
      res.json({ message: "Success" });
    }
  } catch (error) {
    res.send({ status: "error" });
  }
});

module.exports = router;
