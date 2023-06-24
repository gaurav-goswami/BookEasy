const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    bio: {
        type: String,
        min: 20,
        max: 500
    },

    serviceProvides: {
        type: [String],
        default: [],
    },

    contactInfo: {
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number
        },
        address: {
            type: String
        },
    },

    experience: {
        type: String,
    },

    education: {
        type: String,
    },

    available: {
        type: String,
    },

    experties: {
        type: [String],
    },

});

const Profile = mongoose.model("ProfileDetail", profileSchema);

module.exports = Profile;