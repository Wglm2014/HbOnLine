const router = require("express").Router();
const categoriesRoutes = require("./categories");

// Book routes
router.use("/categories", categoriesRoutes);

module.exports = router;
