const Feedback = require("../models/FeedbackAndRatings");
const ErrorHandler = require("../utils/ErrorHandler");

class FeedbackController {

    // create feedback

    static createFeedback = async (req, res, next) => {

        try {

            const { feedback, rating } = req.body;
            const { serviceId } = req.params;

            const { id } = req.user;

            if (!feedback || !rating) return next(new ErrorHandler("All fields are required", 401));
            if (!serviceId) return next(new ErrorHandler("Service ID is required", 401));

            let userFeedback = await Feedback.findOne({ service: serviceId, feedbackBy: id });

            if (userFeedback) return next(new ErrorHandler("You already have submitted your feedback.", 401));

            userFeedback = await Feedback.create({ feedback, rating, service: serviceId, feedbackBy: id });

            return res.status(201).json({
                success: true,
                status: 201,
                message: "Thank you for your feedback",
                userFeedback
            })

        } catch (error) {
            console.log("error in create feedback", error.message);
            return next(new ErrorHandler("Something went wrong while adding feedback", 401))
        }

    }

    // delete feedback

    static deleteFeedback = async (req, res, next) => {

        try {

            const { feedbackId } = req.params;
            const { id } = req.user;

            if (!feedbackId) return next(new ErrorHandler("Feedback ID is required", 401));

            const feedback = await Feedback.find({ _id: feedbackId, feedbackBy: id });

            console.log(feedback);

            if (!feedback || feedback.length === 0) return next(new ErrorHandler("Feedback not found", 404));

            await Feedback.findOneAndDelete({ _id: feedbackId, feedbackBy: id });

            return res.status(200).json({
                success: true,
                status: 200,
                message: "Feedback deleted successfully"
            })
        } catch (error) {

            console.log("error in delete feedback", error.message);
            return next(new ErrorHandler("Something went wrong while deleting feedback", 401))
        }

    }


    // get feedback

    static getFeedback = async (req, res, next) => {

        try {
            
            const {serviceId} = req.params;

            if(!serviceId) return next(new ErrorHandler("serviceId is required" , 401));

            const feedbacks = await Feedback.find({service : serviceId});

            if(!feedbacks || feedbacks.length === 0) return next(new ErrorHandler("No feedbacks yet." , 401));

            return res.status(200).json({
                success : true,
                status : 200,
                message : "Feedbacks fetched",
                totalFeedbacks : feedbacks.length,
                feedbacks
            })

        } catch (error) {
            console.log("error in get feedback", error.message);
            return next(new ErrorHandler("Something went wrong while fetching feedback", 401))
        }

    }
}

module.exports = FeedbackController;