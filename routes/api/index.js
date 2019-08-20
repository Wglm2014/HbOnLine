const router = require("express").Router();
//const categoriesRoutes = require("./categories");
const usersRouters = require("./users");
const userAuth = require("./auth");
const budgetLineRoutes = require("./budgetlines");
router.use("/categories", categoriesRoutes);
router.use("/users", usersRouters);
router.use("/auth", userAuth);
router.use("/budgetline", budgetLineRoutes);

module.exports = router;
