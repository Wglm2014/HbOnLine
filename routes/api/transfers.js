const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Transfer = require("../../models/transfer");
const BudgetLine = require("../../models/budgetline");
const User = require("../../models/user");
const { check, validationResult } = require("express-validator");

//description,movement_type,amount,budget_line_from,budget_line_to,date

router.get("/", auth, async (req, res) => {
    let transfer = {};
    let transferRelated = {};

    try {
        if (req.id) {
            transfer = await Transfer.find({ type_budgetline: req.id });
        } else { transfer = await Transfer.find({}); }

        if (!transfer) {
            return res.status(400).json({ msg: "No movements for this budget line" });
        } else {
            transferRelated = await BudgetLine.find({ _id: transfer.type_budgetline_related });
        }
        const dataTransfer = { transfer: transfer, budgetLineRelated: transferRelated };
        res.json(dataTransfer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//description,movement_type,amount,budget_line_from,budget_line_to,date

router.post("/", [auth,
    [check("description", "Please describe the transfer").not().isEmpty(),
    check("amount", "Enter an amount").isFloat({ gt: 0.0 }),
    check("date", "Enter date of transfer").not().isEmpty(),
    chech("movement_type", "please select a movement type").not().isEmpty(),
    checl("budget_line_related", "select the related budget item").not().isEmpty()]], async (req, res) => {
        //amount_budgeted corresponding to the account where the transfer is triggered
        const amountBudgeted = req.body.transfer_type === "from" ? (req.body.amount + req.body.amount_budgeted) : (req.body.amount_budgeted - req.body.amount);
        //amount_budgeted corresponding to the account affected
        const amountBudgetedRelated = req.body.transfer_type === "from" ? (req.body.amount_budgeted - req.body.amount) : (req.body.amount + req.body.amount_budgeted);
        const fromTo = req.body.transfer_type === "from" ? "to" : "from";

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //insert a transfer from related to the account originated
        const TransferFields = {
            type_budgetline: req.body.id,
            description: req.body.description,
            transfer_type: req.body.movement_type,
            amount: req.body.amount,
            date: req.body.date_movement,
            budget_line_related: req.body.budget_line_related
        };
        //insert a transfer to the related account
        const TransferFieldsRelated = {
            type_budgetline: req.body.budget_line_related,
            description: req.body.description,
            transfer_type: fromTo,
            amount: req.body.amount,
            date: req.body.date_movement,
            budget_line_related: req.body.id
        };

        try {
            //originated account
            const transfer = new Transfer(TransferFields);
            await transfer.save();
            const budgetLine = await BudgetLine.update({ type_budgeline: req.body.id }, { $set: { amount_budgeted: amountBudgeted } });
            //related account
            const transferRelated = new Transfer(TransferFieldsRelated)
            await transferRelated.save();
            const budgetLineRelated = await BudgetLine.update({ type_budgeline: req.body.budget_line_related }, { $set: { amount_budgeted: amountBudgetedRelated } });
            res.json(transfer);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

    });
module.exports = router;