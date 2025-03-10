import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store JWT token
        setMessage("Login successful!");
        navigate("/memory"); // Redirect to Memory page
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Login failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back to <span>DearTomorrow</span></h2>
        <p className="login-subtitle">Unlock your memories ✨</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="login-btn">Login</button>
        </form>

        {message && <p className="login-message">{message}</p>}

        <p className="login-footer">
          New here? <a href="/register">Create an account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
