"use strict";

require("express-async-errors");
const User = require("../models/userModel");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            
        */
    const data = await User.find();
    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create Users"
             #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    email: "test@abc.com",
        password: "1234",
      
                }
            }
            
        */
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
    const data = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update Users"
             #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    email: "updatedemail@abc.com",
        password: "1234",
      
                }
            }
            
        */
    const data = await User.updateOne({ _id: req.params.userId }, req.body, {
      runValidators: true,
    });
    const newData = await User.findOne({ _id: req.params.userId });
    res.status(200).send({
      error: false,
      body: req.body,
      newData,
      data,
    });
  },
  delete: async (req, res) => {
    /*
    #swagger.tags = ["Users"]
    #swagger.summary = "Delete User"
*/

    const data = await User.deleteOne({ _id: req.params.userId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
