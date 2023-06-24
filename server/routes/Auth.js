const router = require("express").Router();
const AuthController = require("../controllers/Auth");
const { isAuthenticated } = require("../middlewares/Auth");

router.post('/send-otp' , AuthController.sendOtp);
router.post('/signup' , AuthController.signup);
router.post('/login' , AuthController.login);
router.get('/logout' , isAuthenticated , AuthController.logout);

module.exports = router;