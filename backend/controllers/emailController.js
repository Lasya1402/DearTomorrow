const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const Capsule = require("../models/Capsule");

const sendEmail = async (req, res) => {
    try {
        const { capsuleId, to, subject, text, link } = req.body;

        // ✅ Fetch capsule from MongoDB
        const capsule = await Capsule.findById(capsuleId);
        if (!capsule) {
            return res.status(404).json({ message: "Capsule not found" });
        }

        const filename = capsule.file; // Ensure correct field name
        const filePath = filename ? path.join(__dirname, "../uploads", filename) : null;

        let attachment = [];
        if (filename && fs.existsSync(filePath)) {
            const mimeType = filename.endsWith(".png") ? "image/png" : "image/jpeg";
            attachment = [
                {
                    filename: filename,
                    path: filePath,
                    contentType: mimeType,
                    cid: "attachedImage" // Inline image
                }
            ];
        }

        // ✅ Setup email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // ✅ Define mail options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: `${text || "No message provided."}\n\nAttachment: Check the uploaded file in your capsule.`,
            html: `
                <p>Dear ${to},</p>
                <p>Your time capsule titled <strong>${subject}</strong> has unlocked!</p>
                <p><strong>Message:</strong> ${text || "No message provided."}</p>
                ${link ? `<p><strong>Link:</strong> <a href="${link}" target="_blank">${link}</a></p>` : ""}
                <p><strong>Attachment:</strong> ${filename ? "Check your capsule below." : "No file was attached."}</p>
                ${filename ? `<img src="cid:attachedImage" alt="Memory Image" style="max-width:100%; height:auto; border-radius:10px; margin-top:10px;"/>` : ""}
                <p>Enjoy your memories! 💫</p>
            `,
            attachments: attachment
        };

        // ✅ Send email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
                return res.status(500).json({ message: "Email failed to send", error: err.message });
            }
            console.log("Email sent:", info.response);
            res.status(200).json({ message: "Email sent successfully!" });
        });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { sendEmail };
