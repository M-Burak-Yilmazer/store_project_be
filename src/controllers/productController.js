"use strict";
require("express-async-errors");

const Product = require("../models/productModel");
const ProductCategory = require("../models/categoryModel");

const ProductController = {
  list: async (req, res) => {
    const data = await Product.find();
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await Product.create(req.body);
    res.status(201).send({
      error: false,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await Product.findOne({ _id: req.params.productId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await Product.updateOne(
      { _id: req.params.productId },
      req.body,
      { runValidators: true }
    );
    const newData = await Product.findOne({ _id: req.params.productId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data,
      newData,
    });
  },
  delete: async (req, res) => {
    const data = await Product.deleteOne({ _id: req.params.productId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
const ProductCategoryController = {
  list: async (req, res) => {
    const data = await ProductCategory.find();
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await ProductCategory.create(req.body);
    res.status(201).send({
      error: false,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await ProductCategory.findOne({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await ProductCategory.updateOne(
      { _id: req.params.categoryId },
      req.body,
      { runValidators: true }
    );
    const newData = await ProductCategory.findOne({
      _id: req.params.categoryId,
    });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data,
      newData,
    });
  },
  delete: async (req, res) => {
    const data = await ProductCategory.deleteOne({
      _id: req.params.categoryId,
    });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports = { ProductController, ProductCategoryController };
