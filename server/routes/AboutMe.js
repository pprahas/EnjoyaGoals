const express = require("express");
const User = require("../models/UserModel");

const router = express.Router();
router.use(express.json());

//assign about me to a user
router.post("/about_me", async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        user.aboutMe = req.body.aboutMe;
        await user.save();
        res.status(200).send(user);
    } catch (error) {

    }

});