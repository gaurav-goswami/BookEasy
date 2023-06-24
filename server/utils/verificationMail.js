const mailSender = require("./mailSender");

const verificationMail = async (email , otp) => {
    try {

        const mailResponse = await mailSender(email, "Verification email for Login" , otp);
        console.log("verification mail sent successfully");

    } catch (error) {
        console.log("Error while sending mail" , error.message);
        throw error;
    }
}

module.exports = verificationMail;