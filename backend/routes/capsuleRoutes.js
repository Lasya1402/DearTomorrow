const express = require("express");
const router = express.Router();
const capsuleController = require("../controllers/capsuleController");

// Capsule Routes
router.post("/create", capsuleController.createCapsule);
router.get("/", capsuleController.getCapsules);
router.get("/:id", capsuleController.getCapsuleById);
router.put("/:id", capsuleController.updateCapsule);
router.delete("/:id", capsuleController.deleteCapsule);

module.exports = router;
