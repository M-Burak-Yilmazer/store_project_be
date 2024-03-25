"use strict";

const router = require("express").Router();
const permission= require("../middlewares/permission")

const {
  ProductController,
  ProductCategoryController,
} = require("../controllers/productController");

router
  .route("/categories")
  .get(permission.isLogin,ProductCategoryController.list)
  .post(permission.isAdmin, ProductCategoryController.create);
router
  .route("/categories/:categoryId")
  .get(permission.isLogin, ProductCategoryController.read)
  .put(permission.isAdmin, ProductCategoryController.update)
  .delete(permission.isAdmin, ProductCategoryController.delete);

router
  .route("/")
  .get(permission.isLogin, ProductController.list)
  .post(permission.isAdmin, ProductController.create);
router
  .route("/:productId")
  .get(permission.isLogin, ProductController.read)
  .put(permission.isAdmin, ProductController.update)
  .delete(permission.isAdmin, ProductController.delete);

router.get(
  "/categories/:categoryId/products",
  ProductCategoryController.products
);

module.exports = router;
