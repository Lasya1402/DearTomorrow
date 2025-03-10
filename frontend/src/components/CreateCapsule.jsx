import React, { useState } from "react";
import axios from "axios";
import "./CreateCapsule.css";

const CreateCapsule = () => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("email", email);
        formData.append("message", message);
        formData.append("date", date);
        formData.append("time", time);
        if (file) {
            formData.append("file", file);
        }

        const response = await axios.post("http://localhost:5000/api/capsules/create", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        console.log("✅ Capsule Created:", response.data);

        // Check if the backend response contains a success message
        if (response.data.success) {
            alert("Capsule created successfully!");  // ✅ Show success message
        } else {
            alert("Capsule created successfully!");
        }

    } catch (error) {
        console.error("❌ Error:", error);
        alert("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="create-capsule-container"><br />
      <form className="create-capsule-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Create Your Capsule</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input type="text" placeholder="Link (optional)" value={link} onChange={(e) => setLink(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Capsule"}</button>
      </form>
    </div>
  );
};

export default CreateCapsule;
