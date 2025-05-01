import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateCapsule.css";

const CreateCapsule = () => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // State to control navbar visibility

  const navigate = useNavigate();

  useEffect(() => {
    setShowNavbar(false); // Hide navbar when component mounts
    return () => setShowNavbar(true); // Show navbar when component unmounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const capsuleData = {
        title,
        email,
        message,
        link,
        date,
        time,
      };

      const response = await axios.post(
        "http://localhost:5000/api/capsules/create",
        capsuleData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Capsule Created:", response.data);
      alert("Capsule created successfully!");

      navigate("/memory"); // Redirect to Memory page

    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!showNavbar && <style>{"nav { display: none; }"}</style>} {/* Hide navbar */}
      <div className="create-capsule-container"><br />
        <form className="create-capsule-form" onSubmit={handleSubmit}>
          <h2>Create Your Capsule</h2>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
          <input type="text" placeholder="Link (optional)" value={link} onChange={(e) => setLink(e.target.value)} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Capsule"}</button>
        </form>
      </div>
    </>
  );
};

export default CreateCapsule;
