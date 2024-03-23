"use strict";

const express = require("express");
const app = express();

require("express-async-errors");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());

require("./src/config/dbConnection");

app.all("/", (req, res) => {
  res.send("INDEX PAGE");
});

app.use("/products", require("./src/routes/productRoutes"));

app.use(require("./src/errors/errorHandler"));

app.listen(PORT, () =>
  console.log(`Server is running http://127.0.0.1:${PORT}`)
);
