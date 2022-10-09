const User = require("../models/UserModel");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
router.use(express.json());

// query all User data in the database (except for passwords)
router.get("/", async (req, res) => {
    try {
        const findRes = await User.find().select("-password");
        
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.send({ status: "error" });
    }
});

// query all User usernames in the database
router.get("/usernames", async (req, res) => {
    try {
        const findRes = await User.find().select("username");
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.send({ status: "error" });
    }
});

// query all User emails in the database
router.get("/emails", async (req, res) => {
    try {
        const findRes = await User.find().select("email");
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.send({ status: "error" });
    }
});

// query all User firstNames in the database
router.get("/firstNames", async (req, res) => {
    try {
        const findRes = await User.find().select("firstName");
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.send({ status: "error" });
    }
});

// query all User lastNames in the database
router.get("/lastNames", async (req, res) => {
    try {
        const findRes = await User.find().select("lastName");
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.send({ status: "error" });
    }
});

module.exports = router;