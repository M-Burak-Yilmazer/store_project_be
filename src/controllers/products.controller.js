"use strict";

require("express-async-errors");

const { Products, ProductsCategory } = require("../models/productModel");

const ProductCategory = {
  list: async (req, res) => {
    const data = await ProductsCategory.find();
    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    const data = await ProductsCategory.create(req.body);
    res.status(201).send({
      error: false,
      data,
      body: req.body,
    });
  },
  read: async (req, res) => {
    const data = await ProductsCategory.findOne({ _id: req.params.categoryId });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await ProductsCategory.update(
      { _id: req.params.id },
      req.body
    );
    const newData = await ProductsCategory.findOne({
      _id: req.params.categoryId,
    });
    res.status(202).send({
      error: false,
      newData,
      data,
    });
  },
  delete: async (req, res) => {
    const data = await ProductsCategory.deleteOne({
      _id: req.params.categoryId,
    });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
const Product = {
  list: async (req, res) => {
    const data = await Products.find();
    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    const data = await Products.create(req.body);
    res.status(201).send({
      error: false,
      data,
      body: req.body,
    });
  },
  read: async (req, res) => {
    const data = await Products.findOne({ _id: req.params.productId });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await Products.update({ _id: req.params.id }, req.body);
    const newData = await Products.findOne({
      _id: req.params.productId,
    });
    res.status(202).send({
      error: false,
      newData,
      data,
    });
  },
  delete: async (req, res) => {
    const data = await Products.deleteOne({
      _id: req.params.productId,
    });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
module.exports = {
  Product,
  ProductCategory,
};
