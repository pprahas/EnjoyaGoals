const User = require("../models/UserModel");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
router.use(express.json());

router.get("/", function (req, res) {
    User.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(err);
            res.send({ status: "error" });
        }
    });
});

module.exports = router;