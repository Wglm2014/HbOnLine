const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Transfer = require("../../models/transfer");
const BudgetLine = require("../../models/budgetline");
const User = require("../../models/user");
const { check, validationResult } = require("express-validator");

//description,movement_type,amount,budget_line_from,budget_line_to,date

router.get("/:id", auth, async (req, res) => {
    let transfer = {};
    console.log("here param", req.params.id);
    try {
        transfer = await Transfer.find({ type_budgetline: req.params.id }).populate("type_budgetline_related");
        console.log(transfer);
        if (!transfer) {
            return res.status(400).json({ msg: "No movements for this budget line" });
        }
        res.json(transfer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: ["Server Error", err] });
    }
});


//description,movement_type,amount,budget_line_from,budget_line_to,date

router.post("/", [auth,
    [check("description", "Please describe the transfer").not().isEmpty(),
    check("amount", "Enter an amount").isFloat({ gt: 0.0 }),
    check("date_transfer", "Enter date of transfer").not().isEmpty(),
    check("transfer_type", "please select a movement type").not().isEmpty(),
    check("type_budgetline_related", "select the related budget item").not().isEmpty()]], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //amount_budgeted corresponding to the account where the transfer is triggered
        const amountBudgeted = req.body.transfer_type === "from" ? (+req.body.amount + +req.body.amount_budgeted) : (+req.body.amount_budgeted - +req.body.amount);
        //amount_budgeted corresponding to the account affected
        const amountBudgetedRelated = req.body.transfer_type === "from" ? (+req.body.amount_budgeted_related - +req.body.amount) : (+req.body.amount + +req.body.amount_budgeted_related);
        const fromTo = req.body.transfer_type === "from" ? "to" : "from";

        //insert a transfer from related to the account originated
        const TransferFields = {
            description: req.body.description,
            transfer_type: req.body.transfer_type,
            amount: req.body.amount,
            date_transfer: req.body.date_transfer,
            type_budgetline: req.body.type_budgetline,
            type_budgetline_related: req.body.type_budgetline_related
        };
        //insert a transfer to the related account
        const TransferFieldsRelated = {
            description: req.body.description,
            transfer_type: fromTo,
            amount: req.body.amount,
            date: req.body.date_transfer,
            type_budgetline: req.body.type_budgetline_related,
            type_budgetline_related: req.body.type_budgetline
        };

        try {
            //originated account
            const transfer = new Transfer(TransferFields);
            await transfer.save();
            console.log("amounts: ", amountBudgeted, " ", amountBudgetedRelated)
            const budgetLine = await BudgetLine.updateOne({ _id: req.body.type_budgetline }, { amount_budgeted: amountBudgeted });
            console.log(budgetLine);
            //related account
            const transferRelated = new Transfer(TransferFieldsRelated)
            await transferRelated.save();
            const budgetLineRelated = await BudgetLine.updateOne({ _id: req.body.type_budgetline_related }, { amount_budgeted: amountBudgetedRelated });
            console.log(budgetLineRelated);
            res.json(transfer);
        } catch (err) {
            console.error(err.message);
            res.status(500).send({ msg: ["Server Error", err] });
        }

    });


router.delete("/:id", auth, async (req, res) => {
    try {
        const transfer = await Transfer.find({ _id: req.params.id }).populate("type_budgetline_related").populate("type_budgetline");
        const transferType = transfer[0].transfer_type;
        const amount = +transfer[0].amount;
        const amountBudgetedTo = +transfer[0].type_budgetline.amount_budgeted;
        const amountBudgetedRelated = +transfer[0].type_budgetline_related.amount_budgeted;
        const idRelated = transfer[0].type_budgetline_related._id;
        const idTo = transfer[0].type_budgetline._id;


        //amount_budgeted corresponding to the account where the transfer is triggered
        const newAmountBudgetedTo = transferType === "to" ? (amount + amountBudgetedTo) : (amountBudgetedTo - amount);
        //amount_budgeted corresponding to the account affected
        const newAmountBudgetedRelated = transferType === "to" ? (amountBudgetedRelated - amount) : (amount + amountBudgetedRelated);

        const updateBudgetLine = await BudgetLine.updateOne({ _id: idTo }, { amount_budgeted: newAmountBudgetedTo });
        const updateBudgetLineRelated = await BudgetLine.updateOne({ _id: idRelated }, { amount_budgeted: newAmountBudgetedRelated });
        const deleteTransfer = await Transfer.remove({ _id: req.params.id });
        res.send(deleteTransfer);
        // console.log(newAmountBudgetedTo, newAmountBudgetedRelated);
    } catch (err) {
        console.log(err);
        res.status(500).send({ errors: ["Server Error", err] });

    };

});

module.exports = router;