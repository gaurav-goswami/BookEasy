const User = require("../models/User");
const OTP = require("../models/OTP");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const Profile = require("../models/ProfileDetails");

class AuthController {

    // send otp

    static sendOtp = async (req, res, next) => {

        try {
            const { email } = req.body;

            // check if the user already exists

            let user = await User.findOne({ email });

            if (user) return next(new ErrorHandler("User already exists. Please Login", 401))

            const otpOptions = {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
                digits: true
            }

            // generate otp

            let otp = otpGenerator.generate(6, otpOptions);

            // check if the otp is unique or not
            let otpExists = await OTP.findOne({ otp });

            while (otpExists) {
                otp = otpGenerator.generate(6, otpOptions);
                otpExists = await OTP.findOne({ otp: otp })
            }

            await OTP.create({ email, otp });

            return res.status(200).json({ success: true, status: 200, message: "OTP sent successfully 😄" });

        } catch (error) {
            console.log("error in sending otp", error.message);
            return next(new ErrorHandler())
        }

    }

    // signup user

    static signup = async (req, res, next) => {

        try {

            const { username, email, password, role, otp } = req.body;

            if (!username || !email || !password || !role || !otp) return next(new ErrorHandler("All fields are required", 401));

            // checking if the user already exists or not

            let user = await User.findOne({ email });

            if (user) return next(new ErrorHandler("User already exists. Please Login", 401))

            let recentMostOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

            if (recentMostOtp.length === 0) {
                return next(new ErrorHandler("OTP not found", 404))

            } else if (recentMostOtp[0].otp !== otp) {
                return next(new ErrorHandler("Incorrect OTP", 401))
            }

            // if everything went fine then hash the password and store the user in database

            let hashedPassword;

            try {
                const genSalt = await bcrypt.genSalt(Number(process.env.GEN_SALT));
                hashedPassword = await bcrypt.hash(password, genSalt);

            } catch (error) {
                console.log("Error while hashing the password", error.message);
                return next(new ErrorHandler("Something went wrong. Please try again later"))
            }

            let profileDetails;

            if(role === "User"){
                profileDetails = await Profile.create({
                    bio : null,
                    contactInfo : {
                        email,
                        phoneNumber : null,
                        address : null
                    }
                })
            }else if(role === "Expert"){
                profileDetails = await Profile.create({
                    bio : null,
                    serviceProvides : null,
                    contactInfo : {
                        email,
                        phoneNumber : null,
                        address : null
                    },
                    experience : null,
                    education : null,
                    available : null,
                    experties : null
                })
            }

            user = await User.create({ username, email, password: hashedPassword, role, profile : profileDetails  , avatar: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`})

            return res.status(201).json({
                success: true,
                status: 201,
                message: "Signup successfull"
            })

        } catch (error) {
            console.log("error in signup", error.message);
            return next(new ErrorHandler())
        }

    }

    // login

    static login = async (req, res, next) => {

        try {

            const { email, password } = req.body;

            if (!email || !password) return next(new ErrorHandler("All fields are required", 401));

            // check if the user exists or not

            let user = await User.findOne({ email }).select("+password");

            if (!user) return next(new ErrorHandler("User doesn't exists. Please signup", 401));

            if (user && await bcrypt.compare(password, user.password)) {

                const payload = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role : user.role
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3d" });
                // console.log("token is" , token);

                // setting the jwt token in cookie for authentication

                const cookieOptions = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie("token", token, cookieOptions);

                res.cookie("loggedIn" , true , {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                })

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Logged In",
                })

            } else {
                return next(new ErrorHandler("Invalid credentials", 403))
            }

        } catch (error) {
            console.log("error in login", error.message)
            return next(new ErrorHandler())
        }

    }

    // logout

    static logout = async (req, res, next) => {
        try {

            res.cookie("token" , null, {expires : new Date(0) });
            res.cookie("loggedIn" , false, {expires : new Date(0) });

            return res.status(200).json({
                success : true,
                status : 200,
                message : "User logged out"
            })

        } catch (error) {
            console.log("error in logout" , error.message);
            return next(new ErrorHandler("Something went wrong. Please try again later" , 401))
        }
    }

}

module.exports = AuthController;