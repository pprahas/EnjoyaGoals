const createToken = require("../helpers/CreateToken");
const sendEmail = require("../helpers/SendEmail");
const User = require("../models/UserModel");
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
    if (!user) return res.status(403).json({ msg: "Incorrect Email address." });
    const ac_token = createToken.activation({ email: user.email });

    sendEmail.sendEmailReset(email, ac_token, "", user.firstName);

    user.tokenString = ac_token;
    await user.save();

    return res
      .status(200)
      .json({ msg: "A token has been sent to your email." });
  } catch (error) {
    return res.status(403).json({ msg: "Incorrect Email address." });
  }
});

module.exports = router;
