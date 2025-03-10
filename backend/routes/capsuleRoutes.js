const express = require("express");
const router = express.Router();
const capsuleController = require("../controllers/capsuleController");
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Capsule Routes
router.post("/create", upload.single("file"), capsuleController.createCapsule);
router.get("/", capsuleController.getCapsules);
router.get("/:id", capsuleController.getCapsuleById);
router.put("/:id", upload.single("file"), capsuleController.updateCapsule); // ✅ Fixed undefined error
router.delete("/:id", capsuleController.deleteCapsule); // Optional: Add delete route

module.exports = router;
