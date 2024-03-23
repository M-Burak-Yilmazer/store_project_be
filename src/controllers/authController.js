"use strict";

const passwordEncryption = require("../helpers/passwordEncryption");
const Token = require("../models/tokenModel");
const User = require("../models/userModel");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email, password });
      if (user) {
        let tokenData = await Token.findOne({ userId: user._id });
        if (!tokenData) {
          const tokenKey = passwordEncryption(user._id + Date.now());
          tokenData = await Token.create({ userId: user._id, token: tokenKey });
        }
        res.status(200).send({
          error: false,
          token: tokenData.token,
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username or Password.");
      }
    }
  },
  logout: async (req, res) => {
    
    // const deleted = await Token.deletedOne({ userId: req.user._id });

    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;

    let deleted = null;
    if (tokenKey && tokenKey[0] == "Token") {
      deleted = await Token.deleteOne({ token: tokenKey[1] });
    }
    res.status(200).send({
      error: false,
      message: "Logout: Token deleted",
      deleted,
    });
  },
};
