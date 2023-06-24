const mongoose = require("mongoose");
const verificationMail = require("../utils/verificationMail");

const otpSchema = new mongoose.Schema({
    otp : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expired : 60*1
    },

})

otpSchema.pre("save" , async function (next){
    await verificationMail(this.email , this.otp);
    next();
})

const OTP = mongoose.model("OTP" , otpSchema);

module.exports = OTP;