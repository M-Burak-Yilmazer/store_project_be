"use strict";
require("express-async-errors");

const Product = require("../models/productModel");

const ProductController = {



  list: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "List Products"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    const data = await res.getModelList(Product, {}, "categoryId");
    // const data = await Product.find();
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Product),
      data: data,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Create Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    title: "create 9",
                    categoryId:"testnumber",
                    description: "Create the description",
                    price: 549,
                    discountPercentage: 12.96,
                    rating: 4.69,
                    stock: 94,
                    brand: "Apple",
                    thumbnail: "testurl.jpg",
                    images: "testurl.jpg",
                }
            }
        */

    const data = await Product.create(req.body);
    res.status(201).send({
      error: false,
      data: data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Get Single Product"
        */
    const data = await Product.findOne({ _id: req.params.productId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Update Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    title: "update 9",
                    categoryId:"testnumber",
                    description: "Updtae the description",
                    price: 549,
                    discountPercentage: 12.96,
                    rating: 4.69,
                    stock: 94,
                    brand: "Apple",
                    thumbnail: "testurl.jpg",
                    images: "testurl.jpg",
                }
            }
        */
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
    /*
    #swagger.tags = ["Products"]
    #swagger.summary = "Delete Products"
*/
    const data = await Product.deleteOne({ _id: req.params.productId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports = ProductController;
