const express=require("express")
const { Product } = require("../controllers/products.controller")
const productRouter= express.Router()

productRouter.route("/products").get(Product.list).post(Product.create)
productRouter.route("/products/:productId")