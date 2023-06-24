const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({

    serviceType : {
        type : String,
        enum : ["Financial Audit" , "Financial Planning" , "Taxation" , "Cybersecurity Expert" , "Architect" , "Lawyer"],
        required : true,
    },

    serviceProvider : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    serviceCharge : {
        type : Number,
        required : true
    },

    serviceDescription: {
        type : String,
        required : true
    },

    feedbacksAndRatings : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "FeedbackAndRating"
    }

})


const Service = mongoose.model("Service" , serviceSchema);

module.exports = Service;