const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const BudgetLine = require("../../models/budgetline");
const Movements = require("../../models/movement");
const Transfers = require("../../models/transfer");

const User = require("../../models/user");
const { check, validationResult } = require("express-validator");


router.get("/", auth, async (req, res) => {


    let id = req.user.id;
    try {
        const budgetLine = await BudgetLine.find({ user: req.user.id });
        if (!budgetLine) {
            return res.status(400).json({ msg: "No Budget Items Yet" })
        }
        res.json(budgetLine);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ errors: ["Server Error", err] });
    }
});

router.get("/:id", auth, async (req, res) => {

    try {
        const budgetLine = await BudgetLine.find({ _id: req.params.id });
        if (!budgetLine) {
            return res.status(400).json({ msg: "Item not found" })
        }
        res.json(budgetLine);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ errors: ["Server Error", err] });
    }
});


router.post("/", [auth,
    [check("name", "Line Name is requiered").not().isEmpty(),
    check("type_item", "Plese select the type").not().isEmpty(),
    check("period", "Plese select a period").not().isEmpty(),
    check("payment_date", "Plese enter a date").not().isEmpty(),
    check("amount_budgeted", "Please enter the amount").not().isEmpty()]], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const budgeLineFields = {
            name: req.body.name,
            type_item: req.body.type_item,
            period: req.body.period,
            payment_date: req.body.payment_date,
            amount_budgeted: req.body.amount_budgeted,
            amount_spent: 0.0,
            user: req.user.id
        };

        try {
            const budgetLine = new BudgetLine(budgeLineFields);
            await budgetLine.save();
            res.json(budgetLine);
        } catch (err) {
            console.error(err.message);
            res.status(500).send({ errors: ["Server Error", err] });
        }

    });

router.put("/:id", auth, async (req, res) => {

    try {
        const budgetLine = await BudgetLine.updateOne({ _id: req.body.id }, { name: req.body.name, payment_date: req.body.payment_date });
        if (!budgetLine) {
            return res.status(400).json({ msg: "Item not found" })
        }
        res.json(budgetLine);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ errors: ["Server Error", err] });
    }
});

router.delete("/:id", auth, async (req, res) => {
    console.log("did not make it");
    try {
        //const movement = await Movements.remove({ type_budgetline: req.params.id });
        //const transfers = await Transfers.remove({ type_budgetline: req.params.id });
        const lines = await BudgetLine.remove({ _id: req.params.id });
        if (!lines) {
            return res.status(400).json({ msg: "Item not found" })
        }
        console.log(movement, transfers, lines);
    } catch (err) {
        console.log(err);
        res.status(500).send({ errors: ["Server Error", err] });

    }

});
module.exports = router;