"use strict";

const router = require("express").Router();
const User = require("../controllers/userController");
const Permissions = require("../middlewares/permission.js");

router.route("/").get(Permissions.isAdmin, User.list).post(User.create);

router
  .route("/:userId")
  .get(Permissions.isAdminOrOwn, User.read)
  .put(Permissions.isAdminOrOwn, User.update)
  .patch(Permissions.isAdminOrOwn, User.update)
  .delete(Permissions.isAdmin, User.delete);

module.exports = router;
