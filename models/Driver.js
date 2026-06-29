const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    name:            { type: String, required: true },
    phone:           { type: String, default: "" },
    licenseNumber:   { type: String, default: "" },
    experience:      { type: Number, default: 0 },
    assignedVehicle: { type: String, default: "" },
    status:          { type: String, default: "Available" }
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
