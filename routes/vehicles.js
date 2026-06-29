const express = require("express");
const router  = express.Router();
const Vehicle = require("../models/Vehicle");

// Search vehicles — must be before /:id
router.get("/search", async (req, res) => {
    try {
        const { vehicleNumber, driver } = req.query;
        const query = {};
        if (vehicleNumber) query.vehicleNumber = { $regex: vehicleNumber, $options: "i" };
        if (driver)        query.driver        = { $regex: driver,        $options: "i" };
        const vehicles = await Vehicle.find(query);
        res.json({ success: true, data: vehicles });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET all vehicles
router.get("/", async (req, res) => {
    try {
        const vehicles = await Vehicle.find().sort({ createdAt: -1 });
        res.json({ success: true, data: vehicles });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST add vehicle
router.post("/", async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.json({ success: true, data: vehicle });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update vehicle
router.put("/:id", async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: vehicle });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE vehicle
router.delete("/:id", async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Vehicle deleted" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;
