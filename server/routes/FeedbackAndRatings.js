const FeedbackController = require("../controllers/FeedbackAndRatings");
const { isAuthenticated } = require("../middlewares/Auth");

const router = require("express").Router();

router.get("/get-feedbacks/:serviceId" , FeedbackController.getFeedback);
router.post("/create-feedback/:serviceId" , isAuthenticated , FeedbackController.createFeedback);
router.delete("/delete-feedback/:feedbackId" , isAuthenticated , FeedbackController.deleteFeedback);

module.exports = router;