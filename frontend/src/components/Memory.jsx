import React from "react";
import { useNavigate } from "react-router-dom";
import "./Memory.css"; // Import CSS file

const Memory = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="memory-container"> {/* Scoped class */}
            <h2>Welcome to Your Memory Page 📜</h2>
            
            {isAuthenticated ? (
                <div>
                    <button 
                        className="btn btn-primary m-2"
                        onClick={() => navigate("/create-capsule")}
                    >
                        Create Capsule ✍️
                    </button>
                    <button 
                        className="btn btn-secondary m-2"
                        onClick={handleLogout}
                    >
                        Logout 🚪
                    </button>
                </div>
            ) : (
                <p>Please <a href="/login">login</a> to access your memories.</p>
            )}
        </div>
    );
};

export default Memory;
