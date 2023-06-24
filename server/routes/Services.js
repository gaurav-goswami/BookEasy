const ServiceController = require("../controllers/Service");
const { isExpert, isAuthenticated } = require("../middlewares/Auth");

const router = require("express").Router();

router.get("/search", ServiceController.searchService);
router.get("/expert-services", isAuthenticated, isExpert, ServiceController.getExpertService);
router.post("/create", isAuthenticated, isExpert, ServiceController.createService);
router.delete("/delete-service/:serviceId", isAuthenticated, isExpert, ServiceController.deleteService);
router.put("/update-service/:serviceId", isAuthenticated, isExpert, ServiceController.updateService)

module.exports = router;