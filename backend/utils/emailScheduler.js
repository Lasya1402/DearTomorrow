const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const Capsule = require("../models/Capsule");

// ✅ Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Function to send email
const sendCapsuleEmail = async (capsule) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: capsule.email,
      subject: "Your Memory Capsule has Unlocked! ✨",
      html: `
        <h2>Dear ${capsule.email},</h2>
        <p>Your time capsule titled <b>${capsule.title}</b> has unlocked!</p>
        <p><b>Message:</b> ${capsule.message}</p>
        ${capsule.link ? `<p><b>Link:</b> <a href="${capsule.link}" target="_blank">${capsule.link}</a></p>` : ""}
        ${capsule.file ? `<p><b>Attachment:</b> Check the uploaded file in your capsule.</p>` : ""}
        <p>Enjoy your memories! 💫</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${capsule.email}:`, info.response);
  } catch (error) {
    console.error(`❌ Failed to send email to ${capsule.email}:`, error);
  }
};

// ✅ Schedule Job to check & send emails every minute
schedule.scheduleJob("* * * * *", async () => {
  console.log("⏳ Checking for capsules to send...");

  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const currentTime = now.toTimeString().slice(0, 5);  // HH:MM

  try {
    // ✅ Fixing Date Query
    const capsules = await Capsule.find({ date: currentDate, time: currentTime });

    console.log(`📌 Found ${capsules.length} capsules to send at ${currentDate} ${currentTime}`);

    if (capsules.length === 0) return; // ✅ Exit early if no capsules

    for (const capsule of capsules) {
      await sendCapsuleEmail(capsule);
    }
  } catch (error) {
    console.error("❌ Error checking capsules:", error);
  }
});

console.log("📩 Email Scheduler Started...");
