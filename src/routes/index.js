const router = require("express").Router();

router.use("/products", require("./productRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/tokens", require("./tokenRoutes"));
router.use("/auth", require("./authRoutes"));
module.exports = router;
