const Services = require("../models/services-model");
const services = async (req, res) => {
  try {
    const response = await Services.find();
    if (!response) {
      res.status(404).json({ message: "No service found" });
      return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(`services:${error}`);
    next(error);
  }
};
const ImageUpload = async (req, res) => {
  try {
    // Destructure data from request body
    const { img, service, price, description, provider } = req.body;

    // Check if image data is provided
    if (!img) {
      return res.status(400).json({ error: "Image data is required" });
    }

    // Create a new image instance
    const newImage = new Services({ service, description, price, provider, img });

    // Save the new image to the database
    await newImage.save();

    // Respond with success message
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    // Handle any errors that occur during image upload
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the service exists
        const existingService = await Service.findById(id);
        if (!existingService) {
            return res.status(404).json({ error: "Service not found" });
        }

        // Delete the service
        await Service.findByIdAndDelete(id);

        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports = { services, ImageUpload,deleteService };
