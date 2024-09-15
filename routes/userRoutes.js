/*
This file is responsible for creating, updating,authenticating, and deleting users
*/ 
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const error_handler = require("../middleware/errorHandler");
const userSchema = require("../models/usersSchema");
const validateToken = require("../middleware/validateToken");

router.route("/register").post(async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const find_user = await userSchema.findOne({ userName });
        if (find_user) {
            res.status(403);
            throw new Error("User Already Registered");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userSchema.create({ userName, email, password: hashedPassword });
        if (user) {
            res.status(201).json({message : "User Registered Successfully" , id : user._id})
        }
        else {
            res.status(400);
            throw new Error("User data is not valid");
        }        
    }
    catch (err) {
        error_handler(err, req, res);
    }
});

router.route("/login").post(async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }

        const user = await userSchema.findOne({ userName });
        if (!user) {
            res.status(404);
            throw new Error("User doesn't exist");
        }
        const passwordComparison = await bcrypt.compare(password, user.password);
        if (!user || !passwordComparison) {
            res.status(401);
            throw new Error("Invalid user name or password");
        }
        let accessToken = jwt.sign({
            user: {
                user_id : user.id,
                userName: user.userName,
                email: user.email
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });

        res.status(200).json({ message: "Logged in successfully" , accessToken : accessToken});
    }
    catch (err) {
        error_handler(err, req, res);
    }
});


//Making the connection private
router.route("/current").post(validateToken, async (req, res) => {
    res.json(req.user);
}); 

module.exports = router;