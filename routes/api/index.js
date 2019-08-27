const router = require("express").Router();
//const categoriesRoutes = require("./categories");
const usersRouters = require("./users");
const userAuth = require("./auth");
const budgetLineRoutes = require("./budgetlines");
const movementsRoutes = require("./movements");
router.use("/users", usersRouters);
router.use("/auth", userAuth);
router.use("/budgetline", budgetLineRoutes);
router.use("/movements", movementsRoutes)

module.exports = router;
