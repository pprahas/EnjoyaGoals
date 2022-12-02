const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const Room = require("../models/RoomModel");
const convertID = require("../helpers/ConvertIDs");
const Image = require("../models/ImageModel");
const cookieHandler = require("../helpers/CookieHandler");

router.use(express.json());

// route for updating a field of an existing user
router.post("/update", cookieHandler.checkCookie2, async (req, res) => {
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
router.post("/updateOM", cookieHandler.checkCookie2, async (req, res) => {
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

router.post("/getRoomUsers", cookieHandler.checkCookie2, async (req, res) => {
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

      // console.log("the map iis", user_points_map);
      // console.log("the user map iis", user_map);

      for (
        var a = 0, keys = Object.keys(user_points_map), ii = keys.length;
        a < ii;
        a++
      ) {
        console.log("key : " + keys[a] + " val : " + user_points_map[keys[a]]);
        console.log("kkey", keys[a]);
        array.push({
          name: keys[a],
          value: user_points_map[keys[a]],
        });

      }
      var array = [];
      //console.log("kjashdflkajds", user_points_map);
/*
      for (var key in user_points_map) {
        // console.log("kkey", key);
        array.push({
          name: key,
          value: user_points_map.get(key),
        });
      }*/

      // console.log("the array iis", array);
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


router.post("/pic_upload", cookieHandler.checkCookie2, async (req, res) => {
  let user_id;
  let file;
  let fileName;
  try {
    //console.log(req.body);
    user_id = req.body.user_id;
    fileName = req.body.fileName;
    file = req.body.fileData;
    let binData = new Buffer(file.split(",")[1], "base64");
    let filetype = file.split(",")[0] + ",";
    let img = new Buffer(binData, 'base64');

    let res = await Image.create({ "name": fileName, "image": img, "filetype": filetype, "user_id": user_id, });
    const user = await User.findById(user_id);

    if (fileName === "pfp") {
      user.pfp = res._id;
      await user.save();
      return;
    }
    else if (fileName === "banner") {
      user.banner = res._id;
      await user.save();
      return;
    }
    return;
  } catch (error) {
    return res.status(400).json(error);
  }
});
router.post("/set_color", cookieHandler.checkCookie2, async (req, res) => {
  let user_id;
  let color;
  try {
    user_id = req.body.user_id;
    color = req.body.color;

    const user = await User.findById(user_id);
    user.color = color;
    await user.save();
    return;

  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/get_profile_data", cookieHandler.checkCookie2, async (req, res) => {
  try {

    let all_data = []
    const body = req.body.id;
    const user = await User.findById(body);
    if (user.pfp) {
      const pfp = await Image.findById(user.pfp);
      let pfpType = pfp.filetype;
      let pfpData = pfp.image;
      all_data.push(pfpType);
      all_data.push(pfpData.toString('base64'));
    } else {
      all_data.push("");
      all_data.push("");
    }
    if (user.banner) {
      const banner = await Image.findById(user.banner);
      let bannType = banner.filetype;
      let bannData = banner.image;
      all_data.push(bannType);
      all_data.push(bannData.toString('base64'));
    } else {
      all_data.push("");
      all_data.push("");
    }

    if (user.color) {
      all_data.push(user.color);
    } else {
      all_data.push("")
    }
    return res.status(200).json(all_data);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/get", cookieHandler.checkCookie2, async (req, res) => {
  try {
    let name = req.body.name;
    const user = await User.find({username: name});
    console.log(user);
    return res.status(200).json(user);    
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
