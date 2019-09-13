const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
require("dotenv").config();

//@route POST api/users
//@desc Register user
//@access Public
router.post("/", [check("name", "Name is Requiered")
    .not().isEmpty(),
check("email", "Please include a valid email").isEmail(),
check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("api here");
        const { name, email, password } = req.body;

        try {
            // check if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "User alfready exists" }] })
            }
            //get users gravatar
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            });
            user = new User({
                name,
                email,
                avatar,
                password
            });
            //encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save()
            //return jsonwebtoken

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, process.env.jwtSecret, { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });

            // res.send("User registered");

        } catch (err) {
            console.error(err.message);
            res.status(500).send({ errors: [{ msg: "Server Error when creating account" }] });
        }
    });

module.exports = router;