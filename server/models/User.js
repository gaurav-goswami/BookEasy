const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        maxLength: 20,
        minLength: 2,
        trim: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: "Invalid email format.",
        },

    },

    password : {
        type: String,
        required : true,
        minLength : 8,
        select : false
    },

    avatar : {
        type : String
    },

    role : {
        type : String,
        required : true,
        enum : ["User" , "Expert" , "Admin"]
    },

    services : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Service"
        }
    ],

    profile : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ProfileDetail"
    },

    bookings : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Booking"
        }
    ]

})

const User = mongoose.model("User" , userSchema);

module.exports = User;