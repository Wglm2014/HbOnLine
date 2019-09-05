const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Movement = require("../../models/movement");
const BudgetLine = require("../../models/budgetline");
const User = require("../../models/user");
const { check, validationResult } = require("express-validator");
router.get("/", auth, async (req, res) => {

    let movement = {};
    try {
        movement = await Movement.find({});

        if (!movement) {
            return res.status(400).json({ msg: "No movements for this budget line" })
        }
        res.json(movement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/:id", auth, async (req, res) => {

    let movement = {};
    try {

        movement = await Movement.find({ type_budgetline: req.params.id });

        if (!movement) {
            return res.status(400).json({ msg: "No movements for this budget line" })
        }
        res.json(movement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: ["Server Error", err] });
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

        //if type_item spence in will decrement, if type_ite
        console.log(req.body);

        let amountSpent = 0;
        if (req.body.type_item === "spence") {
            amountSpent = req.body.movement_type === "out" ? (+req.body.amount + +req.body.amount_spent) : (+req.body.amount_spent - +req.body.amount);
        } else {
            amountSpent = req.body.movement_type === "in" ? (+req.body.amount + +req.body.amount_spent) : (+req.body.amount_spent - +req.body.amount);
        }
        console.log(amountSpent);

        const movementFields = {
            description: req.body.description,
            movement_type: req.body.movement_type,
            amount: req.body.amount,
            date_movement: req.body.date_movement,
            type_budgetline: req.body.type_budgetline
        };

        try {
            const movement = new Movement(movementFields);
            await movement.save();

            const budgetLine = await BudgetLine.updateOne({ _id: req.body.type_budgetline }, { amount_spent: amountSpent });
            console.log(budgetLine)
            res.json(movement);
        } catch (err) {
            console.error(err.message);
            res.status(500).send({ errors: ["Server Error", err] });
        }

    });
module.exports = router;