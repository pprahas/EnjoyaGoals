const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

/*
router.get('/register', function(req, res) {
    res.send("register get works, idk about post though");
});
*/

router.use(express.json());

router.post("/", async (req, res) => {
    const user = req.body;

    const dbUser = new User({
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.password
    })

    dbUser.save();
    res.json({message: "Success"});
})

module.exports = router;