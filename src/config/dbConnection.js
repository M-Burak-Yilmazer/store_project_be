"use strict";

const { connect } = require("mongoose");

connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB couldn't connect" + err));

  