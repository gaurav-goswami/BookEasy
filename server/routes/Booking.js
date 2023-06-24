const BookingController = require("../controllers/Booking");
const { isAuthenticated } = require("../middlewares/Auth");

const router = require("express").Router();

router.post("/create-booking/:serviceId" , isAuthenticated, BookingController.createBooking);
router.get("/my-bookings" , isAuthenticated , BookingController.getMyBookings);
router.delete("/cancle-booking/:bookingId" , isAuthenticated , BookingController.cancleBooking);


module.exports = router;