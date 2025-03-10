const Capsule = require("../models/Capsule");

// Create a Capsule
exports.createCapsule = async (req, res) => {
    try {
        const { title, email, message, link, date, time } = req.body;
        const file = req.file ? req.file.filename : null;

        if (!title || !email || !message || !date || !time) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newCapsule = new Capsule({ title, email, message, file, link, date, time });
        await newCapsule.save();

        res.status(201).json({ message: "Capsule created successfully!", capsule: newCapsule });
    } catch (error) {
        console.error("Create Capsule Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get all Capsules
exports.getCapsules = async (req, res) => {
    try {
        const capsules = await Capsule.find();
        res.status(200).json(capsules);
    } catch (error) {
        console.error("Get Capsules Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get Capsule by ID
exports.getCapsuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const capsule = await Capsule.findById(id);
        if (!capsule) return res.status(404).json({ message: "Capsule not found" });

        res.status(200).json(capsule);
    } catch (error) {
        console.error("Get Capsule by ID Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// Update Capsule
exports.updateCapsule = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, email, message, link, date, time } = req.body;
        const file = req.file ? req.file.filename : null;

        const updatedCapsule = await Capsule.findByIdAndUpdate(
            id,
            { title, email, message, file, link, date, time },
            { new: true, runValidators: true }
        );

        if (!updatedCapsule) {
            return res.status(404).json({ message: "Capsule not found" });
        }

        res.status(200).json({ message: "Capsule updated successfully!", capsule: updatedCapsule });
    } catch (error) {
        console.error("Update Capsule Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// Delete Capsule
exports.deleteCapsule = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCapsule = await Capsule.findByIdAndDelete(id);
        if (!deletedCapsule) {
            return res.status(404).json({ message: "Capsule not found" });
        }

        res.status(200).json({ message: "Capsule deleted successfully!" });
    } catch (error) {
        console.error("Delete Capsule Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};
