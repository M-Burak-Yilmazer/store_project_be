"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user) {
      console.log("you can enter")
      next();
    } else {
      
      res.errorStatusCode = 403;
      throw new Error("No Permission: You must Login.");
    }
 
   
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.email == "admin@aa.com") {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login and to be Admin.");
    }
  },
};
