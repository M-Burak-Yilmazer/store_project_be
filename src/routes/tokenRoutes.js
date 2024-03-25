"use strict";

const router = require("express").Router();
const Token = require("../controllers/tokenController");
const Permissions = require("../middlewares/permission");
router
  .route("/")
  .get(Permissions.isAdmin, Token.list)
  .post(Permissions.isAdmin, Token.create);

router
  .route("/:tokenId")
  .get(Permissions.isAdmin, Token.read)
  .put(Permissions.isAdmin, Token.update)
  .patch(Permissions.isAdmin, Token.update)
  .delete(Permissions.isAdmin, Token.delete);

module.exports = router;
