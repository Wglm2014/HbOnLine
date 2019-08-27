const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Movement = require("../../models/movement");
const BudgetLine = require("../../models/budgetline");
const User = require("../../models/user");
const { check, validationResult } = require("express-validator");


router.get("/", auth, async (req, res) => {
    try {
        const movement = await Movement.find({ type_budgetline: req.id });
        if (movement) {
            return res.status(400).json({ msg: "No movements for this budget line" })
        }
        res.json(movement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



router.post("/", [auth,
    [check("description", "Please describe the movement").not().isEmpty(),
    check("amount", "Enter an amount").isFloat({ gt: 0.0 }),
    check("date_movement", "Enter date of movement").not().isEmpty()]], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const movementFields = {
            type_budgetline: req.id,
            description: req.describe,
            movement_type: req.movement_type,
            amount: req.amount,
            date_movement: req.date_movement
        };

        try {
            const movement = new Movement(movementFields);
            await movement.save();

            const budgetLine = await BudgetLine.update({ type_budgeline: req.id }, { $set: { amount_spent: (() => req.amount + amount_spent) } });

            res.json(movement);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

    });
module.exports = router;