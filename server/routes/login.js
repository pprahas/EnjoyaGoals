const User = require("../models/UserModel");
const convertID = require("../helpers/ConvertIDs");
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

      var userObj = new Object();
      userObj = JSON.parse(JSON.stringify(full_user_data));
      userObj = userObj[0];

      // converting each Room _id in the User's rooms[] to a room object
      if (userObj.rooms) {
        const newRoomPromises = userObj.rooms.map(convertID.convertRoomID);
        const newRooms = await Promise.all(newRoomPromises);
        // replace the rooms[] array with the array of Room Objects
        userObj.rooms = newRooms;
        // *NOTE, DO NOT DO findRes.save() !!!!! WE DO NOT WANT TO
        // REWRITE THE OBJECT IN THE DATABASE, WE WANT rooms[]
        // TO STORE IDs IN THE DATABASE
      }

      console.log(userObj);
      

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
          res.status(200).send(userObj);
        } else {
          res
            .status(403)
            .send({ message: " Incorrect Email or Password. Try again." });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "Something went wrong" });
  }
});

module.exports = router;
