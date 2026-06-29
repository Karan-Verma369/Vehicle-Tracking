const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true, unique: true },
    vehicleType:   { type: String, default: "Truck" },
    driver:        { type: String, default: "" },
    location:      { type: String, default: "" },
    destination:   { type: String, default: "" },
    status:        { type: String, default: "Idle" }
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);
