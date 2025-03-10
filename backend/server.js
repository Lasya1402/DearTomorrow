const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const capsuleRoutes = require("./routes/capsuleRoutes");
const authRoutes = require("./routes/authRoutes"); 
const emailRoutes = require("./routes/emailRoutes"); // ✅ Import email routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/capsules", capsuleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes); // ✅ Add email routes here

// Start Email Scheduler (Don't use app.use() here)
require("./utils/emailScheduler");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("🔥 MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));
