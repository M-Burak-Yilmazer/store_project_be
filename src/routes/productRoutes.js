"use strict";

const router = require("express").Router();
const permission= require("../middlewares/permission")

const {
  ProductController,
  ProductCategoryController,
} = require("../controllers/productController");

router
  .route("/categories")
  .get(ProductCategoryController.list)
  .post(ProductCategoryController.create);
router
  .route("/categories/:categoryId")
  .get(ProductCategoryController.read)
  .put(ProductCategoryController.update)
  .delete(ProductCategoryController.delete);

router.route("/").get(permission.isLogin, ProductController.list).post(ProductController.create);
router
  .route("/:productId")
  .get(ProductController.read)
  .put(ProductController.update)
  .delete(ProductController.delete);

router.get(
  "/categories/:categoryId/products",
  ProductCategoryController.products
);

module.exports = router;