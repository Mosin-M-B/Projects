const {Schema , model ,Mongoose } = require("mongoose")

const mongoose = require('mongoose');

// Define a schema for your document
const serviceSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    img: String,
});

// Define a model using the schema
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
