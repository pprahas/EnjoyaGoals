const createToken = require("../helpers/CreateToken");
const sendEmail = require("../helpers/SendEmail");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    // const email = "p.pwefwfef";
    // const activation_token = createToken.activation({ email });
    // let url = "yeah boid q3";
    // url = activation_token;
    // sendEmail.sendEmailRegister(email, url, "pls work");
    // res.status(200).json({ msg: activation_token });
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ msg: "Email does not exist." });
    const ac_token = createToken.activation({ email: user.email });

    sendEmail.sendEmailReset(email, ac_token, "", user.firstName);

    user.tokenString = ac_token;
    await user.save();

    res.status(200).json({ msg: "sent the fucking email" });
  } catch (error) {
    res.status(200).json({ msg: "erroe" });
  }
});

module.exports = router;
