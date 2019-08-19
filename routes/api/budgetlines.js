const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const BudgetLine = require("../../models/budgeline");
const User = require("../../models/user");
const { check, validationResult } = require("express-validator");


router.get("/", auth, async (req, res) => {
    try {
        const budgetLine = await BudgetLine.findAll({ user: req.user.id }).populate("User", [name]);
        if (!budgetLine) {
            return res.status(400).json({ msg: "No Budget Items Yet" })
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", [auth,
    [check("name", "Line Name is requiered").not().isEmpty(),
    check("description", "Please add a description of").not().isEmpty()]], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const budgeLine = {
            name: req.body.name,
            description: req.body.description,
            amount_budgeted: req.body.amount_budgeted,
            amount_spent: req.body.amount_spent,
            user: req.body.id
        };

        try {

        } catch (err) {

        }

    });


module.exports = router;