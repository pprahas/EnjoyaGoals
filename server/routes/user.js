const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const Room = require("../models/RoomModel");
const mongoose = require("mongoose");
const convertID = require("../helpers/ConvertIDs");

router.use(express.json());

// route for updating a field of an existing user
router.post("/update", async (req, res) => {
  // this request should contain:
  // "id":        the `_id` of the user,
  // "fieldName": the name of the field to be changed,
  // "value":     and the new value
  const userToUpdate = await User.findById(req.body.id);
  if (userToUpdate == null) {
    console.log("Error at /user/update, userToUpdate is null");
    console.log("req.body = ", req.body);
    return res.status(500).json({ msg: "Updating user failed." });
  }

  try {
    switch (req.body.fieldName) {
      case "rooms":
        // to add or remove a room, request should also contain ONE of the following:
        // "add":		true
        // "remove":	true
        if (req.body.add) {
          userToUpdate.rooms.push(req.body.value);
        } else if (req.body.remove) {
          console.log("userToUpdate = ", userToUpdate);
          if (userToUpdate.rooms != null) {
            userToUpdate.rooms.pull(req.body.value);
          } else {
            console.log("error updating User's rooms");
            console.log("userToUpdate = ", userToUpdate);
            return res.status(501).json({
              msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon.",
            });
          }
        } else {
          console.log(
            "SOMETHING IS WRONG WITH THE /user/update ROUTE FOR UPDATING rooms"
          );
          return res.status(501).json({
            msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon.",
          });
        }
        break;
    }

    await userToUpdate.save();
    return res.status(200).json({ msg: "User updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Updating user failed." });
  }
});

// route for updating a field of an existing user *THAT DIRECTLY RETURNS USER OBJECT RATHER THAN A MESSAGE
router.post("/updateOM", async (req, res) => {
  // this request should contain:
  // "id":        the `_id` of the user,
  // "fieldName": the name of the field to be changed,
  // "value":     and the new value
  const userToUpdate = await User.findById(req.body.id);
  if (userToUpdate == null) {
    console.log("Error at /user/update, userToUpdate is null");
    console.log("req.body = ", req.body);
    return res.status(500).json({ msg: "Updating user failed." });
  }

  try {
    switch (req.body.fieldName) {
      case "rooms":
        // to add or remove a room, request should also contain ONE of the following:
        // "add":		true
        // "remove":	true
        if (req.body.add) {
          userToUpdate.rooms.push(req.body.value);
          userToUpdate.pointsEarned.set(req.body.value, 0);
        } else if (req.body.remove) {
          console.log("userToUpdate = ", userToUpdate);
          if (userToUpdate.rooms != null) {
            userToUpdate.rooms.pull(req.body.value);
          } else {
            console.log("error updating User's rooms");
            console.log("userToUpdate = ", userToUpdate);
            return res.status(501).json({
              msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon.",
            });
          }
        } else {
          console.log(
            "SOMETHING IS WRONG WITH THE /user/update ROUTE FOR UPDATING rooms"
          );
          return res.status(501).json({
            msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon.",
          });
        }
        break;
    }

    await userToUpdate.save();

    if (userToUpdate.rooms != null) {
      // converting each Room _id in the User's rooms[] to a room object
      const newRoomPromises = userToUpdate.rooms.map(convertID.convertRoomID);
      const newRooms = await Promise.all(newRoomPromises);
      // replace the rooms[] array with the array of Room Objects
      userToUpdate.rooms = newRooms;
      // *NOTE, DO NOT DO findRes.save() !!!!! WE DO NOT WANT TO
      // REWRITE THE OBJECT IN THE DATABASE, WE WANT rooms[]
      // TO STORE IDs IN THE DATABASE

      return res.status(200).json(userToUpdate);
    } else {
      console.log("error converting user's rooms");
      console.log("userToUpdate = ", userToUpdate);
      res.status(500).json({ msg: "User query failed." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Updating user failed." });
  }
});

router.post("/getRoomUsers", async (req, res) => {
  try {
    const roomToGet = await Room.findById(req.body.id);
    let userNames = [];
    let user_points_map = new Map();
    let array_b4_sort = [];
    for (let i = 0; i < roomToGet.users.length; i++) {
      const user = await User.findById(roomToGet.users[i]);
      let levelname = "1 " + user.username;
      if (!userNames.includes(levelname)) {
        let pointsEarned = 0;
        if (user.pointsEarned.has(req.body.id)) {
          pointsEarned = user.pointsEarned.get(req.body.id);
        } else {
          pointsEarned = 0;
        }
        let level = Math.floor(pointsEarned / 100) + 1;
        let st = level.toString() + " " + user.username;
        userNames.push(st);

        array_b4_sort.push({
          name: user.username,
          value: level,
        });

        // user_points_map.set(user.username, level);
        user_points_map.set("hjwef", "yah");

        userNames.push(levelname);
      }

      let user_map = new Map();
      user_map = {
        prado: 1000,
        ryan: 213,
      };

      console.log("the map iis", user_points_map);
      console.log("the user map iis", user_map);

      console.log("the keys are", array_b4_sort);
      for (
        var a = 0, keys = Object.keys(user_points_map), ii = keys.length;
        a < ii;
        a++
      ) {
        console.log("key : " + keys[a] + " val : " + user_points_map[keys[a]]);
      }
      var array = [];
      for (var key in user_points_map) {
        console.log("kkey", key);
        array.push({
          name: key,
          value: user_points_map.get(key),
        });
      }

      console.log("the array iis", array);
      var sorted = array_b4_sort.sort(function (a, b) {
        return a.value < b.value ? 1 : b.value < a.value ? -1 : 0;
      });
    }

    res.status(200).send(sorted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Getting user failed." });
  }
});
module.exports = router;
