const express = require("express")
const app =express()
app.use(express.json())
require("express-async-errors")
require("dotenv").config()
const PORT=process.env.PORT || 8008
require("./src/config/dbConnection")

app.all("/", (req,res)=>{
    res.send("Index PAGE")
})

app.listen(PORT, ()=>console.log(`You are logged in http://localhost:${PORT}`))