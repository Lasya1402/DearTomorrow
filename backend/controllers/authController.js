const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|in|co|io|dev)$/;
    return emailRegex.test(email);
};

// Password validation function
const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
};

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate password strength
        if (!isValidPassword(password)) {
            return res.status(400).json({ 
                message: "Password must be at least 8 characters, include an uppercase letter, a number, and a special character." 
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: "Login successful",
            token,  
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// ✅ Add back the missing `getUser` function
const getUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized, no user data" });
        }

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// ✅ Make sure to include `getUser` in module.exports
module.exports = { registerUser, loginUser, getUser };
