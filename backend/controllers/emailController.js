const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (req, res) => {
    try {
        const { to, subject, text, link, links } = req.body;

        // ✅ Debugging logs (Check what’s coming in the request)
        console.log("📩 Sending Email...");
        console.log("📧 To:", to);
        console.log("📌 Subject:", subject);
        console.log("💬 Message:", text);
        console.log("🔗 Link:", link);
        console.log("🔗 Links Array:", links);

        // ✅ Setup email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // ✅ Format additional links (if provided)
        let formattedLinks = "";
        if (Array.isArray(links) && links.length > 0) {
            formattedLinks = "<p><strong>Additional Links:</strong></p><ul>";
            links.forEach(l => {
                formattedLinks += `<li><a href="${l}" target="_blank">${l}</a></li>`;
            });
            formattedLinks += "</ul>";
        }

        // ✅ Define email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: `${text || "No message provided."}\n\nLink: ${link || "No link provided."}\n\nAdditional Links:\n${(links || []).join("\n")}`,
            html: `
                <p>Dear ${to},</p>
                <p>Your time capsule titled <strong>${subject}</strong> has unlocked!</p>
                <p><strong>Message:</strong> ${text || "No message provided."}</p>
                ${link ? `<p><strong>Link:</strong> <a href="${link}" target="_blank">${link}</a></p>` : ""}
                ${formattedLinks}
                <p>Enjoy your memories! 💫</p>
            `
        };

        // ✅ Send email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("❌ Error sending email:", err);
                return res.status(500).json({ message: "Email failed to send", error: err.message });
            }
            console.log("✅ Email sent:", info.response);
            res.status(200).json({ message: "Email sent successfully!" });
        });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { sendEmail };
