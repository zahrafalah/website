const router = require("express").Router();

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");

router.use(userRoutes);
router.use(productRoutes);

module.exports = router;