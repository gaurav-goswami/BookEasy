const Profile = require("../models/ProfileDetails");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/User");
const uploadToCloudinary = require("../utils/cloudinaryUploader");

class ProfileController {

    static updateProfile = async (req, res, next) => {

        try {

            const { bio, phoneNumber, address, serviceProvides, experience, education, available, experties } = req.body;

            const { id } = req.user;

            const userDetails = await User.findById(id);
            const profileId = userDetails.profile;
            const profileDetails = await Profile.findById(profileId);

            profileDetails.bio = bio;
            profileDetails.contactInfo.phoneNumber = phoneNumber;
            profileDetails.contactInfo.address = address;
            profileDetails.serviceProvides = serviceProvides;
            profileDetails.experience = experience;
            profileDetails.education = education;
            profileDetails.available = available;
            profileDetails.experties = experties;
            await profileDetails.save();

            return res.status(200).json({
                success: true,
                status: 200,
                message: "Profile Updated Successfully 🚀"
            })

        } catch (error) {
            console.log("error in update profile", error.message);
            return next(new ErrorHandler("Something went wrong while updating the profile. Please try again later", 401))
        }
    }

    static deleteAccount = async (req, res, next) => {
        try {

            const { accountID } = req.params;

            const userAccount = await User.findById(accountID);

            if (!userAccount) return next(new ErrorHandler("User account not found", 404));

            // deleting the profile

            await Profile.findByIdAndDelete({ _id: userAccount.profile });

            // delete user account

            await User.findByIdAndDelete(accountID);

            return res.status(200).json({
                success: true,
                status: 200,
                message: "User account deleted successfully"
            })

        } catch (error) {
            console.log("Error in delete account", error.message);
            return next(new ErrorHandler("Something went wrong while deleting your account.", 401))
        }
    }

    static updateProfilePicture = async (req, res, next) => {
        try {
            const profilePicture = req.files.profilePicture
            const {id} = req.user;
            const image = await uploadToCloudinary(
                profilePicture,
                process.env.CLOUDINARY_FOLDER_NAME,
                1000,
                1000
            )
            // console.log(image)

            const updatedProfile = await User.findByIdAndUpdate(
                { _id: id },
                { avatar: image.secure_url },
                { new: true }
            )
            
            return res.status(200).json({
                success : true,
                status : 200,
                message : "Profile picture updated successfully",
                updatedProfile
            })

        } catch (error) {
            console.log("error in update profile picture")
            console.log(error.message);
            return next (new ErrorHandler("Something went wrong while updating the profile picture"))
        }
    };

}

module.exports = ProfileController;