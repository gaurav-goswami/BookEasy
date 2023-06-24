const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    service : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Service",
        required : true,
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    date : {
        type : Date,
        required : true
    },

    additionalNotes : {
        type : String,
    }

});

const Booking = mongoose.model("Booking" , bookingSchema);

module.exports = Booking;