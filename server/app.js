const express = require("express");
const dotenv = require("dotenv");
const cookieParse = require("cookie-parser");

// importing routes

const authRoutes = require("./routes/Auth");


dotenv.config({
    path : "./.env"
})

const app = express();

app.use(express.json());
app.use(cookieParse());


// using routes

app.use("/api/v1/auth" , authRoutes);


module.exports = app;