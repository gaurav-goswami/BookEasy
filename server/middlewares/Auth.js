const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
    try {

        const {token} = req.cookies;

        if(!token) return next(new ErrorHandler("User is not authenticated" , 401));

        const decoded_payload = jwt.verify(token, process.env.JWT_SECRET);

        // console.log("decoded_payload" , decoded_payload);
        req.user = decoded_payload;

        next();

    } catch (error) {
        return next(new ErrorHandler("Token not found" , 404))
    }
}

exports.isAdmin = (req , res, next) => {
    try {

        const {role} = req.user;

        if(role !== "Admin") return next(new ErrorHandler("This route is protected for Admin only"));

        next();

    } catch (error) {
        console.log("error in admin middleware" , error.message);
        return next(new ErrorHandler("Something went wrong" , 401));
    }
}

exports.isExpert = (req , res, next) => {
    try {

        const {role} = req.user;

        if(role !== "Expert") return next(new ErrorHandler("This route is protected for Expert only"));

        next();

    } catch (error) {
        console.log("error in expert middleware" , error.message);
        return next(new ErrorHandler("Something went wrong" , 401));
    }
}
