const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const express = require("express");
const sendEmail = require("../helpers/SendEmail");

const router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
  const user = req.body;

  try {
    const takenUsername = await User.findOne({ username: user.username });
    const takenEmail = await User.findOne({ email: user.email });

    if (takenUsername || takenEmail) {
      return res
        .status(403)
        .json({ msg: "Username or email has already been taken." });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);

      const dbUser = new User({
        username: user.username.toLowerCase(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email.toLowerCase(),
        password: user.password,
      });

      sendEmail.sendEmailRegister(user.email, user.firstName);
      await dbUser.save();

      // sendEmail.sendEmailRegister(takenEmail, user.firstName);

      return res.status(200).json({ msg: "Your account has been created." });
    }
  } catch (error) {
    return res.status(403).json({ msg: "Registration Failed" });
  }
});

module.exports = router;
