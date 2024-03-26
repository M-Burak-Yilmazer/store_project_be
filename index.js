"use strict";

const express = require("express");
const app = express();

require("express-async-errors");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());

require("./src/config/dbConnection");

//*get the dummy data
// require("./src/dataSync")();

// //? Json
// const swaggerJson = require("./swagger.json");
app.use("/documents/json", (req, res) => {
  res.sendFile("swagger.json", { root: "." });
});
// //?SWAGGER

const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");
app.use(
  "/documents/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true },
  })
);

//? REDOC:
const redoc = require("redoc-express");
app.use(
  "/documents/redoc",
  redoc({
    title: "PersonnelAPI",
    specUrl: "/documents/json",
  })
);

// const swaggerUi = require("swagger-ui-express");
// app.use(
//   "/documents/swagger",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerJson, {
//     swaggerOptions: { persistAuthorization: true },
//   })
// );

//middlewares
app.use(require("./src/middlewares/query"));
// app.use(require("./src/middlewares/logging"));

app.use(require("./src/middlewares/authentication"));

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome To Store Api",
    user: req.user,
    api: {
      documents: {
        swagger: "https://store-project-be.vercel.app/documents/swagger",
        redoc: "https://store-project-be.vercel.app/documents/redoc",
        json: "https://store-project-be.vercel.app/documents/json",
      },
      contact: "mathiassft@mthssoftware.com",
    },
  });
});

//Routes
app.use(require("./src/routes"));

app.use(require("./src/errors/errorHandler"));

app.listen(PORT, () =>
  console.log(`Server is running http://127.0.0.1:${PORT}`)
);
