const ProfileController = require("../controllers/Profile");
const { isAuthenticated } = require("../middlewares/Auth");
const router = require("express").Router();

router.put("/update-profile", isAuthenticated, ProfileController.updateProfile);
router.delete("/delete-profile/:accountID" , isAuthenticated, ProfileController.deleteAccount);
router.put("/update-profile-picture" , isAuthenticated, ProfileController.updateProfilePicture);

module.exports = router;