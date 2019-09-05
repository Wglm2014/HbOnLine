const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
//const mongoose = require("mongoose");
require("dotenv").config();


//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get("/", auth, async (req, res) => {
    try {
        //console.log(mongoose.Types.ObjectId(req.user.id));
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route POST api/users
//@desc Authenticate user & get token
//@access Public
router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            // check if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }, { msg: "invalid user" }] });
            }


            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }, { msg: "invalid password" }] });
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, process.env.jwtSecret, { expiresIn: 36000 },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token });
                });


        } catch (err) {
            console.error(err.message);
            res.status(500).send({ errors: ["Server Error", err] });
        }
    });

module.exports = router;