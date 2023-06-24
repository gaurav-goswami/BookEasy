const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        });

        let mailContent = await transporter.sendMail({
            from : "BookEasy",
            to : email,
            subject : title,
            html : body
        });

        return mailContent;

    } catch (error) {
        console.log("Something went wrong while sending mail")
        console.log(error.message);
    }
}

module.exports = mailSender;