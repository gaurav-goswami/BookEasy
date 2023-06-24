const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({

    feedback : {
        type : String,
        required : true,
        trim : true,
    },

    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    },

    service : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Service",
        required : true
    },

    feedbackBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

});

const FeedbackAndRatings = mongoose.model("FeedbackAndRating" , feedbackSchema);

module.exports = FeedbackAndRatings;