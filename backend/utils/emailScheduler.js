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

const sendCapsuleEmail = async (capsule) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: capsule.email,
      subject: "✨ Your Memory Capsule Has Unlocked! ✨",
      html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; background: #0A192F; border-radius: 12px; font-family: 'Poppins', sans-serif; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
        <div style="text-align: center; padding-bottom: 10px;">
          <h2 style="color: #FFC857; margin-bottom: 5px; font-weight: bold;">🎁 Your Memory Capsule Has Opened! 🎁</h2>
          <p style="color: #FFF; font-size: 14px; font-weight: bold;">A moment from the past is waiting for you. 💫</p>
        </div>
      
        <div style="background: #112240; padding: 15px; border-radius: 10px; margin-top: 10px;">
          <p style="font-size: 16px; color: #FFF; font-weight: bold;"><b>Title:</b> ${capsule.title}</p>
          <p style="font-size: 16px; color: #FFF; font-weight: bold;"><b>Message:</b> ${capsule.message}</p>
          ${capsule.link ? `<p style="font-size: 16px; color: #FFC857; font-weight: bold;"><b>Link:</b> <a href="${capsule.link}" target="_blank" style="color: #FFC857; font-weight: bold; text-decoration: none;">📌 Click Here to View</a></p>` : ""}
        </div>
      
        <div style="text-align: center; margin-top: 15px;">
          <p style="font-size: 14px; color: #FFF; font-weight: bold;">Enjoy your memories, <br><b style="color: #FFC857;">DearTomorrow</b> 🌅</p>
        </div>
      </div>
      `
      
  ,
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
  const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD format
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

  try {
    // ✅ Check for capsules with the exact date & time
    const capsules = await Capsule.find({ date: currentDate, time: currentTime });

    console.log(`📌 Found ${capsules.length} capsules to send at ${currentDate} ${currentTime}`);

    for (const capsule of capsules) {
      await sendCapsuleEmail(capsule);
    }
  } catch (error) {
    console.error("❌ Error checking capsules:", error);
  }
});

console.log("📩 Email Scheduler Started...");
