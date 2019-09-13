const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const BudgetLine = require("../../models/budgetline");
const { check, validationResult } = require("express-validator");


router.get("/", auth, async (req, res) => {


    try {
        const budgetLine = await BudgetLine.find({ user: req.user.id });
        if (!budgetLine) {
            return res.status(400).json({ msg: "No Budget Items Yet" })
        }
        res.json(budgetLine);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
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
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
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
            res.status(500).send({ errors: [{ msg: "Server Error" }] });
        }

    });

module.exports = router;