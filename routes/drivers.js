const express = require("express");
const router  = express.Router();
const Driver  = require("../models/Driver");

// GET all drivers
router.get("/", async (req, res) => {
    try {
        const drivers = await Driver.find().sort({ createdAt: -1 });
        res.json({ success: true, data: drivers });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST add driver
router.post("/", async (req, res) => {
    try {
        const driver = new Driver(req.body);
        await driver.save();
        res.json({ success: true, data: driver });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update driver
router.put("/:id", async (req, res) => {
    try {
        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: driver });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE driver
router.delete("/:id", async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Driver deleted" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;
