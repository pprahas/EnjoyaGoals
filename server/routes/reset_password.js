const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const tokenString = data.token;
    const user = await User.findOne({ username: data.username });

    if (user.tokenString == tokenString) {
      //reset password
      let new_hashed_password = await bcrypt.hash(data.password, 10);
      user.password = new_hashed_password;
      await user.save();
    } else {
      return res.status(403).json({ msg: "Wrong Token." });
    }
    //return successful
    return res
      .status(200)
      .json({ msg: "Password has been successfully reset" });
  } catch (error) {
    return res.status(403).json({ msg: "Password failed to reset." });
  }
});

module.exports = router;
