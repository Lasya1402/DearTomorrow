const Capsule = require("../models/Capsule");

// ✅ Define the createCapsule function
const createCapsule = async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debugging step

    const { title, email, message, link, date, time } = req.body;

    const newCapsule = new Capsule({
      title,
      email,
      message,
      link, // ✅ Ensure link is included
      date,
      time,
    });

    await newCapsule.save();
    res.status(201).json({ success: true, capsule: newCapsule });
  } catch (error) {
    console.error("❌ Error creating capsule:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Correctly export the function
module.exports = { createCapsule };



const getCapsules = async (req, res) => {
    try {
        const capsules = await Capsule.find();
        res.status(200).json(capsules);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getCapsuleById = async (req, res) => {
    try {
        const capsule = await Capsule.findById(req.params.id);
        if (!capsule) {
            return res.status(404).json({ message: "Capsule not found" });
        }
        res.status(200).json(capsule);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const updateCapsule = async (req, res) => {
    try {
        const { title, email, message, link, date, time } = req.body;
        const updatedCapsule = await Capsule.findByIdAndUpdate(
            req.params.id,
            { title, email, message, link, date, time },
            { new: true }
        );
        if (!updatedCapsule) {
            return res.status(404).json({ message: "Capsule not found" });
        }
        res.status(200).json({ message: "Capsule updated successfully", capsule: updatedCapsule });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const deleteCapsule = async (req, res) => {
    try {
        const deletedCapsule = await Capsule.findByIdAndDelete(req.params.id);
        if (!deletedCapsule) {
            return res.status(404).json({ message: "Capsule not found" });
        }
        res.status(200).json({ message: "Capsule deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { createCapsule, getCapsules, getCapsuleById, updateCapsule, deleteCapsule };
