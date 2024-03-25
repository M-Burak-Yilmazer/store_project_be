const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/products", require("./productRoutes"));

router.use("/tokens", require("./tokenRoutes"));
module.exports = router;
