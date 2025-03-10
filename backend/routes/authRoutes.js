const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware"); // ✅ Import middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);  // ✅ Protect this route

module.exports = router;
