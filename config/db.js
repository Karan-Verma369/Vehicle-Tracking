// =======================================
// MongoDB Database Connection
// =======================================

const mongoose = require("mongoose");

// Function to Connect Database
const connectDB = async () => {

    try {

        await mongoose.connect(
            "mongodb+srv://rbkaran999_db_user:karan@cluster0.sn0lh5e.mongodb.net/truck",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        console.log("✅ MongoDB Connected Successfully");

    } catch (error) {

        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);

        process.exit(1);

    }

};

module.exports = connectDB;