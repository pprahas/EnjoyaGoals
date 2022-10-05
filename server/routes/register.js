const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

/*
router.get('/register', function(req, res) {
    res.send("register get works, idk about post though");
});
*/

router.post("/register", async (req, res) => {
    const user = req.body;
    /*

    const takenUsername = await User.findOne({username: user.username});
    const takenEmail = await User.findOne({email: user.email});

    if (takenUsername || takenEmail) {
        res.json({message: "Username or email has already been taken"});
    } else {
        user.password = await bcrypt.hash(req.body.password, 10);

        const dbUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })

        dbUser.save();
        res.json({message: "Success"});
    }
    */

    /*
    const dbUser = new User({
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.password
    })
    */

    const dbUser = new User({
        username: "testNorton",
        email: "nortonn@purdue.edu",
        password: "oooSneakyPassword"
    });

    dbUser.save();
    res.json({message: "Success"});
})

module.exports = router;