import React from "react";
import "./About.css"; // Ensure About.css is linked

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="about-title">About DearTomorrow</h2>
        <p className="about-text">
          Ever wished to send a message to your future self?
          <span className="highlight">DearTomorrow</span> is a <strong>digital time capsule</strong> where you can store memories and unlock them at the perfect moment.
        </p>

        <h2 className="perks-title">✨ Why Use It?</h2>
        <ul className="perks-list">
          <li>📜 Capture & relive cherished moments.</li>
          <li>🔓 Unlock memories when the time is right.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
