"use strict";

require("express-async-errors");
const Token = require("../models/tokenModel");

module.exports = {
  list: async (req, res) => {
    /*
            _swagger.deprecated = true
            #swagger.ignore = true
        */
    const data = await Token.find();
    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    /*
            _swagger.deprecated = true
            #swagger.ignore = true
        */
    const data = await Token.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },
  read: async (req, res) => {
    /*
            _swagger.deprecated = true
            #swagger.ignore = true
        */
    const data = await Token.findOne({ _id: req.params.tokenId });
    res.status(202).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            _swagger.deprecated = true
            #swagger.ignore = true
        */
    const data = await Token.updateOne({ _id: req.params.tokenId }, req.body, {
      runValidators: true,
    });
    const newData = await Token.findOne({ _id: req.params.tokenId });
    res.status(200).send({
      error: false,
      body: req.body,
      newData,
      data,
    });
  },
  delete: async (req, res) => {
    /*
            _swagger.deprecated = true
            #swagger.ignore = true
        */
    const data = await Token.deleteOne({ _id: req.params.tokenId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
