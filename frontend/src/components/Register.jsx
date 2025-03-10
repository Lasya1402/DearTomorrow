import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Make sure you create and link this CSS file

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        setMessage("Registration successful!");
        navigate("/memory"); // Redirect to Memory page
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Join <span>DearTomorrow</span></h2>
        <p className="register-subtitle">Create your own digital time capsule!</p>
        
        <form onSubmit={handleSubmit} className="register-form">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="register-btn">Register</button>
        </form>
        
        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
