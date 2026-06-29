const express = require("express");
const router  = express.Router();
const Vehicle = require("../models/Vehicle");
const Driver  = require("../models/Driver");

router.get("/", async (req, res) => {
    try {
        const totalVehicles    = await Vehicle.countDocuments();
        const activeVehicles   = await Vehicle.countDocuments({ status: "Moving" });
        const delayedVehicles  = await Vehicle.countDocuments({ status: "Delayed" });
        const arrivedVehicles  = await Vehicle.countDocuments({ status: "Idle" });
        const totalDrivers     = await Driver.countDocuments();

        res.json({
            success: true,
            data: {
                totalVehicles,
                activeVehicles,
                delayedVehicles,
                arrivedVehicles,
                totalDrivers
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
