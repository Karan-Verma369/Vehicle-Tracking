const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
const PORT = 3000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "..")));

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

// API Routes
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/vehicles",  require("./routes/vehicles"));
app.use("/api/drivers",   require("./routes/drivers"));

// Alerts (simple static for now)
app.get("/api/alerts", (req, res) => {
    res.json({
        success: true,
        data: [
            { message: "TRK002 delayed by 20 min" },
            { message: "TRK004 entered destination" },
            { message: "TRK007 route changed" }
        ]
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
