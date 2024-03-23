"use strict";

/********************USER MODEL***********/

const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const passwordEncrypt = require("../helpers/passwordEncryption");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail, "Please enter a valid url"],
    },
    password: {
      type: String,
      required: true,
      set: (password) => passwordEncrypt(password),
    },
  },
  { collection: "users", timestamps: true }
);
module.exports = model("User", userSchema);
