const express = require("express");
const servicesController = require("../controllers/services-controller");
const router = express.Router();

// Route to handle GET requests for fetching services
router.get('/service', servicesController.services);

// Route to handle POST requests for uploading images
router.post("/upload", servicesController.ImageUpload);

// Route to handle DELETE requests for deleting a service
router.delete("/service/:id", servicesController.deleteService);

module.exports = router;
