const router = require("express").Router();
//const categoriesRoutes = require("./categories");
const usersRouters = require("./users");
const userAuth = require("./auth");
const budgetLineRoutes = require("./budgetlines");
const budgetLinePutDelRoutes = require("./budgetlinesputdel");
const movementsRoutes = require("./movements");
const transfersRoutes = require("./transfers");
router.use("/users", usersRouters);
router.use("/auth", userAuth);
router.use("/budgetline", budgetLineRoutes);
router.use("/budgetlineputdel", budgetLinePutDelRoutes);
router.use("/movements", movementsRoutes)
router.use("/transfers", transfersRoutes)
module.exports = router;
