const Booking = require("../models/Booking");
const ErrorHandler = require("../utils/ErrorHandler");
const Service = require("../models/Services");
const User = require("../models/User");

class BookingController {

    // create a booking

    static createBooking = async (req, res, next) => {

        try {

            const { serviceId } = req.params;
            const { date, additionalNotes } = req.body;
            const { id, role } = req.user;

            if (!date || !additionalNotes) return next(new ErrorHandler("All fields are required", 401));

            // find the service

            let service = await Service.findById(serviceId);

            if (!service || service.length === 0) return next(new ErrorHandler("Service not found", 404));

            if (role === "Expert" && service.serviceProvider.toString() === id) return next(new ErrorHandler("An experts cannot book his own service", 409));

            let booking = await Booking.find({ service: serviceId, user: id, date });

            if (booking.length > 0) return next(new ErrorHandler(`You already have made booking for this service for Date ${date}`, 401));

            // create a booking

            booking = await Booking.create({ date, additionalNotes, service: serviceId, user: id });

            // updating the booking in user 
            await User.findOneAndUpdate({ _id: id }, { $push: { bookings: booking._id } }, { new: true });

            // updating the booking in the service provider

            const serviceProviderId = service.serviceProvider;
            await User.findOneAndUpdate({_id : serviceProviderId} , {$push : {bookings: booking._id}}, {new : true});

            return res.status(201).json({
                success: true,
                status: 201,
                message: "Booking created",
                bookingDetails: booking
            })

        } catch (error) {
            console.log("error in createBooking", error.message);
            return next(new ErrorHandler("Something went wrong while Booking the service. Please try again later. Thank you.", 401));
        }

    }

    // getBookings

    static getMyBookings = async (req, res, next) => {

        try {

            const { id } = req.user;

            const bookings = await Booking.find({ user: id }).populate({
                path: "service",
                populate: {
                    path: "serviceProvider"
                }
            })
            .populate("user")
            ;

            if (!bookings || bookings.length === 0) return next(new ErrorHandler("You do not have any bookings", 401));

            return res.status(200).json({
                success: true,
                status: 200,
                message: "Booking fetched",
                bookings
            })


        } catch (error) {
            console.log("error in getMyBooking", error.message);
            return next(new ErrorHandler("Something went wrong while fetching your booking. Please try again later. Thank you.", 401));
        }

    }

    // cancle details

    static cancleBooking = async (req, res, next) => {

        try {

            const {id} = req.user;
            const {bookingId} = req.params;
            const {serviceId} = req.body;

            if(!serviceId) return next(new ErrorHandler("Service Id is required" , 401));

            const booking = await Booking.find({_id : bookingId}).populate({
                path: "service",
                populate: {
                    path: "serviceProvider"
                }
            });

            if(!booking || booking.length === 0) return next(new ErrorHandler("You don't have any bookings" , 404));

            console.log("booking is" , booking);

            const service = await Service.findById(serviceId);

            const serviceProviderId = service.serviceProvider;

            // console.log("serviceProviderId" , serviceProviderId);

            // remove the booking details for customer and service provider both
            await User.findOneAndUpdate({_id : serviceProviderId} , {$pull : {bookings : bookingId}} , {new: true});
            await User.findOneAndUpdate({_id : id} , {$pull : {bookings : bookingId}} , {new: true});

            // delete the booking 

            await Booking.findOneAndDelete({_id : bookingId});

            return res.status(200).json({
                success : true,
                status : 200,
                message : "Booking cancelled successfully"
            })

        } catch (error) {
            console.log("error in cancleBooking", error.message);
            return next(new ErrorHandler("Something went wrong while cancelling your booking. Please try again later. Thank you.", 401));
        }

    }

}

module.exports = BookingController;