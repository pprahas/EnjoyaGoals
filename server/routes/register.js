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
        .status(400)
        .json({ msg: "Username or email has already been taken." });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);

      const dbUser = new User({
        username: user.username.toLowerCase(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email.toLowerCase(),
        phoneNum: user.phoneNum,
        aboutMe: user.aboutMe,
        password: user.password,
        pointsEarned: { yes: 0 },
        aboutMe: { yes: "yes" },
      });

      await dbUser.save();
      sendEmail.sendEmailRegister(user.email, user.firstName);

      // sendEmail.sendEmailRegister(takenEmail, user.firstName);

      return res
        .status(201)
        .json({ msg: "Your account has been created successfully." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Registration Failed." });
  }
});

module.exports = router;
