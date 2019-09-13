const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const BudgetLine = require("../../models/budgetline");
const Movements = require("../../models/movement");
const Transfers = require("../../models/transfer");

const User = require("../../models/user");
const { check, validationResult } = require("express-validator");

router.put("/:id", auth, async (req, res) => {

    try {
        const budgetLine = await BudgetLine.updateOne({ _id: req.body.id }, { name: req.body.name, payment_date: req.body.payment_date });
        if (!budgetLine) {
            return res.status(400).json({ msg: "Item not found" })
        }
        res.json(budgetLine);
    } catch (err) {
        //console.error(err.message);
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
});

router.delete("/:id", auth, async (req, res) => {
    console.log("did not make it");
    try {
        //console.log("try1");
        const movement = await Movements.remove({ type_budgetline: req.params.id });
        //find transfer of related account and revert
    } catch (err) {
        //console.log("err1");
        //console.log(err);
        //res.status(500).send({ errors: [{ msg: "Server Error when trying to delete movement" }] });

        // there is not movements for this line
    }
    try {
        console.log("try2");
        const findTransfer = await Transfers.find({ type_budgetline: req.params.id }).populate("type_budgetline_related");
        // get data from related transfer to update 
        if (findTransfer.join("") !== "") {
            console.log("still here");
            const transferType = findTransfer[0].transfer_type;
            const amount = +findTransfer[0].amount;
            const amountBudgetedRelated = +findTransfer[0].type_budgetline_related.amount_budgeted;
            const idRelated = findTransfer[0].type_budgetline_related._id;
            // recalculate related amount_budgeted to be updated
            const newAmountBudgetedRelated = transferType === "to" ? (amountBudgetedRelated - amount) : (amount + amountBudgetedRelated);
            const updateBudgetLineRelated = await BudgetLine.updateOne({ _id: idRelated }, { amount_budgeted: newAmountBudgetedRelated });
            //delete transfer related to account 
            const deleteTransferRelated = await Transfers.remove({ type_budgetline: idRelated });
        }
        const transfers = await Transfers.remove({ type_budgetline: req.params.id });
    } catch (err) {
        //console.log("err1");
        //console.log(err);
        //res.status(500).send({ errors: [{ msg: "Server Error when trying to delete transfer" }] });

        // there is no transfers for this line
    }
    try {
        //console.log("try3");
        const lines = await BudgetLine.remove({ _id: req.params.id });
        res.json(lines);
    } catch (err) {
        //console.log("err3");
        //console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error when trying to delete line" }] });

    }
});
module.exports = router;