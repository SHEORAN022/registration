const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ ADD THIS
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS enable (MOST IMPORTANT)
app.use(cors());

// Middleware
app.use(express.json());

// Routes
const enrollRoutes = require("./routes/enrollRoutes");
app.use("/api", enrollRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Optional health check
app.get("/api/health", (req, res) => {
  res.send("API Healthy ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});