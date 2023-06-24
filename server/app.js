const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const cloudinaryConnect = require("./config/cloudinary");

// importing routes

const authRoutes = require("./routes/Auth");
const profileRoutes = require("./routes/Profile");
const serviceRouter = require("./routes/Services");
const feedbackRouter = require("./routes/FeedbackAndRatings");
const bookingRouter = require("./routes/Booking");


dotenv.config({
    path: "./.env"
})

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}))

cloudinaryConnect();


// using routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/services" , serviceRouter);
app.use("/api/v1/feedback" , feedbackRouter);
app.use("/api/v1/booking" , bookingRouter)

module.exports = app;