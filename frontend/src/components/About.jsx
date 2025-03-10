import React from "react";
import "./About.css"; // Ensure About.css is linked

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About DearTomorrow</h1>
        <p className="about-text">
  Ever wished you could send a message to your future self? <br /><br />
  <span className="highlight"> DearTomorrow </span> is your <strong>digital time capsule</strong>, where you can store memories, letters, and moments that will unlock at a future date.
</p>

        <p className="about-text">
          Whether it's a note to yourself, a message for a loved one, or a dream you want to remember, 
          this platform keeps your memories safe until the perfect time.
        </p>

        <h2 className="perks-title">✨ Why Use DearTomorrow?</h2>
        <ul className="perks-list">
          <li>📜 Preserve emotions & thoughts in their purest form.</li>
          <li>🔓 Unlock special memories at just the right moment.</li>
          <li>🌅 A nostalgic journey back to a different version of you.</li>
          <li>💡 Self-reflection & growth through past experiences.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
