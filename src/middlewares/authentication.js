"use strict";

const Token = require("../models/tokenModel");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null; // Token ...tokenKey...
  const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

  if (tokenKey && tokenKey[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
      "userId"
    );
    // console.log(tokenData)
    if (tokenData) req.user = tokenData.userId; // Personnel Data
    // console.log(req.user)
  }

  next();
};
